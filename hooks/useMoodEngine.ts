import * as Location from 'expo-location';
import { LightSensor, Pedometer } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';

// Authored by Vlad

type MoodResult = {
  moodLabel: string;
  emoji: string;
  suggestion: string;
  loading: boolean;
};

export default function useMoodEngineWithSensors(): MoodResult {
  const [moodLabel, setMoodLabel] = useState('');
  const [emoji, setEmoji] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(true);

  const [light, setLight] = useState(100);
  const [steps, setSteps] = useState(0);
  const [temperature, setTemperature] = useState(22);
  const [altitude, setAltitude] = useState<number | null>(null);

  const stepStartTimeRef = useRef<Date | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let lightSub: any;
    let pedometerSub: any;

    const init = async () => {
      setLoading(true);

      // Initial fetch of sensors
      await fetchLocationAndTemperature();
      await fetchSteps();

      // Light sensor
      lightSub = LightSensor.addListener(data => {
        if (data?.illuminance != null) {
          setLight(data.illuminance);
        }
      });

      // Step counter stream
      stepStartTimeRef.current = new Date(Date.now() - 60 * 60 * 1000);
      pedometerSub = Pedometer.watchStepCount(result => {
        setSteps(result.steps);
      });

      // Start periodic refresh every 5 seconds
      intervalRef.current = setInterval(async () => {
        await fetchLocationAndTemperature();
        await fetchSteps();
      }, 5000);

      setLoading(false);
    };

    const fetchLocationAndTemperature = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const loc = await Location.getCurrentPositionAsync({});
        setAltitude(loc.coords.altitude ?? null);

        const weather = await fetch(`https://wttr.in/${loc.coords.latitude},${loc.coords.longitude}?format=j1`)
          .then(res => res.json())
          .catch(() => null);

        if (weather?.current_condition?.[0]?.temp_C) {
          setTemperature(parseFloat(weather.current_condition[0].temp_C));
        }
      } catch (err) {
        console.warn('Location/weather error:', err);
      }
    };

    const fetchSteps = async () => {
      try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const now = new Date();
        const result = await Pedometer.getStepCountAsync(oneHourAgo, now);
        setSteps(result.steps ?? 0);
      } catch (err) {
        console.warn('Step count error:', err);
      }
    };

    init();

    return () => {
      lightSub?.remove?.();
      pedometerSub?.remove?.();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    console.log('Mood Engine Updated:', { light, steps, temperature, altitude });

    let mood = 'neutral';
    let emojiResult = '😐';
    let suggestionResult = 'Take a deep breath.';

    if (altitude && altitude > 1500) {
      mood = 'elevated';
      emojiResult = '🌇';
      suggestionResult = 'Breathe deeply and enjoy the view.';
    } else if (light < 100) {
      mood = 'stressed';
      emojiResult = '😣';
      suggestionResult = 'Open the blinds and get some air.';
    } else if (temperature > 26 && steps < 100) {
      mood = 'sluggish';
      emojiResult = '🥵';
      suggestionResult = 'Hydrate and cool off.';
    } else if (steps > 3000) {
      mood = 'energized';
      emojiResult = '😄';
      suggestionResult = 'Nice! Stay active.';
    } else if (light > 500 && temperature < 22) {
      mood = 'peaceful';
      emojiResult = '😊';
      suggestionResult = 'Enjoy the calm – maybe some music?';
    }

    setMoodLabel(mood);
    setEmoji(emojiResult);
    setSuggestion(suggestionResult);
  }, [light, temperature, steps, altitude, loading]);

  return { moodLabel, emoji, suggestion, loading };
}

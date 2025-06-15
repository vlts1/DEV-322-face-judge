import * as Location from 'expo-location';
import { LightSensor, Pedometer } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';

export default function useSensorManager() {
  const [light, setLight] = useState(100);
  const [steps, setSteps] = useState(0);
  const [altitude, setAltitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const stepStartTimeRef = useRef<Date | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let lightSub: any;
    let pedometerSub: any;

    const init = async () => {
      setLoading(true);

      await fetchLocation();
      await fetchSteps();

      lightSub = LightSensor.addListener(data => {
        if (data?.illuminance != null) {
          setLight(data.illuminance);
        }
      });

      stepStartTimeRef.current = new Date(Date.now() - 60 * 60 * 1000);
      pedometerSub = Pedometer.watchStepCount(result => {
        setSteps(result.steps);
      });

      intervalRef.current = setInterval(async () => {
        await fetchLocation();
        await fetchSteps();
      }, 5000);

      setLoading(false);
    };

    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const loc = await Location.getCurrentPositionAsync({});
        setAltitude(loc.coords.altitude ?? null);
      } catch (err) {
        console.warn('Location error:', err);
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

  return { light, steps, altitude, loading };
}

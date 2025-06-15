import { useEffect } from 'react';

type Params = {
  light: number;
  temperature: number;
  steps: number;
  altitude: number | null;
  loading: boolean;
  setMoodLabel: (mood: string) => void;
  setEmoji: (emoji: string) => void;
  setSuggestion: (text: string) => void;
};

export default function useRecommendationEngine({
  light,
  temperature,
  steps,
  altitude,
  loading,
  setMoodLabel,
  setEmoji,
  setSuggestion,
}: Params) {
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
    } else if (steps > 400) {
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
}

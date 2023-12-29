import { Stack } from 'expo-router';
export default function PredictLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="result"
      />
      <Stack.Screen
        name="result-plant-details"
      />
      <Stack.Screen
        name="result-image-library"
      />
    </Stack>
  );
}
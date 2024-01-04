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
        options={{ title: 'Result' }}
      />
      <Stack.Screen
        name="result-plant-details"
        options={{ title: 'Plant details' }}
      />
      <Stack.Screen
        name="result-image-library"
        options={{ title: 'Plant image library' }}
      />
    </Stack>
  );
}
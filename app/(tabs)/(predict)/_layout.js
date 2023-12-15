import { Stack } from 'expo-router';
export default function PredictLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
      />
    </Stack>
  );
}
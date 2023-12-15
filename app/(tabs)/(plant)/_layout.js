import { Stack } from 'expo-router';


export default function PlantLayout() {

  return (
    <Stack>
      <Stack.Screen
        name='plant-list'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='plant-details'
        options={{ title: 'Plant details' }}
      />
      <Stack.Screen
        name='image-library'
        options={{ title: 'Plant image library' }}
      />
    </Stack>
  );
}

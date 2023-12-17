import { Stack } from 'expo-router';


export default function SettingLayout() {

  return (
    <Stack>
      <Stack.Screen
        name='setting'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='change-info'
        options={{ title: 'Change info' }}
      />
      <Stack.Screen
        name='change-password'
        options={{ title: 'Change password' }}
      />
    </Stack>
  );
}

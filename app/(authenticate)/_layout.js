import { Stack, Redirect } from 'expo-router';
import { useAppContext } from '../../context/appContext';

export default function AuthenticateLayout() {

  const { user } = useAppContext();

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
    >
      <Stack.Screen
        options={
          { headerShown: false, }
        }
        name='(auth)'

      />
      <Stack.Screen
        name='forgot-password'
        options={{
          title: 'Forgot Password'
        }}
      />
      <Stack.Screen
        name='set-password'
        options={{
          title: 'Reset Password'
        }}
      />
    </Stack>
  );
}
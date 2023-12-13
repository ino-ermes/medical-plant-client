import { Redirect, Tabs } from 'expo-router';
import { useAppContext } from '../../context/appContext';

export default function TabLayout() {

  const { user } = useAppContext();

  if(!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name='(predict)'
      />
      <Tabs.Screen
        name='(plant)'
      />
      <Tabs.Screen
        name='(history)'
      />
      <Tabs.Screen
        name='(setting)'
      />
    </Tabs>
  );
}

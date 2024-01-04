import { Redirect, Tabs } from 'expo-router';
import { useAppContext } from '../../context/appContext';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {

  const { user } = useAppContext();

  if(!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarShowLabel: false}}
    >
      <Tabs.Screen
        name='(predict)'
        options={{tabBarIcon: ({focused, size, color}) => {
          return <Fontisto name="sourcetree" size={size} color={focused ? '#2cb1bc' : color} />
        }, tabBarLabel: 'Predict',}}
      />
      <Tabs.Screen
        name='(plant)'
        options={{tabBarIcon: ({focused, size, color}) => {
          return <MaterialCommunityIcons name="tree" size={size + 7} color={focused ? '#2cb1bc' : color} />
        }, tabBarLabel: 'Plant',}}
      />
      <Tabs.Screen
        name='(history)'
        options={{tabBarIcon: ({focused, size, color}) => {
          return <MaterialCommunityIcons name="history" size={size + 7} color={focused ? '#2cb1bc' : color} />
        }, tabBarLabel: 'History',}}
        />
      <Tabs.Screen
        name='(setting)'
        options={{tabBarIcon: ({focused, size, color}) => {
          return <FontAwesome5 name="user-cog" size={size} color={focused ? '#2cb1bc' : color} />
        }, tabBarLabel: 'Account',}}
      />
    </Tabs>
  );
}

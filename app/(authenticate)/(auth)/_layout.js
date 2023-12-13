import { Slot } from 'expo-router';

export default function AuthLayout() {
    return (
        <Slot initialRouteName='/login' screenOptions={{ headerShown: false }}/>
    );
}
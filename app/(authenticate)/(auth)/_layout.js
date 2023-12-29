import { Slot } from 'expo-router';
import { useAppContext } from '../../../context/appContext';

export default function AuthLayout() {

    return (
        <Slot initialRouteName='/login' screenOptions={{ headerShown: false }}/>
    );
}
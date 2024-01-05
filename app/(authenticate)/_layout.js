import { Stack, Redirect } from 'expo-router';
import { useAppContext } from '../../context/appContext';
import { View } from 'react-native';
import { CircleSpin } from '../../components';
import { useEffect, useState } from 'react';

export default function AuthenticateLayout() {

    const { user, getUser } = useAppContext();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            (async () => {
                await getUser();
                setLoading(false);
            })();
        }
    }, []);

    if (user) {
        return <Redirect href="/" />;
    }

    if (loading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <CircleSpin />
            </View>
        )
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
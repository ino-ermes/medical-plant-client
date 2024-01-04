import LottieView from 'lottie-react-native';

export default function EarthLoading() {
    return (
        <LottieView
            source={require("../assets/EarthLoading.json")}
            autoPlay
            loop={true}
        />
    )
}
import LottieView from 'lottie-react-native';

export default function CircleSpin() {
    return (
        <LottieView
            source={require("../assets/CircelSpin.json")}
            autoPlay
            loop={true}
        />
    )
}
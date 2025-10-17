import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold color-dark-200 text-4xl">Movie Details</Text>
    </View>
  );
};

export default MovieDetails;

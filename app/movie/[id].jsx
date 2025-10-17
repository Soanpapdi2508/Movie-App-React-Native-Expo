import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/customHooks/useFetch";
import { getMovieDetail } from "@/Services/Operations/movieOperation";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const MovieDetails = () => {
  const { id: movie_id } = useLocalSearchParams();
  const {
    data: detailsData,
    loading: detailsLoading,
    error: detailsError,
  } = useFetch(() => getMovieDetail(movie_id));
  return (
    <View className="flex-1 bg-primary">
      <Image
        className="absolute z-0 w-full"
        source={images.bg}
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {detailsLoading ? (
          <ActivityIndicator size={"large"} color={"#a8b5db"} />
        ) : detailsError ? (
          <Text>{detailsError.message}</Text>
        ) : (
          <View>
            <View className="relative">
              <Image
                className="h-[500px] w-full "
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${detailsData?.poster_path}`,
                }}
              />
              <TouchableOpacity className=" bg-white rounded-full absolute p-3 right-3 -bottom-7 ">
                <Image source={icons.play} className="size-10 p-2" />
              </TouchableOpacity>
            </View>
            <Text className="">{detailsData?.title}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

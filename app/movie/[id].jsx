import { images } from "@/constants/images";
import useFetch from "@/customHooks/useFetch";
import { getMovieDetail } from "@/Services/Operations/movieOperation";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";
const MovieDetails = () => {
  const { id: movie_id } = useLocalSearchParams();
  const {
    data: moviesDetails,
    loading: detailsLoading,
    error: detailsError,
  } = useFetch(() => getMovieDetail(movie_id));
  console.log(moviesDetails);
  return (
    <View className="flex-1 bg-primary">
      <Image className="w-full" source={images.bg} resizeMode="cover" />
      <ScrollView>
        <Image
          className=""
        />
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

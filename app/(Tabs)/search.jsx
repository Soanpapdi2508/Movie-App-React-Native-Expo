import { images } from "@/constants/images";
import useFetch from "@/customHooks/useFetch";
import { getMovies } from "@/Services/Operations/movieOperation";
import { FlatList, Image, View } from "react-native";

const search = () => {
  const {
    data: movies,
    loading,
    error: moviesError,
  } = useFetch(() => getMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary">
      <Image
        className="absolute z-0 w-full"
        source={images.bg}
        resizeMode="cover"
      />
      <FlatList />
    </View>
  );
};

export default search;

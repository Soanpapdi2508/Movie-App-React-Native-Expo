import MovieCard from "@/Components/MovieCard";
import SearchBar from "@/Components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import useFetch from "@/customHooks/useFetch";
import { getMovies } from "@/Services/Operations/movieOperation";
import { FlatList, Image, View } from "react-native";

const search = () => {
  const {
    data: movies,
    loading,
    error: moviesError,
  } = useFetch(() => getMovies({ query: "" }), false);
  return (
    <View className="flex-1 bg-primary">
      <Image
        className="absolute z-0 w-full"
        source={images.bg}
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard singleMovie={item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 15,
          marginBottom: 10,
        }}
        ListHeaderComponent={
          <>
            <Image className="h-10 w-12" source={icons.logo} />
            <SearchBar placeholder="Search movies..." />
          </>
        }
      />
    </View>
  );
};

export default search;

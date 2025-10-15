import MovieCard from "@/Components/MovieCard";
import SearchBar from "@/Components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import useFetch from "@/customHooks/useFetch";
import {
  getMovies,
  updateSearchCount,
} from "@/Services/Operations/movieOperation";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const search = () => {
  const [query, setQuery] = useState("");
  const {
    data: movies,
    loading,
    error: moviesError,
    refetch: againFetch,
    reset,
  } = useFetch(() => getMovies({ query: query }), false);
  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (query.trim()) {
        await againFetch();
        if (movies?.length > 0 && movies[0]) {
          await updateSearchCount(query, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  return (
    <View className="flex-1 bg-primary ">
      <Image
        className="absolute flex-1 z-0 w-full"
        source={images.bg}
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard singleMovie={item} />}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        ListEmptyComponent={
          <>
            {
              <View className=" my-60">
                {!loading &&
                !moviesError &&
                query?.length > 0 &&
                movies?.length === 0 ? (
                  <Text className="font-bold text-accent text-center text-3xl">
                    {`No Search Found for \n`}
                    <Text className="text-white italic text-2xl">{query}</Text>
                  </Text>
                ) : (
                  <Text className="font-bold text-accent text-center text-3xl">
                    Search For a Movie...
                  </Text>
                )}
              </View>
            }
          </>
        }
        ListHeaderComponent={
          <>
            <View className="flex-row w-full justify-center mt-20">
              <Image className="h-10 w-12" source={icons.logo} />
            </View>
            <View className="mt-10">
              <SearchBar
                placeholder="Search movies..."
                onChangeText={(text) => {
                  setQuery(text);
                }}
                value={query}
              />
            </View>
            <View className="my-5">
              {!loading &&
                !moviesError &&
                query.trim() &&
                movies?.length > 0 && (
                  <Text className="font-bold text-accent text-xl">
                    Search Results for:{" "}
                    <Text className="text-slate-300 italic">{query}</Text>
                  </Text>
                )}
            </View>
            <View className="">
              {loading && (
                <ActivityIndicator
                  size="large"
                  color={"#a8b5db"}
                  className="self-center"
                />
              )}
            </View>
            <View>
              {moviesError && (
                <Text className="my-60 self-center">
                  Error: {moviesError.message}
                </Text>
              )}
            </View>
          </>
        }
      />
    </View>
  );
};

export default search;

import MovieCard from "@/Components/MovieCard";
import RecentSearches from "@/Components/RecentSearches";
import SearchBar from "@/Components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import useFetch from "@/customHooks/useFetch";
import {
  getAllTrendingMovies,
  getMovies,
  updateSearchCount,
} from "@/Services/Operations/movieOperation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

const search = () => {
  const [query, setQuery] = useState("");
  const {
    data: movies,
    loading: movieLoading,
    error: moviesError,
    refetch: againFetch,
    reset,
  } = useFetch(() => getMovies({ query: query }), false);

  // Fetch trending searches on mount
  const {
    data: prevSearches,
    loading: searchLoading,
    error: searchError,
  } = useFetch(getAllTrendingMovies);
  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (query.trim()) {
        await againFetch();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (movies?.length > 0 && movies[0] && query.trim()) {
        await updateSearchCount(query, movies[0]);
      }
    }, 700);
    return () => clearTimeout(timeoutId);
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
                {(!movieLoading || !searchLoading) &&
                (!moviesError || !searchError) &&
                query?.length > 0 &&
                movies?.length === 0 ? (
                  <Text className="font-bold text-accent text-center text-3xl">
                    {`No Search Found for \n`}
                    <Text className="text-white italic text-2xl">{query}</Text>
                  </Text>
                ) : (
                  !movieLoading ||
                  (!searchLoading && !prevSearches && (
                    <Text className="font-bold text-accent text-center text-3xl">
                      Search For a Movie...
                    </Text>
                  ))
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
              {(!movieLoading || !searchLoading) &&
                (!moviesError || !searchError) &&
                query.trim() &&
                movies?.length > 0 && (
                  <Text className="font-bold text-accent text-xl">
                    Search Results for:
                    <Text className="text-slate-300 italic">{query}</Text>
                  </Text>
                )}
            </View>
            {(!movieLoading || !searchLoading) &&
              (!moviesError || !searchError) &&
              query.length === 0 &&
              !movies &&
              prevSearches && (
                <View className="flex flex-row flex-wrap gap-2 items-center">
                  <Text className="text-light-200 text-xl">
                    Recent Searches:
                  </Text>
                  {prevSearches?.map((movie, index) => {
                    return (
                      <View key={index}>
                        <RecentSearches
                          title={movie.searchTerm}
                          onPress={() => setQuery(movie.searchTerm)}
                        />
                      </View>
                    );
                  })}
                </View>
              )}
            <View className="">
              {(movieLoading || searchLoading) && (
                <ActivityIndicator
                  size="large"
                  color={"#a8b5db"}
                  className="self-center"
                />
              )}
            </View>
            <View>
              {(moviesError || searchError) && (
                <Text className="my-60 self-center">
                  Error: {moviesError?.message || searchError?.message}
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

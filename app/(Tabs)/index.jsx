import MovieCard from "@/Components/MovieCard";
import SearchBar from "@/Components/SearchBar";
import TrendingCard from "@/Components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/customHooks/useFetch";
import {
  getAllTrendingMovies,
  getMovies,
} from "@/Services/Operations/movieOperation";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
const index = () => {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => getMovies({ query: "" }));
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getAllTrendingMovies);

  return (
    <View className="flex-1 bg-primary">
      <Image
        className="absolute w-full z-0"
        source={images.bg}
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
        alwaysBounceVertical={true}
      >
        <Image className="w-12 h-10 mt-20 mb-5 mx-auto" source={icons.logo} />

        {moviesLoading || trendingError ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator
              size="large"
              color={"#a8b5db"}
              className="mb-14 self-center"
            />
          </View>
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.error || trendingError?.error}</Text>
        ) : (
          <View>
            <View className="flex mt-5">
              <SearchBar
                onPress={() => {
                  router.push("/search?autofocus=true");
                }}
                placeholder={"Search for a Movie"}
              />
              {trendingMovies && (
                <View className="mt-10 ">
                  <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Trending Movies
                  </Text>
                  <FlatList
                    ItemSeparatorComponent={() => <View className="w-8"></View>}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                      <TrendingCard singleMovie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                  />
                </View>
              )}
            </View>
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard singleMovie={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                marginBottom: 10,
                gap: 15,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default index;

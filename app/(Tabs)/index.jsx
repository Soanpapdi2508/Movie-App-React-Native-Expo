import MovieCard from "@/Components/MovieCard";
import SearchBar from "@/Components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/customHooks/useFetch";
import { getMovies } from "@/Services/Operations/movieOperation";
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
  let {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => getMovies({ query: "" }));
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

        {moviesLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator
              size="large"
              color={"#a8b5db"}
              className="mb-14 self-center"
            />
          </View>
        ) : moviesError ? (
          <Text>Error: {moviesError?.error}</Text>
        ) : (
          <View>
            <View className="flex mt-5">
              <SearchBar
                onPress={() => {
                  router.push("/search?autofocus=true");
                }}
                placeholder={"Search for a Movie"}
              />
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

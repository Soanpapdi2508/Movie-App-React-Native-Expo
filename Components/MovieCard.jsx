import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ singleMovie }) => {
  const { id, popularity, poster_path, release_date, vote_average, title } =
    singleMovie;
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600*400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
        />
        <View className="absolute bottom-0 bg-[#000000a7] rounded-b-lg p-0.5 w-full">
          <Text className="text-white text-sm text-start" >
            {title}
          </Text>
          <View className="flex flex-row  justify-between">
            <View className="flex flex-row justify-start items-center gap-x-1">
              <Image source={icons.star} className="size-5" />
              <Text className="text-white text-xs font-bold uppercase">
                {Math.round(vote_average) / 2}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-bold text-light-300">
                {release_date.split("-")[0]}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

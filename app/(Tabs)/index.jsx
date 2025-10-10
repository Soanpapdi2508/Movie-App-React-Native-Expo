import SearchBar from "@/Components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies } from "@/Services/Operations/movieOperation";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, View } from "react-native";
const index = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <Image className="absolute w-full z-0" source={images.bg} />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
        alwaysBounceVertical={true}
      >
        <Image className="w-12 h-10 mt-20 mb-5 mx-auto" source={icons.logo} />
        <SearchBar
          onPress={() => {
            router.push("/search");
          }}
          placeholder={"Search for a Movie"}
        />
      </ScrollView>
    </View>
  );
};

export default index;

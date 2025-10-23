import { icons } from "@/constants/icons";
import useFetch from "@/customHooks/useFetch";
import { getMovieDetail } from "@/Services/Operations/movieOperation";
import { addSaved, setSavedData } from "@/Store/Slices/Saved";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { monthNames } from "../../constants/constantData";
const MovieInfo = ({ label, data }) => (
  <View className="my-2">
    <Text className="text-sm text-[#A8B5DB] font-normal">{label}</Text>
    <Text className="text-md my-1.5 text-white font-normal">
      {data ? data : "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { savedData } = useSelector((state) => state.savedData);
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState(null);
  const { id: movie_id } = useLocalSearchParams();
  const {
    data: detailsData,
    loading: detailsLoading,
    error: detailsError,
  } = useFetch(() => getMovieDetail(movie_id));
  const handleOnPressFavourite = () => {
    const isMovieSaved = savedData?.some(
      (item) => item?.id === detailsData?.id
    );
    if (isMovieSaved) {
      const filterSavedMovies = savedData?.filter(
        (item) => item?.id !== detailsData?.id
      );
      dispatch(setSavedData(filterSavedMovies));
      setFavourite(false);
    } else {
      dispatch(addSaved(detailsData));
      setFavourite(true);
    }
  };
  return (
    <View className="flex-1 bg-primary">
      {detailsLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            size={"large"}
            className="self-center"
            color={"#a8b5db"}
          />
        </View>
      ) : detailsError ? (
        <Text>{detailsError?.message}</Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <View className="relative">
              <Image
                className="h-[500px] w-full rounded-md"
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${detailsData?.poster_path}`,
                }}
              />
              <TouchableOpacity className=" bg-white rounded-full absolute p-3 right-3 elevation-2xl -bottom-7 ">
                <Image source={icons.play} className="size-10 p-2" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOnPressFavourite}
                className=" bg-white rounded-full absolute p-3 right-20 elevation-2xl -bottom-7 "
              >
                {favourite ||
                savedData?.some((item) => item?.id === detailsData?.id) ? (
                  <Image
                    source={icons.favourite_filled}
                    className="size-10 p-2"
                    tintColor={"#EB0202"}
                  />
                ) : (
                  <Image
                    source={icons.favourite}
                    tintColor={"#AB8BFF"}
                    className="size-10 p-2"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View className="px-4 py-4 flex-col">
              <Text className="text-[20px] font-bold text-white">
                {detailsData?.title}
              </Text>
              <Text className="text-md my-2 text-light-200">
                {detailsData?.release_date.split("-")[0]} •{" "}
                {detailsData?.runtime < 60
                  ? `${Math.floor(detailsData?.runtime)}m`
                  : `${Math.floor(detailsData?.runtime / 60)}h ${Math.round(detailsData?.runtime % 60)}m`}
              </Text>
              <View className="flex-row gap-4">
                <View className="bg-[#221F3D] flex-row self-start items-center rounded-md px-2 py-1.5 gap-2">
                  <Image source={icons.star} className="size-5" />
                  <Text className="my-2 text-md text-white font-bold">
                    {Number(detailsData?.vote_average?.toFixed(1))}
                    <Text className="text-[#A8B5DB] font-normal">
                      /10 {`(${Math.round(detailsData?.popularity)}k)`}
                    </Text>
                  </Text>
                </View>
                <View className="bg-[#221F3D] flex-row self-start items-center rounded-md px-2 py-1.5 gap-2">
                  <Image source={icons.trendingup} className="size-5" />
                  <Text className="my-2 text-md text-[#A8B5DB] font-bold">
                    {detailsData?.vote_count}
                  </Text>
                </View>
              </View>
              <View className="my-4">
                <MovieInfo label={"Overview"} data={detailsData?.overview} />
                <View className="flex-row">
                  <View className="w-[70%]">
                    <MovieInfo
                      label={"Release Date"}
                      data={
                        <Text className="text-md text-[#D6C7FF] font-bold">
                          {
                            monthNames[
                              detailsData?.release_date?.split("-")[1] - 1
                            ]
                          }{" "}
                          {detailsData?.release_date.split("-")[2]},{" "}
                          {detailsData?.release_date.split("-")[0]} (Worldwide)
                        </Text>
                      }
                    />
                  </View>
                  <View>
                    <MovieInfo
                      label={"Status"}
                      data={
                        <Text className="text-md text-[#D6C7FF] font-bold">
                          {detailsData?.status}
                        </Text>
                      }
                    />
                  </View>
                </View>
                <MovieInfo
                  label={"Genres"}
                  data={detailsData?.genres?.map((genre) => (
                    <View key={genre.id} className="">
                      <View className="bg-[#221F3D] self-start rounded-md px-2 py-1 mr-2">
                        <Text className="text-white font-bold">
                          {genre.name}
                        </Text>
                      </View>
                    </View>
                  ))}
                />
                <MovieInfo
                  label={"Countries"}
                  data={
                    <Text className=" text-md font-bold text-[#D6C7FF]">
                      {detailsData?.production_countries
                        ?.map((country) => country.name)
                        .join(" • ")}
                    </Text>
                  }
                />
                <View className="flex-row gap-4">
                  <View>
                    <MovieInfo
                      label={"Budget"}
                      data={
                        <Text className="text-md font-bold text-[#D6C7FF]">
                          {`${detailsData?.budget !== 0 ? "$" + detailsData?.budget / 1_000_000 + " Million" : "N/A"}`}
                        </Text>
                      }
                    />
                  </View>
                  <View>
                    <MovieInfo
                      label={"Revenue"}
                      data={
                        <Text className="text-md font-bold text-[#D6C7FF]">
                          {`${detailsData?.revenue !== 0 ? "$" + Math.round(detailsData?.revenue / 1_000_000) + " Million" : "N/A"}`}
                        </Text>
                      }
                    />
                  </View>
                </View>
                <MovieInfo
                  label={"Tagline"}
                  data={
                    <Text className="text-md font-bold text-[#D6C7FF]">
                      {detailsData?.tagline ? detailsData.tagline : "N/A"}
                    </Text>
                  }
                />
                <MovieInfo
                  label={"Production Companies"}
                  data={
                    <Text className="text-md font-bold text-[#D6C7FF]">
                      {detailsData?.production_companies
                        .map((prod_companies) => prod_companies.name)
                        .join(" • ")}
                    </Text>
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute z-48 w-full p-2 bottom-12 elevation-2xl"
      >
        <View className="items-center justify-center bg-accent mx-4 rounded-lg p-3 gap-2 flex-row">
          <Image
            className="rotate-180"
            source={icons.arrow}
            tintColor="#ffffff"
          />
          <Text className="text-white font-bold text-lg">Go Back</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

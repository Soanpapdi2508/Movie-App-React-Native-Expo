import MovieCard from "@/Components/MovieCard";
import { images } from "@/constants/images";
import { setSavedData } from "@/Store/Slices/Saved";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const saved = () => {
  const dispatch = useDispatch();
  const handleOnClearAll = async () => {
    await AsyncStorage.clear();
    dispatch(setSavedData([]));
  };
  const { savedData } = useSelector((state) => state.savedData);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 w-full"
        resizeMode="cover"
      />
      <View className="my-8 mx-4">
        <FlatList
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          bounces={true}
          bouncesZoom={true}
          data={savedData}
          ItemSeparatorComponent={() => <View className="w-full h-6"></View>}
          renderItem={({ item }) => <MovieCard singleMovie={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            gap: 15,
          }}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListFooterComponentStyle={{
            flexDirection: "row",
            alignItems: "center",
          }}
          ListHeaderComponent={
            <>
              <View className="flex-row justify-between items-center my-8">
                <Text className="font-bold text-white  text-4xl">Saved</Text>
                <TouchableOpacity
                  onPress={handleOnClearAll}
                  className="justify-center"
                >
                  <Text className="font-bold  text-[#A8B5DB] text-xl">
                    Clear All
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
          ListEmptyComponent={() => (
            <View className="flex-1 my-[80%] ">
              <Text className="font-bold text-white text-center text-4xl  self-center">
                No Saved Movies
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default saved;

import { icons } from "@/constants/icons";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Image, TextInput, View } from "react-native";
const SearchBar = ({ onPress, placeholder, onChangeText, value }) => {
  const { autofocus } = useLocalSearchParams();
  return (
    <View className="flex flex-row bg-dark-100 items-center rounded-full">
      <Image
        source={icons.search}
        tintColor={"#ab8nff"}
        resizeMode="contain"
        className="mx-4"
      />
      <TextInput
        autoFocus={autofocus ? true : false}
        onPress={onPress}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        style={{ color: "#a8b5db" }}
        value={value}
      />
    </View>
  );
};

export default SearchBar;

import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";
const SearchBar = ({onPress, placeholder}) => {
  return (
    <View className="flex flex-row bg-dark-100 items-center rounded-full">
      <Image source={icons.search} tintColor={"#ab8nff"} resizeMode="contain" className="mx-4"/>
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        onChangeText={() => {}}
        placeholderTextColor="#a8b5db"
      />
    </View>
  );
};

export default SearchBar;

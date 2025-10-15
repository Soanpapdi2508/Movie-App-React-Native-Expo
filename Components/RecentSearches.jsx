import { Text, TouchableOpacity } from "react-native";

const RecentSearches = ({ title, onPress }) => {
  return (
    <TouchableOpacity className="bg-accent px-2 rounded-xl" onPress={onPress}>
      <Text className="text-md">{title}</Text>
    </TouchableOpacity>
  );
};

export default RecentSearches;

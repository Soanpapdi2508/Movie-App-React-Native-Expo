import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  singleMovie: { movie_id, title, poster_url },
  index,
}) => {
  return (
    <Link href={`/movie/${movie_id}}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          className="w-32 h-48 rounded-lg"
          source={{ uri: poster_url }}
          resizeMode="cover"
        />
        <View className="absolute bottom-0 -left-3 px-2 py-0 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-7xl">{index + 1}</Text>
            }
          >
            <Image className="size-20" resizeMode="cover" source={images.rankingGradient} />
          </MaskedView>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

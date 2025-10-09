import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIconComponent = ({ focused, icon, title }) => {
  if (focused) {
    return (
      <ImageBackground
        className={`flex-row gap-2 flex justify-center items-center mt-6 min-w-[114px] min-h-16 rounded-full overflow-hidden`}
        source={images.highlight}
      >
        <Image className="size-5" source={icon} tintColor="#151312" />
        <Text className="text-secondary text-base font-semibold">
          {title}
        </Text>
      </ImageBackground>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-6 rounded-full">
      <Image className="size-5" source={icon} tintColor="#A8B5DB" />
    </View>
  );
};
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 45,
          height: 55,
          borderWidth: 1,
          borderColor: "#0f0D23",
          position: "absolute",
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIconComponent
              focused={focused}
              icon={icons.home}
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIconComponent
              focused={focused}
              icon={icons.search}
              title="Search"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIconComponent
              focused={focused}
              icon={icons.save}
              title="Saved"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIconComponent
              focused={focused}
              icon={icons.person}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

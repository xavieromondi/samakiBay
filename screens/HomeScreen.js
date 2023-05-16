import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Food from "../components/Food";
import client from "../sanity";
import { useRoute } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [cartCount, setCartCount] = useState(0);
  const route = useRoute();

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (route.params?.cartCount) {
      setCartCount(route.params.cartCount);
    }
  }, [route.params?.cartCount]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Home</Text>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart"); // Navigate to "Cart" screen
          }}
          style={{ marginRight: 16 }}
        >
          <View style={{ position: "relative" }}>
            <FontAwesome5 name="shopping-cart" size={24} color="black" />
            {cartCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  top: -5,
                  right: -5,
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>
                  {cartCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartCount]);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "Restaurant"]{
          name,
          description,
          "imageUrl": image.asset->url,
          price,
          location
        }
        `
      )
      .then((data) => {
        setMenu(data);
      });
  }, []);

  return (
    <SafeAreaView>
      {menu.map((item) => (
        <TouchableOpacity
          key={item.imageUrl}
          onPress={() =>
            navigation.navigate("Details", {
              imageUrl: item.imageUrl,
              name: item.name,
              description: item.description,
              price: item.price,
            })
          }
        >
          <Food
            imageUrl={item.imageUrl}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default HomeScreen;

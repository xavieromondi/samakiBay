import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { URL } from "react-native-url-polyfill"; // Import the URL polyfill

const Food = ({ name, description, price, imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: urlFor(imageUrl).url(),
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};

// Create the URL object with the URL constructor
global.URL = URL;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },
  imageContainer: {
    padding: 16,
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default Food;

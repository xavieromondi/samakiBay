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
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    margin: 16,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 16,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    color: "#777777",
    marginLeft: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginLeft: 16,
  },
});

export default Food;

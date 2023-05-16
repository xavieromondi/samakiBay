import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { urlFor } from "../sanity";
import { CartContext } from "../CartContext";

const DetailsScreen = ({ navigation, route }) => {
  const { state, dispatch } = useContext(CartContext);
  const { imageUrl, name, description, price } = route.params;

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { name, imageUrl, price } });
    navigation.navigate("Home", { cartCount: state.cartItems.length + 1 });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: urlFor(imageUrl).url() }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
  detailsContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailsScreen;

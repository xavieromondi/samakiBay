import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { urlFor } from "../sanity";
import { CartContext } from "../CartContext";

const CartScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(CartContext);

  const removeItem = (itemId) => {
    const updatedCartItems = state.cartItems.filter(
      (item) => item.id !== itemId
    );
    dispatch({
      type: "SET_CART_ITEMS",
      payload: updatedCartItems,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {state.cartItems.length > 0 ? (
          <View style={styles.cartList}>
            {state.cartItems.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Image
                    source={{ uri: urlFor(item.imageUrl).url() }}
                    style={styles.cartItemImage}
                  />
                </TouchableOpacity>
                <View style={styles.cartItemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>sh{item.price}</Text>
                </View>
              </View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>
                sh
                {state.cartItems.reduce((total, item) => total + item.price, 0)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                navigation.navigate("Pay", {
                  totalAmount: state.cartItems.reduce(
                    (total, item) => total + item.price,
                    0
                  ),
                })
              }
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
  },
  cartList: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D5D5D5",
  },
  cartItemImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#666",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#D5D5D5",
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "#666",
  },
  checkoutButton: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "stretch",
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;

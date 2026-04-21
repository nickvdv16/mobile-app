import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCard = ({ image, name, description, price, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>

      <Text style={styles.price}>
        €{(price / 100).toFixed(2).replace(".", ",")}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Bought")}
      >
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    backgroundColor: "#111111",
    borderRadius: 12,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#d0d0d0",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
    fontWeight: "700",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#ff0000",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default ProductCard;
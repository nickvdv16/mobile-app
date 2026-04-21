import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from "react-native";

const BlogDetail = ({ route }) => {
  const { image, title, postBody } = route.params;

  const cleanPostBody = postBody
    ? postBody
        .replace(/<\/p>/g, "\n\n")
        .replace(/<br\s*\/?>/g, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
    : "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Details</Text>

      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.productTitle}>{title}</Text>

      <Text style={styles.productDescription}>{cleanPostBody}</Text>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    paddingBottom: 30,
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 64,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  productTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    textAlign: "center",
  },
  productDescription: {
    fontSize: 16,
    color: "#d0d0d0",
    marginTop: 8,
    textAlign: "left",
    paddingHorizontal: 16,
    lineHeight: 24,
  },
});

export default BlogDetail;
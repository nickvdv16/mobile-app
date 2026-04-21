import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BlogCard from "../components/BlogCard";

const categoryNames = {
  "69b0945d43604ae13b4c6b5f": "Technology",
  "69b0941243604ae13b4c632f": "Smartwatches",
  "69b09425af080c5f7ba8cc7b": "Lifestyle",
  "699efb614c2d07032ff5d8ca": "Horloges",
};

const BlogsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/collections/699efb0b8e29f4a87e9c64dd/items",
      {
        headers: {
          Authorization:
            "Bearer 1ba53b5e81bcef7c47c0bfe994bcbf804966a2ed13c63b1c084ef72c0b907e7d",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedBlogs = data.items.map((item) => ({
          id: item.id,
          title: item.fieldData.name,
          image: item.fieldData["main-image"]?.url || "",
          postBody: item.fieldData["post-body"] || "",
          postSummary: item.fieldData["post-summary"] || "",
          categories: item.fieldData.blog || [],
        }));

        setBlogs(formattedBlogs);
      })
      .catch((error) => {
        console.error("Fout bij ophalen blogs:", error);
      });
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || blog.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const usedCategoryIds = [
    ...new Set(
      blogs
        .flatMap((blog) => blog.categories)
        .filter((categoryId) => categoryNames[categoryId]),
    ),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Blogs</Text>

      <TextInput
        placeholder="Search a blog..."
        placeholderTextColor="#737373"
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "" && styles.categoryButtonActive,
          ]}
          onPress={() => setSelectedCategory("")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === "" && styles.categoryButtonTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {usedCategoryIds.map((categoryId) => (
          <TouchableOpacity
            key={categoryId}
            style={[
              styles.categoryButton,
              selectedCategory === categoryId && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(categoryId)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === categoryId &&
                  styles.categoryButtonTextActive,
              ]}
            >
              {categoryNames[categoryId]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            name={blog.title}
            shortdescription={blog.postSummary}
            onPress={() =>
              navigation.navigate("Details", {
                image: blog.image,
                title: blog.title,
                postBody: blog.postBody,
              })
            }
          />
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 64,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  input: {
    marginVertical: 12,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderColor: "#555",
    borderWidth: 1,
    color: "#000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  categoryRow: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 8,
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
  },
  categoryButtonActive: {
    backgroundColor: "#ff0000",
  },
  categoryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  categoryButtonTextActive: {
    color: "#fff",
  },
});

export default BlogsScreen;
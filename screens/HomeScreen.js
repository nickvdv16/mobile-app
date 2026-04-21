import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ProductCard from "../components/ProductCard";

const categoryNames = {
  "69b07c5693fd9c8efd4d27ad": "Pricey",
  "69b07c3248da55468bc6cbd7": "Cheap",
  "69b06d2006c2316f4127b9e7": "Women",
  "69b06d0b3d72993a1eee5ca5": "Men",
  "699efb614c2d07032ff5d8ca": "Horloge",
};

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/sites/698c7fb6617f4f3ef60b3b32/products", {
      headers: {
        Authorization:
          "Bearer 1ba53b5e81bcef7c47c0bfe994bcbf804966a2ed13c63b1c084ef72c0b907e7d",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedProducts = data.items.map((item) => ({
          id: item.product.id,
          title: item.product.fieldData.name,
          description: item.product.fieldData.description,
          image: item.skus?.[0]?.fieldData?.["main-image"]?.url,
          price: item.skus?.[0]?.fieldData?.price?.value,
          category:
            categoryNames[item.product.fieldData.category?.[0]] || "Unknown",
        }));

        setProducts(formattedProducts);
      })
      .catch((error) => {
        console.error("Fout bij ophalen producten:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home</Text>

      <TextInput
        placeholder="Search a product..."
        placeholderTextColor="#737373"
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Only show promotions</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#81b0ff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All Categories" value="" />
        <Picker.Item label="Pricey" value="Pricey" />
        <Picker.Item label="Cheap" value="Cheap" />
        <Picker.Item label="Women" value="Women" />
        <Picker.Item label="Men" value="Men" />
        <Picker.Item label="Horloge" value="Horloge" />
      </Picker>

      <Picker
        selectedValue={sortOption}
        onValueChange={(itemValue) => setSortOption(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sort By" value="price-asc" />
        <Picker.Item label="Price: Low to High" value="price-asc" />
        <Picker.Item label="Price: High to Low" value="price-desc" />
        <Picker.Item label="Name: A to Z" value="name-asc" />
        <Picker.Item label="Name: Z to A" value="name-desc" />
      </Picker>

      <ScrollView contentContainerStyle={styles.list}>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            onPress={() => navigation.navigate("Details", product)}
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
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  switchText: {
    color: "#fff",
    marginLeft: 8,
  },
  switch: {
    marginVertical: 12,
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
  picker: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
});

export default HomeScreen;
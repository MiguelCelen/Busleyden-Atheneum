import { 
  useState, 
  useEffect 
} from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Button,
  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import ProductCard from "../components/ProductCard";
import NewsCard from "../components/NewsCard";
import CampusCard from "../components/CampusCard";

const stripHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
};

const SITE_ID = "69f20a2fb505c3d204adfa18";
const PRODUCT_TOKEN = "82dd83bbc9f5fe3c6f8d12b62e7a79a36067d6e101068a481781a5b74c9c7459";
const NIEUWS_COLLECTION_ID = "69fb49803851a4b999ac36f0";
const NIEUWS_TOKEN = "9ae8b3b5b6f85debe7fedf0e9717b6219f82db12952ee9f297af83aad129a7f9";
const CAMPUS_COLLECTION_ID = "69fb49714b023ed4bd4348a2";
const CAMPUS_TOKEN = "79709fcae08569ad8254bba15d6a80b856f2d5ebeb068fa7597aa86fa2daaa15";
const OPLEIDINGEN_COLLECTION_ID = "69fdb0d7cfebf91f246221f0";
const OPLEIDINGEN_TOKEN = "68603c8ef1cfe60cc0a0f968050fb45962e49d44ff83e0572cba59fd1dbad6e6";


const CATEGORY_NAMES_PRODUCTEN = {
  "6a15b8d84a681936b260477d": "School & Schrijfgerei",
  "6a15b8ce8c6d2e9b2e9118c9": "Accessoires",
  "6a15b8c28e4cfcdc404b4931": "Drinken & Lunch",
  "6a15b8b7810035385faef692": "Baby & Kids",
  "6a15b8ab0c2f5ebd661c2291": "Kledij",
};

const CATEGORY_NAMES_CAMPUSSEN = {
  "69fb4e3f80e9347c65042b77": "Gezondheid & Wetenschap",
  "69fb4dea1978061caf3102db": "Integraal & Creatief",
  "69fb4dd6b9ae38373650d529": "Buiten-Gewoon Leren",
  "69fb4db280c10c8ff64f4aeb": "Werken & Leren",
  "69fb4d8b3e9b770332a2c97f": "Kennis & Onderzoek",
  "69fb4d6880e9347c6503ebdb": "Mens & Welzijn",
  "69fb4d4cb4c4ed6af2b7070d": "Ondernemen & IT",
  "69fb4d16ed8fcef42a3589b7": "Basisverpleegkunde",
};

const CATEGORY_NAMES_NIEUWS = {
  "69fb4abd9b33382859b0fb44": "Pitzemburg",
  "69fb4a862b1599276f09e013": "Zandpoort",
  "69fb4a7af3551643513407d9": "Verpleegkunde",
};

export default function HomeScreen({ navigation }) {

  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [campusses, setCampusses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchProducts, setSearchProducts] = useState("");
  const [categoryProducts, setCategoryProducts] = useState("");
  const [sortProducts, setSortProducts] = useState("price-asc");

  const [searchNews, setSearchNews] = useState("");
  const [categoryNews, setCategoryNews] = useState("");
  const [sortNews, setSortNews] = useState("name-asc");

  const [showProducts, setShowProducts] = useState(true);
  const [showNews, setShowNews] = useState(true);
  const [showCampusses, setShowCampusses] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchNews();
    fetchCampusses();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://api.webflow.com/v2/sites/${SITE_ID}/products`,
        {
          headers: {
            Authorization: `Bearer ${PRODUCT_TOKEN}`,
            "accept-version": "1.0.0",
          },
        }
      );

      const data = await response.json();

      const formatted = data.items.map(({ id, product, skus }) => ({
        id,
        title: product.fieldData.name,
        subtitle: product.fieldData["description"] || "",
        price: (skus[0].fieldData["price"]?.value / 100).toFixed(2) || "0.00",
        image: skus[0].fieldData["main-image"]?.url || "",
        category: CATEGORY_NAMES_PRODUCTEN[product.fieldData["category"]?.[0]] || "Overig",
      }));

      setProducts(formatted);
    } catch (err) {
      setError("Producten konden niet geladen worden.");
      console.error("API fout producten:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://api.webflow.com/v2/collections/${NIEUWS_COLLECTION_ID}/items`,
        {
          headers: {
            Authorization: `Bearer ${NIEUWS_TOKEN}`,
            "accept-version": "1.0.0",
          },
        }
      );

      const data = await response.json();

      const formatted = data.items.map(({ id, fieldData }, index) => ({
        id: id || `news-${index}`,
        title: fieldData.name,
        description: stripHtml(fieldData["uitgebreide-tekst"] || ""),
        content: fieldData["uitgebreide-tekst"] || "",
        image: fieldData["image-news"]?.url || "",
        date: fieldData["post-date"] || "",
        category:
          CATEGORY_NAMES_NIEUWS[fieldData["campus"]] ||
          CATEGORY_NAMES_NIEUWS[fieldData["campus"]?.[0]] ||
          "Algemeen",
      }));

      setNews(formatted);
    } catch (err) {
      console.error("API fout nieuws:", err);
    }
  };

  const fetchCampusses = async () => {
  try {
    const campusRes = await fetch(
      `https://api.webflow.com/v2/collections/${CAMPUS_COLLECTION_ID}/items`,
      { headers: { Authorization: `Bearer ${CAMPUS_TOKEN}`, "accept-version": "1.0.0" } }
    );
    const campusData = await campusRes.json();

    const oplRes = await fetch(
      `https://api.webflow.com/v2/collections/${OPLEIDINGEN_COLLECTION_ID}/items`,
      { headers: { Authorization: `Bearer ${OPLEIDINGEN_TOKEN}`, "accept-version": "1.0.0" } }
    );
    const oplData = await oplRes.json();

    const opleidingen = oplData.items.map(({ id, fieldData }) => ({
      id,
      name: fieldData.name,
      beschrijving: stripHtml(fieldData["beschrijving"] || ""),
      campusId: fieldData["campus"],
    }));

    const formatted = campusData.items.map(({ id, fieldData }, index) => ({
      id: id || `campus-${index}`,
      name: fieldData.name,
      focus: CATEGORY_NAMES_CAMPUSSEN[fieldData["categorie"]] || "Algemeen",
      address: fieldData["adres"] || "",
      image: fieldData["image-campus"]?.url || "",
      opleidingen: opleidingen.filter((o) => o.campusId === id),
    }));

    setCampusses(formatted);
  } catch (err) {
    console.error("API fout campussen/opleidingen:", err);
  }
};

  const filteredProducts = products.filter((p) => {
    const okCategory = categoryProducts === "" || p.category === categoryProducts;
    const okSearch = p.title.toLowerCase().includes(searchProducts.toLowerCase());
    return okCategory && okSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortProducts === "price-asc") return parseFloat(a.price) - parseFloat(b.price);
    if (sortProducts === "price-desc") return parseFloat(b.price) - parseFloat(a.price);
    if (sortProducts === "name-asc") return a.title.localeCompare(b.title);
    if (sortProducts === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const filteredNews = news.filter((n) => {
    const okCategory = categoryNews === "" || n.category === categoryNews;
    const okSearch = n.title.toLowerCase().includes(searchNews.toLowerCase());
    return okCategory && okSearch;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortNews === "name-asc") return a.title.localeCompare(b.title);
    if (sortNews === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const uniqueCategoriesProducts = [...new Set(products.map((p) => p.category))];
  const uniqueCategoriesNews = [...new Set(news.map((n) => n.category))];

  const resetProductFilters = () => {
    setSearchProducts("");
    setCategoryProducts("");
    setSortProducts("price-asc");
  };

  const resetNewsFilters = () => {
    setSearchNews("");
    setCategoryNews("");
    setSortNews("name-asc");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#88bc25" />
        <Text style={styles.loadingText}>Busleyden Atheneum laden...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Opnieuw proberen" onPress={fetchProducts} color="#88bc25" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <TouchableOpacity
        style={styles.heroCta}
        onPress={() => navigation.navigate("Studiezoeker", { campusses })}
      >
        <Text style={styles.heroEmoji}>🔍</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>Studiezoeker</Text>
          <Text style={styles.heroSubtitle}>Vind de campus die bij jou past</Text>
        </View>
        <Text style={styles.heroArrow}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.gameCta}
        onPress={() => navigation.navigate("Game")}
      >
        <Text style={styles.heroEmoji}>🎓</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>BA Boekenjager</Text>
          <Text style={styles.heroSubtitle}>Hoe snel tik jij?</Text>
        </View>
        <Text style={styles.heroArrow}>›</Text>
      </TouchableOpacity>
      <View style={styles.switchPanel}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Producten</Text>
          <Switch
            value={showProducts}
            onValueChange={setShowProducts}
            trackColor={{ false: "#ccc", true: "#88bc25" }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Nieuws</Text>
          <Switch
            value={showNews}
            onValueChange={setShowNews}
            trackColor={{ false: "#ccc", true: "#88bc25" }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Campussen</Text>
          <Switch
            value={showCampusses}
            onValueChange={setShowCampusses}
            trackColor={{ false: "#ccc", true: "#88bc25" }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {showProducts && (
        <View>
          <Text style={styles.sectionTitle}>Producten ({sortedProducts.length})</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="🔍  Zoek een product..."
            placeholderTextColor="#aaa"
            value={searchProducts}
            onChangeText={setSearchProducts}
          />

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Categorie</Text>
            <Picker
              selectedValue={categoryProducts}
              onValueChange={setCategoryProducts}
              style={styles.picker}
            >
              <Picker.Item label="Alle categorieën" value="" />
              {uniqueCategoriesProducts.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Sorteren op</Text>
            <Picker
              selectedValue={sortProducts}
              onValueChange={setSortProducts}
              style={styles.picker}
            >
              <Picker.Item label="Prijs: laag → hoog" value="price-asc" />
              <Picker.Item label="Prijs: hoog → laag" value="price-desc" />
              <Picker.Item label="Naam: A → Z" value="name-asc" />
              <Picker.Item label="Naam: Z → A" value="name-desc" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={resetProductFilters}>
            <Text style={styles.resetButtonText}>Filters herstellen</Text>
          </TouchableOpacity>

          {sortedProducts.length === 0 ? (
            <Text style={styles.emptyText}>Geen producten gevonden.</Text>
          ) : (
            sortedProducts.map((product, index) => (
              <ProductCard
                key={`product-${index}`}
                title={product.title}
                subtitle={product.subtitle}
                price={product.price}
                image={product.image}
                category={product.category}
                onPress={() => navigation.navigate("ProductDetails", { product })}
              />
            ))
          )}
        </View>
      )}

      {showNews && (
        <View>
          <Text style={styles.sectionTitle}>Nieuws ({sortedNews.length})</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="🔍  Zoek een nieuwsartikel..."
            placeholderTextColor="#aaa"
            value={searchNews}
            onChangeText={setSearchNews}
          />

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Categorie</Text>
            <Picker
              selectedValue={categoryNews}
              onValueChange={setCategoryNews}
              style={styles.picker}
            >
              <Picker.Item label="Alle categorieën" value="" />
              {uniqueCategoriesNews.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Sorteren op</Text>
            <Picker
              selectedValue={sortNews}
              onValueChange={setSortNews}
              style={styles.picker}
            >
              <Picker.Item label="Naam: A → Z" value="name-asc" />
              <Picker.Item label="Naam: Z → A" value="name-desc" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={resetNewsFilters}>
            <Text style={styles.resetButtonText}>↺ Filters herstellen</Text>
          </TouchableOpacity>

          {sortedNews.length === 0 ? (
            <Text style={styles.emptyText}>Geen nieuwsartikelen gevonden.</Text>
          ) : (
            sortedNews.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={item.category}
                date={item.date}
                onPress={() => navigation.navigate("NewsDetails", { news: item })}
              />
            ))
          )}
        </View>
      )}

      {showCampusses && (
        <View>
          <Text style={styles.sectionTitle}>Onze campussen ({campusses.length})</Text>

          {campusses.length === 0 ? (
            <Text style={styles.emptyText}>Campussen kunnen niet geladen worden — controleer Collection ID + token.</Text>
          ) : (
            campusses.map((campus) => (
              <CampusCard
                key={campus.id}
                name={campus.name}
                focus={campus.focus}
                address={campus.address}
                image={campus.image}
                onPress={() => navigation.navigate("CampusDetails", { campus })}
              />
            ))
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => {
          setLoading(true);
          fetchProducts();
          fetchNews();
          fetchCampusses();
        }}
      >
        <Text style={styles.refreshButtonText}>Vernieuwen</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "#88bc25",
    marginBottom: 16,
    textAlign: "center",
  },
  heroCta: {
    backgroundColor: "#88bc25",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heroEmoji: {
    fontSize: 32,
    marginRight: 14,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  heroSubtitle: {
    color: "#DBEAFE",
    fontSize: 13,
  },
  heroArrow: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  switchPanel: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    elevation: 2,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  switchLabel: {
    fontSize: 15,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 11,
    color: "#999",
    marginTop: 6,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  picker: {
    height: 44,
    color: "#333",
  },
  resetButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  resetButtonText: {
    color: "#88bc25",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12,
    marginTop: 8,
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 20,
  },
  refreshButton: {
    backgroundColor: "#88bc25",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  gameCta: {
    backgroundColor: "#88bc25",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
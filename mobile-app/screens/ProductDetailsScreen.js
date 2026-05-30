import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProductDetailsScreen({ route }) {

  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>

      {product.image ? (
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}></Text>
        </View>
      )}

      <View style={styles.infoSection}>

        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.category}</Text>
        </View>

        {product.subtitle ? <Text style={styles.subtitle}>{product.subtitle}</Text> : null}

        <Text style={styles.priceLabel}>Prijs per stuk:</Text>
        <Text style={styles.price}>€ {product.price}</Text>

        <View style={styles.cartSection}>
          <Text style={styles.cartTitle}>Voeg toe aan winkelmand</Text>

          <View style={styles.counter}>

            <TouchableOpacity style={styles.counterBtn} onPress={decreaseQuantity}>
              <Text style={styles.counterBtnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity style={styles.counterBtn} onPress={increaseQuantity}>
              <Text style={styles.counterBtnText}>+</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Totaal ({quantity} stuks):</Text>
            <Text style={styles.totalPrice}>€ {totalPrice}</Text>
          </View>

          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => alert(`Bestelling geplaatst!\n${quantity}x ${product.title}\nTotaal: €${totalPrice}`)}
          >
            <Text style={styles.orderButtonText}>Bestellen</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  image: {
    width: "100%",
    height: 260,
  },
  imagePlaceholder: {
    width: "100%",
    height: 260,
    backgroundColor: "#FFE4D5",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 80,
  },
  infoSection: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#88bc25",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 13,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#88bc25",
    marginBottom: 24,
  },
  cartSection: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cartTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 16,
    textAlign: "center",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  counterBtn: {
    backgroundColor: "#88bc25",
    borderRadius: 8,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  counterBtnText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 26,
  },
  quantity: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    minWidth: 40,
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 14,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 15,
    color: "#555",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#88bc25",
  },
  orderButton: {
    backgroundColor: "#88bc25",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
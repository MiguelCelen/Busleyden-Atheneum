import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";

export default function CampusCard({ name, focus, address, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>

      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>🏫</Text>
        </View>
      )}

      <View style={styles.overlay}>
        <Text style={styles.focus}>{focus}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {address ? (
          <View style={styles.addressRow}>
            <Text style={styles.pinIcon}></Text>
            <Text style={styles.address} numberOfLines={2}>{address}</Text>
          </View>
        ) : null}
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 160,
  },
  imagePlaceholder: {
    width: "100%",
    height: 160,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 50,
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#88bc25",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  focus: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  info: {
    padding: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  pinIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  address: {
    fontSize: 13,
    color: "#666",
    flex: 1,
    lineHeight: 18,
  },
});
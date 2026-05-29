import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";

export default function NewsCard({ title, description, image, category, date, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>

      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}></Text>
        </View>
      )}

      {category ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{category}</Text>
        </View>
      ) : null}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {date ? <Text style={styles.date}>{date}</Text> : null}
        <Text style={styles.description} numberOfLines={3}>{description}</Text>
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
    height: 140,
  },
  imagePlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 40,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#88bc25",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
});
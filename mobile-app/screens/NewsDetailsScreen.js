import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import RenderHtml from "react-native-render-html";

export default function NewsDetailsScreen({ route }) {

  const { news } = route.params;
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>

      {news.image ? (
        <Image
          source={{ uri: news.image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderIcon}></Text>
        </View>
      )}

      <View style={styles.content}>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{news.category}</Text>
        </View>

        <Text style={styles.title}>{news.title}</Text>

        {news.date ? <Text style={styles.date}>{news.date}</Text> : null}

        {news.content ? (
          <RenderHtml
            contentWidth={width}
            source={{ html: news.content }}
            baseStyle={styles.htmlBase}
          />
        ) : (
          <Text style={styles.description}>{news.description}</Text>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Voor meer info over Busleyden Atheneum kan je terecht op de website of bij je campus.
          </Text>
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
    height: 220,
  },
  imagePlaceholder: {
    width: "100%",
    height: 220,
    backgroundColor: "#FFE4D5",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderIcon: {
    fontSize: 60,
  },
  content: {
    padding: 20,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
    lineHeight: 30,
  },
  date: {
    fontSize: 13,
    color: "#999",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 16,
    fontWeight: "500",
  },
  htmlBase: {
    fontSize: 15,
    color: "#444",
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#88bc25",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    fontStyle: "italic",
  },
});
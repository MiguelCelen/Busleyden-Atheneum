import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function CampusDetailsScreen({ route }) {

  const { campus } = route.params;

  const openInMaps = () => {
    if (campus.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.address)}`;
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>

      {campus.image ? (
        <Image
          source={{ uri: campus.image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderIcon}>🏫</Text>
        </View>
      )}

      <View style={styles.content}>

        <View style={styles.focusBadge}>
          <Text style={styles.focusText}>{campus.focus}</Text>
        </View>

        <Text style={styles.name}>{campus.name}</Text>

        {campus.address ? (
          <TouchableOpacity style={styles.addressCard} onPress={openInMaps}>
            <Text style={styles.pinIcon}></Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.addressLabel}>Adres</Text>
              <Text style={styles.address}>{campus.address}</Text>
              <Text style={styles.mapsLink}>Open in Google Maps →</Text>
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Over deze campus</Text>
          <Text style={styles.infoText}>
            {campus.name} is een van de 8 campussen van Busleyden Atheneum in Mechelen.
            De focus van deze campus is <Text style={{ fontWeight: "bold" }}>{campus.focus}</Text>.
          </Text>
        </View>

        {campus.opleidingen && campus.opleidingen.length > 0 ? (
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Opleidingen op deze campus</Text>
          {campus.opleidingen.map((opl) => (
            <View key={opl.id} style={styles.opleidingRow}>
              <Text style={styles.opleidingDot}>•</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.opleidingName}>{opl.name}</Text>
                {opl.beschrijving ? (
                  <Text style={styles.opleidingDesc}>{opl.beschrijving}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      ) : null}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Voor inschrijvingen of een rondleiding, neem contact op via de website.
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
    height: 240,
  },
  imagePlaceholder: {
    width: "100%",
    height: 240,
    backgroundColor: "#FFE4D5",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderIcon: {
    fontSize: 80,
  },
  content: {
    padding: 20,
  },
  focusBadge: {
    backgroundColor: "#88bc25",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  focusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 20,
    lineHeight: 34,
  },
  addressCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    elevation: 2,
  },
  pinIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  addressLabel: {
    fontSize: 11,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  address: {
    fontSize: 15,
    color: "#1a1a1a",
    fontWeight: "500",
    marginBottom: 6,
  },
  mapsLink: {
    fontSize: 13,
    color: "#88bc25",
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
  },
  opleidingRow: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 10,
  },
  opleidingDot: {
    fontSize: 16,
    color: "#88bc25",
    marginRight: 8,
    lineHeight: 20,
  },
  opleidingName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  opleidingDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginTop: 2,
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
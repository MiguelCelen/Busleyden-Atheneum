import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import CampusCard from "../components/CampusCard";

export default function StudiezoekerScreen({ route, navigation }) {

  const { campusses = [] } = route.params || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFocus, setSelectedFocus] = useState("");
  const [onlyMechelen, setOnlyMechelen] = useState(false);

  const uniqueFocuses = [...new Set(campusses.map((c) => c.focus))];
  
  const filteredCampusses = campusses.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.focus.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFocus = selectedFocus === "" || c.focus === selectedFocus;
    const matchesMechelen =
      !onlyMechelen ||
      (c.address && c.address.toLowerCase().includes("mechelen"));

    return matchesSearch && matchesFocus && matchesMechelen;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedFocus("");
    setOnlyMechelen(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.intro}>
        <Text style={styles.introEmoji}>🎓</Text>
        <Text style={styles.introTitle}>Vind jouw campus</Text>
        <Text style={styles.introText}>
          Welke richting interesseert jou? Filter onze 8 campussen op interesseveld
          en vind de plek waar jij wil studeren.
        </Text>
      </View>

      <Text style={styles.label}>Zoek op naam of focus</Text>
      <TextInput
        style={styles.input}
        placeholder="🔍  bv. 'verpleging', 'creatief'..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={styles.label}>Interesseveld</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedFocus}
          onValueChange={setSelectedFocus}
          style={styles.picker}
        >
          <Picker.Item label="Alle domeinen" value="" />
          {uniqueFocuses.map((focus) => (
            <Picker.Item key={focus} label={focus} value={focus} />
          ))}
        </Picker>
      </View>

      <View style={styles.switchRow}>
        <View>
          <Text style={styles.switchLabel}>Enkel campussen in Mechelen</Text>
          <Text style={styles.switchHint}>Filter campussen op locatie</Text>
        </View>
        <Switch
          value={onlyMechelen}
          onValueChange={setOnlyMechelen}
          trackColor={{ false: "#ccc", true: "#88bc25" }}
          thumbColor="#fff"
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
        <Text style={styles.resetButtonText}>Filters herstellen</Text>
      </TouchableOpacity>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          {filteredCampusses.length} {filteredCampusses.length === 1 ? "campus" : "campussen"} gevonden
        </Text>
      </View>

      {filteredCampusses.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🔎</Text>
          <Text style={styles.emptyTitle}>Geen resultaten</Text>
          <Text style={styles.emptyText}>
            Probeer minder filters of zoek op een ander interesseveld.
          </Text>
        </View>
      ) : (
        filteredCampusses.map((campus) => (
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
  intro: {
    backgroundColor: "#88bc25",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  introEmoji: {
    fontSize: 40,
    marginBottom: 6,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: "#DBEAFE",
    textAlign: "center",
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    color: "#1a1a1a",
    fontWeight: "600",
    marginTop: 6,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    paddingHorizontal: 8,
  },
  picker: {
    height: 44,
    color: "#333",
  },
  switchRow: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  switchLabel: {
    fontSize: 15,
    color: "#1a1a1a",
    fontWeight: "500",
    marginBottom: 2,
  },
  switchHint: {
    fontSize: 12,
    color: "#999",
  },
  resetButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  resetButtonText: {
    color: "#88bc25",
    fontSize: 14,
    fontWeight: "600",
  },
  resultsHeader: {
    marginBottom: 12,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  emptyBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    marginVertical: 16,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});
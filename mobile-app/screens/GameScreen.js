import { 
  useState, 
  useEffect 
} from "react";

import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";

export default function GameScreen() {

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    if (timeLeft === 0) {
      setGameOver(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  const handleTap = () => {
    if (!gameOver) {
      setScore(score + 1);
    }
  };

  const restart = () => {
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.endEmoji}>🎓</Text>
        <Text style={styles.endTitle}>Tijd is om!</Text>
        <Text style={styles.endScore}>{score}</Text>
        <Text style={styles.endLabel}>boeken verzameld</Text>
        <TouchableOpacity style={styles.restartButton} onPress={restart}>
          <Text style={styles.restartText}>Opnieuw</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{timeLeft}s</Text>
      <Text style={styles.score}>Score: {score}</Text>

      <TouchableOpacity style={styles.tapButton} onPress={handleTap}>
        <Text style={styles.tapEmoji}>📚</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Tik zo snel mogelijk op het boek!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  timer: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#88bc25",
    marginBottom: 8,
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#88bc25",
    marginBottom: 40,
  },
  tapButton: {
    backgroundColor: "#88bc25",
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  tapEmoji: {
    fontSize: 100,
  },
  hint: {
    fontSize: 16,
    color: "#666",
    marginTop: 30,
  },

  endEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  endTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 24,
  },
  endScore: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#88bc25",
  },
  endLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 36,
  },
  restartButton: {
    backgroundColor: "#88bc25",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  restartText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
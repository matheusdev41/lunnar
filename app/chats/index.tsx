import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chats = [
    { id: "1", name: "Maria", lastMessage: "Oi!"},
    { id: "2", name: "João", lastMessage: "Tudo bem!"},
    { id: "3", name: "Grupo Dev", lastMessage: "Deploy feito" },
];

export default function Chatlist() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
              data={chats}
              keyExtractor={(item) => item.id}
              renderItem={({ item}) => (
                <TouchableOpacity
                  onPress={() => router.push(`/chat/${item.id}`)}
                  style={styles.flatlist}
                >
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.lastMessage}</Text>
                </TouchableOpacity>
              )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatlist: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    text: {
        fontWeight: "bold",
        color: "#666",
    }
})
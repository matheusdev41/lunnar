import { useRouter } from "expo-router";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chats = [
    { 
      id: "1", 
      name: "Maria", 
      lastMessage: "Oi!",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    { 
      id: "2", 
      name: "João", 
      lastMessage: "Tudo bem!",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    { 
      id: "3", 
      name: "Grupo Dev", 
      lastMessage: "Deploy feito",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
];

export default function Chatlist() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>LunnarApp</Text>

            <TextInput 
              placeholder="Pesquise Aqui"
              style={styles.input}
            />
            <FlatList
              data={chats}
              keyExtractor={(item) => item.id}
              renderItem={({ item}) => (
                <TouchableOpacity
                  onPress={() => router.push(`/chat/${item.id}`)}
                  style={styles.flatlist}
                >
                  <Image 
                    source={{ uri: item.avatar }}
                    style={styles.avatar}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.lastMessage}</Text>
                  </View>
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
        borderBottomWidth: 1,
        borderColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
    },
    text: {
        fontWeight: "bold",
        color: "#666",
    },
    header: {
        fontSize: 23,
        fontWeight: "bold",
        padding: 16,
        borderBottomWidth: 1,
        borderColor: "#eee",
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        width: "90%",
        alignSelf: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
})
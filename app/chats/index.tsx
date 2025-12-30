import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../services/api";



export default function Chatlist() {
    const router = useRouter();
    const [chats, setChats] = useState<any[]>([]);

    console.log("API ===>", api);
  


    useEffect(() => {
      api.get("/chats/")
        .then(res => {
            console.log("RESPOSTA API => ",res.data);
            console.log(res.data);
            setChats(res.data)
        })
        .catch(err => console.log("ERRO API => ",err))
    }, []);

    console.log("CHATS =>", chats);

    return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>LunnarApp</Text>

    <TextInput
      placeholder="Pesquise Aqui"
      style={styles.input}
    />

    {chats.length === 0 ? (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Nenhuma conversa encontrada
      </Text>
    ) : (
      <FlatList
        data={chats}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({
              pathname: "/chat/[id]",
              params: {
                id: item.id,
                name: item.name,
                photo: item.photo ?? "",
              },
            })
          }
          style={styles.flatlist}
          >
            <Image
              source={
                item.photo
                  ? { uri: item.photo }
                  : require("../../assets/images/icon.png")
              }
              style={styles.avatar}
            />

            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>
                {item.last_message?.content ?? "Sem mensagens"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    )}
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
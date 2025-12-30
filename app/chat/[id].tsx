import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";


import ChatHeader from "@/components/ChatHeader";
    
type Message = {
    id: number;
    content: string;
    is_me: boolean;
    sender: number;
    sender_name: string;
    created_at: string;
};



export default function Chat() {

    const [text, setText] = useState("");
    const flatlistRef = useRef<FlatList>(null);
    
    const { id, name, photo } = useLocalSearchParams();
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async () => {
        if (!text.trim()) return;

        try {
            const res = await api.post(`/chats/${id}/messages/`, {
                content: text,
            });

            setMessages((prev) => [...prev, res.data]);
            setText("");

            setTimeout(() => {
                flatlistRef.current?.scrollToEnd({ animated: true });
            }, 100);
        } catch (err) {
            console.log("Erro ao enviar mensagem", err);
        }
    };

    useEffect(() => {
        api
          .get(`/chats/${id}/messages/`)
          .then((res) => {
            console.log("MESSAGES: ",res.data);
            setMessages(res.data);
          })
          .catch(err => console.log(err));
    }, [id]);

    return (
        <View style={{ flex: 1 }}>
            <ChatHeader
             name={String(name ?? "Chat")}
             photo={String(photo ?? "")}
            />
            <ImageBackground
                source={require("@/assets/images/whatsapp.jpg")} 
                style={styles.container}
                imageStyle={{ opacity: 0.6 }}
                resizeMode="cover"
            >
                    <FlatList<Message>
                    ref={flatlistRef}
                    data={messages}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                    <View style={[
                        styles.message,
                        item.is_me ? styles.myMessage : styles.otherMessage,
                    ]}
                    >
                      {!item.is_me &&(
                        <Text style={styles.sender}>{item.sender_name}</Text>
                      )}
                      <Text>{item.content}</Text>                    
                 </View>
               )} 
            />
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Digite sua mensagem"
                    value={text}
                    onChangeText={setText}
                    style={styles.input}
                />

                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Text style={styles.sendText}>➤</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
     </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    message: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: "75%"
    },
    myMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#DCE8C6",
    },
    otherMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
    },
    sender: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#555",
    },
    inputContainer: {
        alignItems:"center",
        padding: 8,
        backgroundColor: "#fff",
        marginBottom: 30,
        flexDirection: "row"
    },

    sendButton: {
        backgroundColor:"#76c091",
        padding: 12,
        borderRadius: 50,
        marginLeft: 8,
    },

    sendText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
    }
});

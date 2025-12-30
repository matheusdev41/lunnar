import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";
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
   
    const { id, name, photo } = useLocalSearchParams();
    const [messages, setMessages] = useState<Message[]>([]);

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
});

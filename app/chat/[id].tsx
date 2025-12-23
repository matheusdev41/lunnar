import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";

import ChatHeader from "@/components/ChatHeader";

const mockMessages = [
    { id: "1", text: 'oi', from: "other" },
    { id: "2", text: 'fala, tudo certo!', from: "me" },
    { id: "3", text: 'tudo sim', from: "other" }
];

export default function Chat() {
    const { id } = useLocalSearchParams();
    const [messages, setMessages] = useState(mockMessages);
    const [text, setText] = useState("");

    const sendMessage = () => {
        if (!text.trim()) return;

        setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), text, from: "me"},
        ]);
        setText("");
    }
    return (
        <View style={{ flex: 1 }}>
            <ChatHeader
             name="Cauã Daniel"
             photo="https://i.pravatar.cc/150?img=3"
            />
            <ImageBackground
                source={require("@/assets/images/whatsapp.jpg")} 
                style={styles.container}
                imageStyle={{ opacity: 0.6 }}
                resizeMode="cover"
            >
                    <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <View style={{
                        alignSelf: item.from === 'me' ? 'flex-end' : 'flex-start',
                        backgroundColor: item.from === 'me' ? "#DCF8C6" : "#FFF",
                        padding: 10,
                        borderRadius: 8,
                        marginBottom: 8,
                        maxWidth: "75%",
                    }}
                    >
                    <Text>{item.text}</Text>                    
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
})

import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <SafeAreaView style={styles.container}>
            <FlatList
               data={messages}
               keyExtractor={(item) => item.id}
               renderItem={({ item }) => (
                 <View style={{
                    alignItems: item.from === 'me' ? 'flex-end' : 'flex-start',
                    backgroundColor:
                        item.from === 'me' ? '#DCF8C6' : '#FFF',
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 8,
                 }}
                >
                    <Text>{item.text}</Text>                    
                 </View>
               )} 
            />

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
})

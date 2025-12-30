import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import api from "../services/api";

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login/", {
                username,
                password,
            });

            const { access } = res.data;

            // salva o token em memória
            api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

            router.replace("/chats");
        } catch (err) {
            Alert.alert("Erro", "Usuário ou senha inválidos");
            console.log(err);
            
        }
    };

    return (
       <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
       >
         <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
         >
            <Text style={styles.title}>Lunnar</Text>

            <TextInput
              placeholder="Usuário"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16, 
    },
    button: {
        backgroundColor: "#76c091ff",
        padding: 14,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    }

})

import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
    const router = useRouter();

    const handleLogin = () => {
        // Login Fake
        router.replace("/chats");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lunar</Text>

            <TextInput
                placeholder="Seu nome"
                style={styles.input}
            />
            
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
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
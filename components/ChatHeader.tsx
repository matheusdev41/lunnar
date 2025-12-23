import { Entypo, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ChatHeaderProps {
    name: string;
    photo: string;
}

export default function ChatHeader({ name, photo }: ChatHeaderProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return  (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.left}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#050505ff" />
                    </TouchableOpacity>

                    <Image 
                        source={{ uri:photo }}
                        style={styles.avatar}
                    />

                    <Text style={styles.name}>{name}</Text>
                </View>

                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={20} color="#000000ff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffffff"
    },
    header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
        marginTop: 40,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    name: {
        fontSize: 16,
        fontWeight: "600" 
    },
})
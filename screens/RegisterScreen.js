import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	KeyboardAvoidingView,
	TextInput,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const navigation = useNavigation();
	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
		>
			<View style={{ marginTop: 50 }}>
				<Image
					style={{
						width: 150,
						height: 100,
						resizeMode: "contain",
					}}
					source={{
						uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
					}}
				/>
			</View>

			<KeyboardAvoidingView>
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 20 }}>
						Create an account
					</Text>
				</View>
				<View style={{ marginTop: 40, gap: 20 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 5,
							borderColor: "#d0d0d0",
							borderWidth: 1,
							paddingVertical: 5,
							borderRadius: 5,
						}}
					>
						<FontAwesome
							style={{ marginLeft: 10 }}
							name='user'
							size={24}
							color='black'
						/>
						<TextInput
							style={{
								color: "gray",
								marginVertical: 10,
								width: 300,
								fontSize: 16,
							}}
							placeholder='Enter your name'
							value={name}
							onChangeText={(text) => setName(text)}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 5,
							borderColor: "#d0d0d0",
							borderWidth: 1,
							paddingVertical: 5,
							borderRadius: 5,
						}}
					>
						<MaterialIcons
							style={{ marginLeft: 10 }}
							name='email'
							size={24}
							color='black'
						/>
						<TextInput
							style={{
								color: "gray",
								marginVertical: 10,
								width: 300,
								fontSize: 16,
							}}
							placeholder='Enter your email'
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 5,
							borderColor: "#d0d0d0",
							borderWidth: 1,
							paddingVertical: 5,
							borderRadius: 5,
						}}
					>
						<MaterialIcons
							style={{ marginLeft: 10 }}
							name='lock'
							size={24}
							color='black'
						/>
						<TextInput
							style={{
								color: "gray",
								marginVertical: 10,
								width: 300,
								fontSize: 16,
							}}
							placeholder='Enter your Password'
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
					</View>
				</View>

				<View style={{ marginTop: 10 }}>
					<Pressable
						// onPress={handleLogin}
						style={{
							width: 200,
							backgroundColor: "black",
							padding: 15,
							marginTop: 40,
							marginLeft: "auto",
							marginRight: "auto",
							borderRadius: 6,
						}}
					>
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
								fontSize: 16,
								color: "white",
							}}
						>
							Register
						</Text>
					</Pressable>
					<Pressable
						onPress={() => navigation.navigate("Login")}
						style={{ marginTop: 10 }}
					>
						<Text style={{ textAlign: "center", fontSize: 16 }}>
							Already have an account? Sign In
						</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({});

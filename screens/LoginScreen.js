import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	KeyboardAvoidingView,
	TextInput,
	Pressable,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();

	useEffect(() => {
		checkLoginStatus();
	}, []);

	const checkLoginStatus = async () => {
		try {
			const token = AsyncStorage.getItem("authToken");

			if (token) {
				setTimeout(() => {
					navigation.replace("Home");
				}, 400);
			}
		} catch (error) {
			console.log("Error", error);
		}
	};

	const handleLogin = () => {
		const userData = {
			email,
			password,
		};
		axios
			.post("http://10.0.2.2:3000/login", userData)
			.then((res) => {
				console.log(res);
				const token = res?.data?.token;
				AsyncStorage.setItem("authToken", token);
				navigation.navigate("Home");
			})
			.catch((error) => {
				console.log(error);
				Alert.alert("Login Failed");
			});
	};

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
						Login to your account
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
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: 12,
					}}
				>
					<Text>Keep me logged In</Text>
					<Text style={{ fontWeight: "500", color: "#007fff" }}>
						Forget Password
					</Text>
				</View>
				<View style={{ marginTop: 10 }}>
					<Pressable
						onPress={handleLogin}
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
							Login
						</Text>
					</Pressable>
					<Pressable
						onPress={() => navigation.navigate("Register")}
						style={{ marginTop: 10 }}
					>
						<Text style={{ textAlign: "center", fontSize: 16 }}>
							Don't have an account? Sign up
						</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});

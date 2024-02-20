import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";

export default function App() {
	return (
		<>
			<StackNavigator />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		padding: 32,
		// justifyContent: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
});

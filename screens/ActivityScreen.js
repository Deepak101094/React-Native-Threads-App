import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";

const ActivityScreen = () => {
	const [selectedButton, setSelectedButton] = useState("people");
	const [content, setContent] = useState("People Content");

	const handleButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
	};

	return (
		<ScrollView style={{ marginTop: 50 }}>
			<View style={{ padding: 10 }}>
				<Text style={{ fontSize: 18, fontWeight: "bold" }}>Activity</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: 10,
					marginTop: 12,
				}}
			>
				<TouchableOpacity
					onPress={() => handleButtonClick("people")}
					style={[
						{
							flex: 1,
							paddingVertical: 10,
							paddingHorizontal: 20,
							backgroundColor: "white",
							borderColor: "#D0D0D0",
							borderRadius: 6,
							borderWidth: 0.7,
						},
						selectedButton === "people" ? { backgroundColor: "black" } : null,
					]}
				>
					<Text
						style={[
							{ textAlign: "center", fontWeight: "bold" },
							selectedButton === "people"
								? { color: "white" }
								: { color: "black" },
						]}
					>
						People
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => handleButtonClick("all")}
					style={[
						{
							flex: 1,
							paddingVertical: 10,
							paddingHorizontal: 20,
							backgroundColor: "white",
							borderColor: "#D0D0D0",
							borderRadius: 6,
							borderWidth: 0.7,
						},
						selectedButton === "all" ? { backgroundColor: "black" } : null,
					]}
				>
					<Text
						style={[
							{ textAlign: "center", fontWeight: "bold" },
							selectedButton === "all"
								? { color: "white" }
								: { color: "black" },
						]}
					>
						All
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => handleButtonClick("requests")}
					style={[
						{
							flex: 1,
							paddingVertical: 10,
							paddingHorizontal: 20,
							backgroundColor: "white",
							borderColor: "#D0D0D0",
							borderRadius: 6,
							borderWidth: 0.7,
						},
						selectedButton === "requests" ? { backgroundColor: "black" } : null,
					]}
				>
					<Text
						style={[
							{ textAlign: "center", fontWeight: "bold" },
							selectedButton === "requests"
								? { color: "white" }
								: { color: "black" },
						]}
					>
						Requests
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default ActivityScreen;

const styles = StyleSheet.create({});

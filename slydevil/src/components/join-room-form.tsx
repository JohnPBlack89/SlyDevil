import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ActionButton, Copy, Field, Notice } from "@/components/screen-ui";
import { defaultRoom, useRoomPreview } from "@/components/room-preview";

export function JoinRoomForm() {
	const { setRoom } = useRoomPreview();
	const params = useLocalSearchParams<{ code?: string }>();
	const [code, setCode] = useState(
		typeof params.code === "string"
			? params.code.slice(0, 6).toUpperCase()
			: "",
	);
	const [error, setError] = useState("");
	function join() {
		const normalized = code.trim().toUpperCase();
		if (normalized !== defaultRoom.code) {
			setError(
				"Room not found. Try the sample code X7K2Q9 to preview the lobby.",
			);
			return;
		}
		setRoom({ ...defaultRoom, host: false });
		router.navigate("/game-lobby");
	}
	return (
		<>
			<Copy heading>Join an existing room</Copy>
			<Field
				label="Room code"
				placeholder="Enter room code (e.g. X7K2Q9)"
				value={code}
				maxLength={6}
				autoCapitalize="characters"
				autoCorrect={false}
				onChangeText={(value) => {
					setCode(value);
					setError("");
				}}
				onSubmitEditing={join}
				returnKeyType="go"
			/>
			{error ? <Notice error>{error}</Notice> : null}
			<ActionButton onPress={join}>Join room →</ActionButton>
			<Notice>
				Preview room: X7K2Q9. Live room joining is not connected yet.
			</Notice>
		</>
	);
}

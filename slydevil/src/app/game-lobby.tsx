import { useState } from "react";
import { Platform, Share, View } from "react-native";
import * as Linking from "expo-linking";
import { NavigationButton } from "@/components/navigation-button";
import { previewPlayers, useRoomPreview } from "@/components/room-preview";
import { ActionButton, Copy, DataRow, Notice, Panel, Screen, ui } from "@/components/screen-ui";

export default function GameLobbyScreen() {
  const { room } = useRoomPreview();
  const [ready, setReady] = useState(true);
  const [message, setMessage] = useState("");
  // Riley's pending readiness is the illustrative waiting state in the wireframe.
  const allReady = ready && previewPlayers.slice(1).every((player) => player.ready);
  async function share(value: string) {
    try {
      if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(value);
        setMessage("Copied to clipboard.");
      } else {
        await Share.share({ message: value });
      }
    } catch {
      setMessage("Could not share. You can select and copy the room code above.");
    }
  }
  return <Screen title="Lobby for Room" subtitle={room.name + (room.host ? " · You are the host" : " · You are a guest")}>
    <Panel>
      <Copy style={ui.label}>ROOM CODE</Copy>
      <Copy selectable style={ui.code}>{room.code}</Copy>
      <View style={ui.row}>
        <ActionButton variant="text" onPress={() => share(room.code)}>{Platform.OS === "web" ? "Copy code" : "Share code"}</ActionButton>
        <ActionButton variant="text" onPress={() => share(Linking.createURL("/game-find", { queryParams: { code: room.code } }))}>{Platform.OS === "web" ? "Copy invite link" : "Share invite link"}</ActionButton>
      </View>
      {message ? <Notice>{message}</Notice> : null}
    </Panel>
    <View style={ui.row}><Copy heading style={ui.flex}>Players 5 / {room.maxPlayers}</Copy><Copy muted>Standard</Copy></View>
    <View>{previewPlayers.map((player, index) => <DataRow key={player.name} name={index === 0 ? player.name + (room.host ? " (you / host)" : " (host)") : index === 4 && !room.host ? player.name + " (you)" : player.name} detail={(index === (room.host ? 0 : 4) ? ready : player.ready) ? "Ready" : "Not ready"} />)}</View>
    <Notice>Waiting for Riley to get ready…</Notice>
    <ActionButton variant="secondary" accessibilityState={{ selected: ready }} onPress={() => setReady(!ready)}>{ready ? "✓ You are ready" : "Mark yourself ready"}</ActionButton>
    {room.host ? <NavigationButton href="/game-room" disabled={!allReady}>Start game</NavigationButton> : <ActionButton disabled>Waiting for host</ActionButton>}
    <View style={ui.row}>
      {room.host && <NavigationButton href={{ pathname: "/game-create", params: { edit: "true" } }} variant="text" style={ui.split}>Room settings</NavigationButton>}
      <NavigationButton href="/" variant="text" style={ui.split}>Leave room</NavigationButton>
    </View>
    <Panel><Copy heading>Sample lobby</Copy><Notice>These players illustrate the waiting state. Live readiness and multiplayer are not connected yet.</Notice><NavigationButton href="/game-room" variant="secondary">Preview game screen</NavigationButton></Panel>
  </Screen>;
}


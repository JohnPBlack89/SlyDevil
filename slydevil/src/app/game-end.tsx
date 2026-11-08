import { View } from "react-native";
import { NavigationButton } from "@/components/navigation-button";
import { previewPlayers, useRoomPreview } from "@/components/room-preview";
import { Copy, DataRow, Notice, Panel, Screen } from "@/components/screen-ui";

export default function GameEndScreen() {
  const { room } = useRoomPreview();
  return <Screen title="Game Over" subtitle="The truth is out. See who fooled the room.">
    <Panel><Copy heading>THE VILLAGE WINS</Copy><Copy>All Devils eliminated · 4 rounds played</Copy></Panel>
    <Copy heading>Final role reveal</Copy>
    <View>{previewPlayers.map((player, index) => <DataRow key={player.name} name={player.name + (index === (room.host ? 0 : 4) ? " (you)" : "")} detail={player.role + " · " + (player.alive ? "Alive" : "Eliminated")} />)}</View>
    <Copy muted>Rematch keeps this room and its players.</Copy>
    <NavigationButton href="/game-lobby" replace>Return to lobby for rematch →</NavigationButton>
    <NavigationButton href="/" variant="secondary" replace>Back to home</NavigationButton>
    <Notice>Host starts the next game after players ready up.</Notice>
    <Notice>Sample results from the wireframe, not a completed live game.</Notice>
  </Screen>;
}


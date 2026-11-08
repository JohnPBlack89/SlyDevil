import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { NavigationButton } from "@/components/navigation-button";
import { useRoomPreview } from "@/components/room-preview";
import { ActionButton, Copy, Field, Notice, Options, Panel, Screen, SelectField } from "@/components/screen-ui";

export default function GameCreateScreen() {
  const { room, setRoom } = useRoomPreview();
  const { edit } = useLocalSearchParams<{ edit?: string }>();
  const editing = edit === "true";
  const [name, setName] = useState(editing ? room.name : "");
  const [maxPlayers, setMaxPlayers] = useState(editing ? room.maxPlayers : "8");
  const [visibility, setVisibility] = useState(editing ? room.visibility : "Private / code only");
  const [error, setError] = useState("");
  function submit() {
    if (!name.trim()) { setError("Enter a room name."); return; }
    if (editing && !room.host) { setError("Only the host can change room settings."); return; }
    setRoom({ ...room, name: name.trim(), maxPlayers, visibility, host: true });
    router.replace("/game-lobby");
  }
  return <Screen title={editing ? "Room Settings" : "Create Room"} subtitle="Set up a private game for your friends.">
    <Field label="Room name" placeholder="Friday Night Suspects" value={name} onChangeText={(value) => { setName(value); setError(""); }} maxLength={60} />
    <SelectField label="Maximum players" options={["5 players", "6 players", "8 players", "10 players", "12 players"]} value={maxPlayers + " players"} onChange={(value) => setMaxPlayers(value.split(" ")[0])} />
    <SelectField label="Game mode" options={["Standard"]} value="Standard" onChange={() => {}} />
    <Options label="Visibility" options={["Private / code only", "Public"]} value={visibility} onChange={setVisibility} />
    <Panel><Copy heading>Standard roles</Copy><Copy>Devil · Oracle · Warden · Villager</Copy><Copy muted>Roles are assigned privately when play starts.</Copy></Panel>
    {error ? <Notice error>{error}</Notice> : null}
    <ActionButton onPress={submit}>{editing ? "Save settings & return to lobby" : "Create room & enter lobby →"}</ActionButton>
    <NavigationButton href={editing ? "/game-lobby" : "/"} variant="text">{editing ? "Cancel" : "Back to home"}</NavigationButton>
    <Notice>Room preview. Settings stay in this app session; no online room is created.</Notice>
  </Screen>;
}


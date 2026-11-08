import { useCallback, useEffect, useState } from "react";
import { AppState, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { NavigationButton } from "@/components/navigation-button";
import { useRoomPreview } from "@/components/room-preview";
import { ActionButton, Copy, Notice, Panel, Screen, VoteChoices, ui } from "@/components/screen-ui";

export default function GameRoomScreen() {
  const { room } = useRoomPreview();
  const [revealed, setRevealed] = useState(false);
  const [target, setTarget] = useState("");
  const [vote, setVote] = useState("");
  const [leaving, setLeaving] = useState(false);
  useFocusEffect(useCallback(() => () => setRevealed(false), []));
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") setRevealed(false);
    });
    return () => subscription.remove();
  }, []);
  return <Screen title="Game Room" subtitle={"Room " + room.code + " · Day 2 · Discussion / vote"}>
    <Panel><View style={ui.row}><Copy style={ui.flex}>Time remaining 01:24</Copy><Copy>5 players alive</Copy></View><Notice>Sample daytime state · The timer is illustrative.</Notice></Panel>
    <Panel>
      <Copy heading>{revealed ? "Your role: " + (room.host ? "Oracle" : "Villager") : "Your role: [Hidden]"}</Copy>
      <ActionButton variant="text" onPress={() => setRevealed(!revealed)}>{revealed ? "Hide role" : "Reveal privately"}</ActionButton>
      {revealed && <Copy>{room.host ? "Each night, learn whether a player is a Devil. Keep your identity secret." : "Find the Devils through discussion and voting. Keep your identity secret."}</Copy>}
      <Copy muted style={ui.small}>Only you can see your role and night results.</Copy>
    </Panel>
    <VoteChoices options={room.host ? ["Alex", "Sam", "Riley", "Morgan"] : ["Johnny", "Alex", "Sam", "Riley"]} value={target} onChange={setTarget} disabled={!!vote} />
    <ActionButton disabled={!target || !!vote} onPress={() => setVote(target)}>{vote ? "Vote confirmed" : "Confirm vote →"}</ActionButton>
    <Notice>{vote ? "3 / 5 votes submitted · Your sample ballot is confirmed." : "2 / 5 votes submitted · Ballots stay private"}</Notice>
    <Panel><Copy heading>Room discussion / activity</Copy><Copy>Alex: Who did everyone suspect?</Copy><Copy muted>System: Day 2 has started.</Copy></Panel>
    <View style={ui.row}><Copy muted style={ui.flex}>Preview session</Copy><ActionButton variant="text" onPress={() => setLeaving(true)}>Leave game</ActionButton></View>
    {leaving && <Panel><Copy heading>Leave this game?</Copy><Copy>You can return to the sample lobby.</Copy><NavigationButton href="/game-lobby" variant="secondary" replace>Leave game</NavigationButton><ActionButton variant="text" onPress={() => setLeaving(false)}>Keep playing</ActionButton></Panel>}
    <Notice>Night phase swaps voting for your private action. Live chat and game actions are not connected yet.</Notice>
    <NavigationButton href="/game-end" variant="secondary">Preview game over</NavigationButton>
  </Screen>;
}


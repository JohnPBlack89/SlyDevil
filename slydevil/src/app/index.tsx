import { View } from "react-native";
import { NavigationButton } from "@/components/navigation-button";
import { JoinRoomForm } from "@/components/join-room-form";
import { Copy, Panel, Screen, ui } from "@/components/screen-ui";

export default function HomeScreen() {
  return <Screen title="Home Page" subtitle="A game of secrets, suspicion, and survival.">
    <Panel><Copy heading>Who can you trust?</Copy><Copy>Gather your friends. Find the Devils.{"\n"}Keep your own identity secret.</Copy></Panel>
    <NavigationButton href="/game-create">Create a room →</NavigationButton>
    <JoinRoomForm />
    <View style={ui.row}>
      <NavigationButton href="/account-login" variant="secondary" style={ui.split}>Log in</NavigationButton>
      <NavigationButton href="/account-create" variant="secondary" style={ui.split}>Create account</NavigationButton>
    </View>
    <Panel><Copy heading>How to play</Copy><Copy>1. Join a room{"\n"}2. Get a secret role{"\n"}3. Discuss, vote, and survive</Copy></Panel>
    <NavigationButton href="/game-find" variant="text">Find a room</NavigationButton>
  </Screen>;
}

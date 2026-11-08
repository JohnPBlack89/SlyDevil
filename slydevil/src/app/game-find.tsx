import { JoinRoomForm } from "@/components/join-room-form";
import { NavigationButton } from "@/components/navigation-button";
import { Screen } from "@/components/screen-ui";

export default function GameFindScreen() {
  return <Screen title="Find a Room" subtitle="Have an invite? Enter the room code to join your friends.">
    <JoinRoomForm />
    <NavigationButton href="/game-create" variant="secondary">Create a room instead</NavigationButton>
    <NavigationButton href="/" variant="text">Back to home</NavigationButton>
  </Screen>;
}


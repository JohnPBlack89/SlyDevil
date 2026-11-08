import { useState } from "react";
import { NavigationButton } from "@/components/navigation-button";
import { ActionButton, Copy, Field, Notice, Panel, Screen } from "@/components/screen-ui";

export default function AccountViewScreen() {
  const [name, setName] = useState("Johnny");
  const [savedName, setSavedName] = useState("Johnny");
  const [message, setMessage] = useState("");
  return <Screen title="Your Account" subtitle="The name other players see when you join a room.">
    <Panel><Copy heading>{savedName}</Copy><Copy muted>Sample player · Account preview</Copy></Panel>
    <Field label="Display name" value={name} onChangeText={(value) => { setName(value); setMessage(""); }} maxLength={32} />
    <ActionButton onPress={() => { if (!name.trim()) { setMessage("Enter a display name."); return; } setSavedName(name.trim()); setMessage("Preview updated for this screen only. No account data was saved."); }}>Save display name</ActionButton>
    {message ? <Notice error={!name.trim()}>{message}</Notice> : null}
    <NavigationButton href="/game-create">Create a room</NavigationButton>
    <NavigationButton href="/game-find" variant="secondary">Join a room</NavigationButton>
    <NavigationButton href="/" variant="text">Back to home</NavigationButton>
    <Notice>This is a sample profile. Account storage and sign-in are not connected yet.</Notice>
  </Screen>;
}


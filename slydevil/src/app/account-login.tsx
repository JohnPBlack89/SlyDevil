import { useState } from "react";
import { View } from "react-native";
import { NavigationButton } from "@/components/navigation-button";
import { ActionButton, Check, Field, Notice, Screen, ui } from "@/components/screen-ui";

export default function AccountLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  function submit() {
    const invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !password;
    setError(invalid);
    setMessage(invalid ? "Enter a valid email address and your password." : "Sign-in is not connected yet. Your details have not been sent or saved.");
  }
  return <Screen title="Login" subtitle="Welcome back. Your next game is waiting.">
    <Field label="Email address" placeholder="you@example.com" value={email} onChangeText={(value) => { setEmail(value); setMessage(""); }} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" autoComplete="email" />
    <Field label="Password" placeholder="Enter your password" value={password} onChangeText={(value) => { setPassword(value); setMessage(""); }} secureTextEntry autoCapitalize="none" autoComplete="current-password" onSubmitEditing={submit} />
    <View style={ui.row}>
      <View style={ui.split}><Check label="Remember me" checked={remember} onChange={setRemember} /></View>
      <ActionButton variant="text" onPress={() => { setError(false); setMessage("Password recovery will be available when accounts are connected."); }}>Forgot password?</ActionButton>
    </View>
    {message ? <Notice error={error}>{message}</Notice> : null}
    <ActionButton onPress={submit}>Log in →</ActionButton>
    <NavigationButton href="/account-create" variant="text">New here? Create an account</NavigationButton>
    <NavigationButton href="/" variant="secondary">Back to home</NavigationButton>
    <Notice>Account preview. Sign-in and Remember me are not connected yet.</Notice>
    <NavigationButton href="/account-view" variant="text">Preview account screen</NavigationButton>
  </Screen>;
}


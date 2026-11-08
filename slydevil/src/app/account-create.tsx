import { useState } from "react";
import { NavigationButton } from "@/components/navigation-button";
import { ActionButton, Check, Field, Notice, Screen } from "@/components/screen-ui";

export default function AccountCreateScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  function submit() {
    let invalid = "";
    if (!name.trim()) invalid = "Enter a display name.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) invalid = "Enter a valid email address.";
    else if (password.length < 8) invalid = "Use at least 8 characters for your password.";
    else if (password !== confirm) invalid = "Your passwords do not match.";
    else if (!terms) invalid = "Agree to the Terms and Privacy Policy to continue.";
    setError(!!invalid);
    setMessage(invalid || "Account creation is not connected yet. Your details have not been sent or saved.");
  }
  return <Screen title="Create Account" subtitle="Choose the name other players will see.">
    <Field label="Display name" placeholder="Johnny" value={name} onChangeText={(value) => { setName(value); setMessage(""); }} autoComplete="nickname" maxLength={32} />
    <Field label="Email address" placeholder="you@example.com" value={email} onChangeText={(value) => { setEmail(value); setMessage(""); }} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" autoComplete="email" />
    <Field label="Password" placeholder="Create a password" hint="Use at least 8 characters." value={password} onChangeText={(value) => { setPassword(value); setMessage(""); }} secureTextEntry autoCapitalize="none" autoComplete="new-password" />
    <Field label="Confirm password" placeholder="Re-enter your password" value={confirm} onChangeText={(value) => { setConfirm(value); setMessage(""); }} secureTextEntry autoCapitalize="none" autoComplete="new-password" onSubmitEditing={submit} />
    <Check label="I agree to the Terms and Privacy Policy" checked={terms} onChange={setTerms} />
    {message ? <Notice error={error}>{message}</Notice> : null}
    <ActionButton onPress={submit}>Create account →</ActionButton>
    <NavigationButton href="/account-login" variant="text">Already have an account? Log in</NavigationButton>
    <NavigationButton href="/" variant="secondary">Back to home</NavigationButton>
    <Notice>Account preview. Registration and legal documents are not available yet.</Notice>
  </Screen>;
}


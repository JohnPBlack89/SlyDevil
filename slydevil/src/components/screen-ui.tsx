import { useId, useState, type ReactNode } from "react";
import {
  KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text,
  TextInput, View,
  type PressableProps, type StyleProp, type TextStyle, type TextInputProps, type TextProps, type ViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";

const palettes = {
  light: { page: "#f5f5f4", surface: "#ffffff", inset: "#eeeeec", text: "#202020", muted: "#60605d", border: "#858580", primary: "#262626", onPrimary: "#ffffff", error: "#a52121" },
  dark: { page: "#121212", surface: "#1c1c1c", inset: "#292929", text: "#f5f5f2", muted: "#b7b7b0", border: "#82827c", primary: "#eeeeea", onPrimary: "#171717", error: "#ffaaaa" },
};

export function useScreenColors() {
  return palettes[useColorScheme() === "dark" ? "dark" : "light"];
}

export function Copy({ muted, heading, style, ...props }: TextProps & { muted?: boolean; heading?: boolean }) {
  const colors = useScreenColors();
  return <Text {...props} accessibilityRole={heading ? "header" : props.accessibilityRole} style={[ui.copy, { color: muted ? colors.muted : colors.text }, heading && ui.heading, style]} />;
}

export function Screen({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const colors = useScreenColors();
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={[ui.flex, { backgroundColor: colors.page }]} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[ui.scroll, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 32, paddingLeft: insets.left + 16, paddingRight: insets.right + 16 }]}>
        <View style={[ui.sheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={ui.header}>
            <Copy style={ui.brand}>SLY DEVIL</Copy>
            <Copy heading style={ui.title}>{title}</Copy>
            <Copy muted>{subtitle}</Copy>
          </View>
          <View style={ui.body}>{children}</View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function Panel({ style, ...props }: ViewProps) {
  const colors = useScreenColors();
  return <View {...props} style={[ui.panel, { backgroundColor: colors.inset, borderColor: colors.border }, style]} />;
}

export type ActionButtonProps = Omit<PressableProps, "children"> & { children: string; variant?: "primary" | "secondary" | "text"; textStyle?: StyleProp<TextStyle> };

export function ActionButton({ children, variant = "primary", disabled, style, textStyle, accessibilityState, ...props }: ActionButtonProps) {
  const colors = useScreenColors();
  return (
    <Pressable {...props} accessibilityRole={props.accessibilityRole ?? "button"} accessibilityState={{ ...accessibilityState, disabled: !!disabled }} disabled={disabled}
      style={(state) => [ui.button, { backgroundColor: variant === "primary" ? colors.primary : variant === "secondary" ? colors.surface : "transparent", borderColor: variant === "text" ? "transparent" : colors.primary }, variant === "text" && ui.textButton, state.pressed && { opacity: 0.7 }, typeof style === "function" ? style(state) : style, disabled && { opacity: 0.4 }]}>
      <Text style={[ui.buttonLabel, { color: variant === "primary" ? colors.onPrimary : colors.text }, textStyle]}>{children}</Text>
    </Pressable>
  );
}

export function Field({ label, hint, secureTextEntry, style, ...props }: TextInputProps & { label: string; hint?: string }) {
  const colors = useScreenColors();
  const id = useId();
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <View style={ui.field}>
      <Copy nativeID={`${id}-label`} style={ui.label}>{label}</Copy>
      <View style={[ui.inputRow, { borderColor: focused ? colors.primary : colors.border, backgroundColor: colors.surface }, focused && { borderWidth: 2 }]}>
        <TextInput {...props} accessibilityLabel={label} accessibilityLabelledBy={`${id}-label`} secureTextEntry={secureTextEntry && !visible} placeholderTextColor={colors.muted} selectionColor={colors.muted} underlineColorAndroid="transparent"
          onFocus={(event) => { setFocused(true); props.onFocus?.(event); }} onBlur={(event) => { setFocused(false); props.onBlur?.(event); }} style={[ui.input, { color: colors.text }, style]} />
        {secureTextEntry && <ActionButton variant="text" accessibilityLabel={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`} onPress={() => setVisible(!visible)}>{visible ? "Hide" : "Show"}</ActionButton>}
      </View>
      {hint && <Copy muted style={ui.small}>{hint}</Copy>}
    </View>
  );
}

export function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  const colors = useScreenColors();
  return <Pressable accessibilityRole="checkbox" accessibilityLabel={label} accessibilityState={{ checked }} onPress={() => onChange(!checked)} style={ui.checkRow}>
    <View style={[ui.checkbox, { borderColor: colors.primary, backgroundColor: checked ? colors.primary : colors.surface }]}><Text style={{ color: colors.onPrimary }}>{checked ? "✓" : ""}</Text></View>
    <Copy style={ui.flex}>{label}</Copy>
  </Pressable>;
}

export function Options({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  const colors = useScreenColors();
  return <View style={ui.field}><Copy style={ui.label}>{label}</Copy><View accessibilityRole="radiogroup" accessibilityLabel={label} style={ui.row}>
    {options.map((option) => <Pressable key={option} accessibilityRole="radio" accessibilityState={{ checked: value === option }} onPress={() => onChange(option)} style={[ui.option, { backgroundColor: value === option ? colors.primary : colors.surface, borderColor: colors.border }]}>
      <Text style={[ui.copy, { color: value === option ? colors.onPrimary : colors.text }]}>{option}</Text>
    </Pressable>)}
  </View></View>;
}

export function SelectField({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const colors = useScreenColors();
  return <View style={ui.field}>
    <Copy style={ui.label}>{label}</Copy>
    <ActionButton variant="secondary" accessibilityLabel={`${label}: ${value}`} accessibilityState={{ expanded: open }} onPress={() => setOpen(true)}>{value + "     ▾"}</ActionButton>
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <View style={ui.modalBackdrop}>
        <View accessibilityViewIsModal style={[ui.modal, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Copy heading>{label}</Copy>
          <ScrollView><Options label="Choose an option" options={options} value={value} onChange={(choice) => { onChange(choice); setOpen(false); }} /></ScrollView>
          <ActionButton variant="text" onPress={() => setOpen(false)}>Cancel</ActionButton>
        </View>
      </View>
    </Modal>
  </View>;
}

export function VoteChoices({ options, value, onChange, disabled }: { options: string[]; value: string; onChange: (value: string) => void; disabled: boolean }) {
  const colors = useScreenColors();
  return <View style={ui.field} accessibilityRole="radiogroup" accessibilityLabel="Choose a player to vote for">
    <Copy heading>Choose a player to vote for</Copy>
    {options.map((name) => <Pressable key={name} accessibilityRole="radio" accessibilityLabel={`${name}, alive`} accessibilityState={{ checked: value === name, disabled }} disabled={disabled} onPress={() => onChange(name)}
      style={[ui.voteRow, { borderColor: value === name ? colors.primary : colors.border, backgroundColor: value === name ? colors.inset : colors.surface }]}>
      <Copy>{value === name ? "◉" : "○"}</Copy><Copy style={ui.flex}>{name}</Copy><Copy muted>Alive</Copy>
    </Pressable>)}
  </View>;
}

export function Notice({ children, error = false }: { children: string; error?: boolean }) {
  const colors = useScreenColors();
  return <Text accessibilityRole={error ? "alert" : undefined} accessibilityLiveRegion="polite" style={[ui.copy, ui.small, { color: error ? colors.error : colors.muted }]}>{children}</Text>;
}

export function DataRow({ name, detail }: { name: string; detail: string }) {
  const colors = useScreenColors();
  return <View style={[ui.dataRow, { borderBottomColor: colors.border }]}><Copy style={ui.rowName}>{name}</Copy><Copy muted>{detail}</Copy></View>;
}

export const ui = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flexGrow: 1, alignItems: "center" },
  sheet: { width: "100%", maxWidth: 500, borderWidth: 1, borderRadius: 12, overflow: "hidden" },
  header: { padding: 24, gap: 12 },
  brand: { fontSize: 13, fontWeight: "800", letterSpacing: 2.5 },
  title: { fontSize: 30, lineHeight: 38, fontWeight: "700" },
  body: { paddingHorizontal: 24, paddingBottom: 24, gap: 20 },
  copy: { fontSize: 16, lineHeight: 24 },
  small: { fontSize: 13, lineHeight: 20 },
  heading: { fontSize: 19, lineHeight: 27, fontWeight: "700" },
  label: { fontWeight: "600", fontSize: 14, lineHeight: 22 },
  panel: { borderWidth: 1, borderRadius: 8, padding: 18, gap: 12 },
  field: { gap: 8 },
  inputRow: { borderWidth: 1, borderRadius: 6, flexDirection: "row", alignItems: "center", minHeight: 50 },
  input: { flex: 1, minWidth: 0, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, lineHeight: 24 },
  button: { minHeight: 50, borderWidth: 1, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 16, justifyContent: "center", alignItems: "center" },
  buttonLabel: { fontSize: 15, lineHeight: 23, fontWeight: "600", textAlign: "center" },
  textButton: { paddingHorizontal: 4, paddingVertical: 8, minHeight: 44 },
  row: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 12 },
  split: { flexGrow: 1, flexBasis: 140 },
  checkRow: { minHeight: 44, flexDirection: "row", alignItems: "center", gap: 10 },
  checkbox: { width: 22, height: 22, borderWidth: 1, borderRadius: 3, alignItems: "center", justifyContent: "center" },
  option: { borderWidth: 1, borderRadius: 6, paddingVertical: 10, paddingHorizontal: 14, minHeight: 46 },
  dataRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  rowName: { flexGrow: 1, flexBasis: 140 },
  code: { fontSize: 28, lineHeight: 36, letterSpacing: 4, fontWeight: "700" },
  voteRow: { flexDirection: "row", gap: 12, padding: 12, minHeight: 50, borderWidth: 1, borderRadius: 6, alignItems: "center" },
  modalBackdrop: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#00000088" },
  modal: { width: "100%", maxWidth: 420, maxHeight: "80%", borderWidth: 1, borderRadius: 12, padding: 24, gap: 20 },
});

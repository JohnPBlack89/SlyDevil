import { createContext, useContext, useState, type ReactNode } from "react";

export const previewPlayers = [
	{ name: "Johnny", role: "Oracle", ready: true, alive: true },
	{ name: "Alex", role: "Devil", ready: true, alive: false },
	{ name: "Sam", role: "Warden", ready: true, alive: true },
	{ name: "Riley", role: "Devil", ready: false, alive: false },
	{ name: "Morgan", role: "Villager", ready: true, alive: true },
];

type RoomPreview = {
	name: string;
	code: string;
	maxPlayers: string;
	visibility: string;
	host: boolean;
};
export const defaultRoom: RoomPreview = {
	name: "Friday Night Suspects",
	code: "X7K2Q9",
	maxPlayers: "8",
	visibility: "Private / code only",
	host: true,
};
const RoomContext = createContext<{
	room: RoomPreview;
	setRoom: (room: RoomPreview) => void;
} | null>(null);

export function RoomPreviewProvider({ children }: { children: ReactNode }) {
	const [room, setRoom] = useState(defaultRoom);
	return (
		<RoomContext.Provider value={{ room, setRoom }}>
			{children}
		</RoomContext.Provider>
	);
}

export function useRoomPreview() {
	const context = useContext(RoomContext);
	if (!context) throw new Error("Room screens need RoomPreviewProvider");
	return context;
}

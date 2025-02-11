import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ModalState {
	isOpen: boolean;
	notificationLength: number;
}

const initialState: ModalState = {
	isOpen: false,
	notificationLength: 0,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state) => {
			state.isOpen = true;
		},
		closeModal: (state) => {
			state.isOpen = false;
		},
		toggle: (state) => {
			state.isOpen = !state.isOpen;
		},
		increment: (state, action: PayloadAction<number>) => {
			state.notificationLength = action.payload;
		},
	},
});

export const { openModal, closeModal, toggle, increment } = modalSlice.actions;
export const selectModalState = (state: RootState) => state.modal;
export default modalSlice.reducer;

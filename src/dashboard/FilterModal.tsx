import React, { useState } from "react";
import styled from "styled-components";

interface FilterModalProps {
	show: boolean;
	onClose: () => void;
	onSave: (filters: Record<string, string>) => void;
}

const Modal = ({ show, onClose, onSave }: FilterModalProps) => {
	const [filters, setFilters] = useState({
		status: "",
		amenities: "",
		type: "",
		price: "",
	});

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(filters);
	};

	if (!show) return null;

	return (
		<>
			<ModalBackdrop onClick={onClose} />
			<ModalContainer>
				<ModalHeader>
					{/* <ModalTitle>Filter Unit</ModalTitle> */}
					<CloseButton onClick={onClose}>&times;</CloseButton>
				</ModalHeader>
				<form onSubmit={handleSubmit}>
					<FormField>
						<label htmlFor="status">Status</label>
						<select id="status" name="status" value={filters.status} onChange={handleSelectChange}>
							<option value="">Select</option>
							<option value="available">Available</option>
							<option value="occupied">Occupied</option>
						</select>
					</FormField>
					<FormField>
						<label htmlFor="amenities">Amenities</label>
						<select id="amenities" name="amenities" value={filters.amenities} onChange={handleSelectChange} disabled>
							<option value="detached">Detached</option>
							<option value="bathroom">Bathroom</option>
						</select>
					</FormField>
					<FormField>
						<label htmlFor="type">Type</label>
						<select id="type" name="type" value={filters.type} onChange={handleSelectChange} disabled>
							<option value="duplex">Duplex</option>
							<option value="bungalow">Bungalow</option>
						</select>
					</FormField>
					<FormField>
						<label htmlFor="price">Price</label>
						<select id="price" name="price" value={filters.price} onChange={handleSelectChange} disabled>
							<option value="30000">30,000</option>
							<option value="70000">70,000</option>
						</select>
					</FormField>
					<ModalFooter>
						<CancelButton type="button" onClick={onClose}>
							CANCEL
						</CancelButton>
						<SaveButton type="submit">SAVE</SaveButton>
					</ModalFooter>
				</form>
			</ModalContainer>
		</>
	);
};

export default Modal;

// Modal Backdrop
const ModalBackdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
`;

// Modal Container
const ModalContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	padding: 2rem;
	border-radius: 1rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	z-index: 1001;
	width: 370px;
`;

// Modal Header
const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
`;

// Close Button
const CloseButton = styled.button`
	background: none;
	border: none;
	font-size: 2rem;
	cursor: pointer;
	margin-left: auto;
`;

// // Modal Title
// const ModalTitle = styled.h5`
// 	margin: 0;
// `;

// Form Field
const FormField = styled.div`
	margin-bottom: 1rem;

	label {
		display: block;
		margin-bottom: 0.5rem;
	}

	select {
		width: 100%;
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid #ddd;
		background: white;
		&:read-only {
			background: #f3f3f3;
		}
	}
`;

// Modal Footer
const ModalFooter = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 2rem;
`;

// Save and Cancel Buttons
const Button = styled.button`
	padding: 0.5rem 1.5rem;
	border-radius: 0.5rem;
	border: none;
	cursor: pointer;
`;

const SaveButton = styled(Button)`
	background-color: #3538cd;
	color: white;
`;

const CancelButton = styled(Button)`
	background-color: #e5e5e5;
	color: #333;
`;

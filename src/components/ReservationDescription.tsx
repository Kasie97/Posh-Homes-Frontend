import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { ModelDiv1 } from "./Reservation";
import { EditModelDdiv, ModelText } from "../dashboard/Viewunit";
import { Button1, Button2, Div2 } from "../dashboard/style";
import { HiDotsHorizontal } from "react-icons/hi";
import axiosInstance from "../request/axiosInstance";
import { toast } from "react-toastify";
import ConfirmationModal from "../Component/Modal/ConfirmationModal";

interface ReservationDescriptionProps {
	reservation: Record<string, any>;
}

const ReservationDescription: React.FC<ReservationDescriptionProps> = ({ reservation }) => {
	const { id } = useParams<{ id: string }>();

	const [showModal, setShowModal] = useState(false);
	const [isCancelModalOpen, setCancelModalOpen] = useState(false);
	const [isCheckInModalOpen, setCheckInModalOpen] = useState(false);
	const [isCheckOutModalOpen, setCheckOutModalOpen] = useState(false);

	useEffect(() => {
		if (isCancelModalOpen) setShowModal(false);
	}, [isCancelModalOpen]);

	const handleCancelClick = () => {
		setCancelModalOpen(true);
	};

	const handleCancelConfirm = () => {
		cancelReservation();
		setCancelModalOpen(false);
	};

	const handleModalCancel = () => {
		setCancelModalOpen(false);
	};

	const handleIconClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleCheckInClick = () => {
		setCheckInModalOpen(true);
	};

	const handleCheckInCancel = () => {
		setCheckInModalOpen(false);
	};

	const handleCheckOutClick = () => {
		setCheckOutModalOpen(true);
	};

	const handleCheckOutCancel = () => {
		setCheckOutModalOpen(false);
	};

	const [loading, setLoading] = useState(false);

	const cancelReservation = async () => {
		try {
			const responseCheckout = await axiosInstance.put(`api/cancell/${reservation.id}`);
			toast.success("Reservation cancelled successfully");
		} catch (error) {
			console.error("An error occurred:", error);
			toast.error("Reservation has already been cancelled or you need to be checked out to cancel");
		}
	};

	const checkIn = async () => {
		try {
			const responseCheckout = await axiosInstance.put(`api/check-in/${reservation.id}`);
			toast.success("User Successfully Checked In");
		} catch (error: any) {
			const errorMessage = error.response.data.message;
			console.error("An error occurred:", error);
			toast.error(errorMessage || "Error Checking In User");
		}
	};

	const checkOut = async () => {
		try {
			const responseCheckout = await axiosInstance.put(`api/check-out/${reservation.id}`);
			toast.success("User Successfully Checked Out");
		} catch (error: any) {
			const errorMessage = error.response.data.message;
			console.error("An error occurred:", error);
			toast.error(errorMessage || "Error Checking Out User");
		}
	};

	return (
		<Div1a>
			<DivNew>
				<H5>{reservation.customerName}</H5>
				<Para3>{reservation.customerEmail}</Para3>
				<Para3>{reservation.customerPhone}</Para3>
				<Button3 style={{ background: reservation.status != "cancelled" ? "#3538cd" : "red" }}>{reservation.status}</Button3>
				<Para3>Check-in Date: {new Date(reservation.checkInDate).toLocaleDateString()}</Para3>
				<Para3>Check-out Date: {new Date(reservation.checkOutDate).toLocaleDateString()}</Para3>
			</DivNew>

			<Div2>
				<HiDotsHorizontal onClick={handleIconClick} />
				{showModal && (
					<ModelDiv1>
						<RxCross2 onClick={handleCloseModal} style={{ marginTop: "5px", marginLeft: "50%" }} />

						{/* <Link to={`/dashboard/edit-reserve-unit/${unit.id}/${unit.id}`} style={{ color: 'black', textDecoration: "none"}}> */}
						<Link to={`/dashboard/edit-reserve-unit/${id}/${reservation.id}`} style={{ color: "black", textDecoration: "none" }}>
							<EditModelDdiv>
								<MdOutlineModeEdit style={{ fontSize: "20px" }} />
								<ModelText>Edit Reservation</ModelText>
							</EditModelDdiv>
						</Link>

						<EditModelDdiv onClick={handleCancelClick} style={{ cursor: "pointer" }}>
							<GiCancel style={{ fontSize: "20px" }} />
							<ModelText>Cancel Reservation</ModelText>
						</EditModelDdiv>
					</ModelDiv1>
				)}

				{isCancelModalOpen && (
					<ConfirmationModal
						onConfirm={handleCancelConfirm}
						onCancel={handleModalCancel}
						message="Are you sure you want to cancel this reservation? This action cannot be undone!"
						color="black"
						width="300px"
						height="200px"
					/>
				)}
				{isCheckInModalOpen && (
					<ConfirmationModal
						onConfirm={checkIn}
						onCancel={handleCheckInCancel}
						message="Are you sure you want to check in?"
						color="black"
						width="300px"
						height="200px"
					/>
				)}
				{isCheckOutModalOpen && (
					<ConfirmationModal
						onConfirm={checkOut}
						onCancel={handleCheckOutCancel}
						message="Are you sure you want to check out?"
						color="black"
						width="300px"
						height="200px"
					/>
				)}

				<Div4A>
					<Button1
						onClick={handleCheckInClick}
						disabled={reservation.status === "in-residence" || reservation.status === "stayed" || reservation.status === "cancelled"}>
						check-In
					</Button1>
					<Button2 onClick={handleCheckOutClick} disabled={reservation.status === "stayed" || reservation.status === "cancelled"}>
						check-Out
					</Button2>
				</Div4A>
			</Div2>
		</Div1a>
	);
};

export const DivNew = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	gap: 5px;

	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const Div4A = styled.div`
	margin-bottom: 0px;
	margin-top: 80px;
	margin-left: 95%;
	text-align: right;
	width: 100%;

	@media screen and (max-width: 600px) {
		margin-left: 0px;
		text-align: center;
	}
`;

export const Div1a = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 10px;

	@media screen and (max-width: 600px) {
		flex-direction: column;
	}
`;

const H5 = styled.h5`
	font-size: 24px;
	font-weight: 700;
	line-height: 22px;
	letter-spacing: 0px;
	text-align: left;
	margin-top: 20px;
	color: #18181b;
	font-family: Plus Jakarta Sans;
`;

const Para3 = styled.p`
	color: #71717a;
	font-family: Plus Jakarta Sans;
	font-size: 16px;
	font-weight: 400;
	line-height: 22px;
	letter-spacing: 0px;
	text-align: left;
`;

const Button3 = styled.button`
	width: fit-content;
	height: Hug (24px);
	padding: 1px 11px 1px 11px;
	border-radius: 10px;
	gap: 10px;
	font-family: Inter;
	font-size: 16px;
	font-weight: 400;
	line-height: 22px;
	letter-spacing: 0.15000000596046448px;
	text-align: left;
	color: #ffffff;
	border: none;
`;

export default ReservationDescription;

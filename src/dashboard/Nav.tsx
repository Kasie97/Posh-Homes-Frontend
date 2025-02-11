import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { increment, selectModalState, toggle } from "../store/reducers/modalSlice";
import { FaRegBell, FaStream, FaTimes } from "react-icons/fa";
import NotificationList from "./Notification";
import axiosInstance from "../request/axiosInstance";

const Nav = () => {
	const dispatch = useDispatch();
	const { isOpen, notificationLength } = useSelector(selectModalState);
	const fullName = localStorage.getItem("username");
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await axiosInstance.get("/api/unseen-notifications");
				dispatch(increment(response.data.unseenNotification.length));
			} catch (error) {
				console.error("Error fetching notifications:", error);
			}
		};

		fetchNotifications();
	}, []);

	const showModalHandle = () => {
		setShowNotification(!showNotification);
	};

	return (
		<NavbarSection>
			<StyledAngleDown onClick={() => dispatch(toggle())}>{isOpen ? <FaTimes /> : <FaStream />}</StyledAngleDown>
			<ProfileDetails>
				<BellIconWrapper onClick={showModalHandle}>
					<FaRegBell style={{ fontSize: "20px" }} />
					<NotificationCount>{notificationLength}</NotificationCount>
				</BellIconWrapper>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<span style={{ fontWeight: "600", fontSize: "16px" }}>{fullName}</span>
					<span style={{ fontWeight: "400", fontSize: "14px", color: "#98A2B3" }}>Property Manager</span>
				</div>
			</ProfileDetails>

			{showNotification && <NotificationList />}
		</NavbarSection>
	);
};

export default Nav;

const NavbarSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	background: #fff;
	width: 100%;
	position: sticky;
	top: 0;
	z-index: 100;
`;

const StyledAngleDown = styled.span`
	font-size: 1.5rem;
	cursor: pointer;
	display: block;
	padding-top: 3px;

	@media (min-width: 769px) {
		display: none;
	}
`;

const ProfileDetails = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	margin-left: auto;
`;

const BellIconWrapper = styled.div`
	position: relative;
	cursor: pointer;
	z-index: 100;
`;

const NotificationCount = styled.span`
	position: absolute;
	top: -10px;
	right: -16px;
	background-color: #c137a2;
	color: #fff;
	border-radius: 50%;
	padding: 3px 5px;
	font-size: 10px;
	font-weight: bold;
	border: 2px solid #fff;
	box-shadow: 0px 1px 3px 0px #00000029;
`;

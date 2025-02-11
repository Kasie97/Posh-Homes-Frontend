import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModalState } from "../store/reducers/modalSlice";
import { SidebarSection, Nav, Main } from "./index";
import AddUnits from "./Add-unit";
import Editunits from "./Edit-unit";
import ViewMore from "./ViewMore";
import ReserveUnit from "./ReserveUnit";
import EditReserveUnit from "./Edit-reserveUnit";
import Viewunit from "./Viewunit";
import axiosInstance from "../request/axiosInstance";


interface SidebarSectionProps {
	$isOpen: boolean;
}

const AdminDashboard = () => {
	const dispatch = useDispatch();
  const navigate = useNavigate();
	const { isOpen } = useSelector(selectModalState);

	const handleClose = () => {
		dispatch(closeModal());
	};


	return (
		<DashboardContainer>
			<ContentContainer>
				<Sidebar $isOpen={isOpen}>
					<SidebarSection />
				</Sidebar>
				<MainContent>
					<Nav />
					<Routes>
						<Route index element={<Main />} />
						<Route path="main" element={<Main />} />
						<Route path="reserve-unit/:unitId" element={<ReserveUnit />} />
						<Route path="edit-reserve-unit/:unitId/:reservationId" element={<EditReserveUnit />} />
						<Route path="view-more/:id" element={<ViewMore />} />
						<Route path="add-unit" element={<AddUnits />} />
						<Route path="edit-unit/:id" element={<Editunits />} />
						<Route path="view-unit" element={<Viewunit />} />
					</Routes>
				</MainContent>
			</ContentContainer>
		</DashboardContainer>
	);
};

export default AdminDashboard;

const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	font-family: "Montserrat";
`;

const ContentContainer = styled.div`
	display: flex;
	/* margin-top: 60px; */
	// height: calc(100vh - 60px);
  height: 100vh;
	overflow: hidden;
`;

const Sidebar = styled.div<SidebarSectionProps>`
	width: 250px;
	padding: 20px;
	height: 300%;
	overflow-y: auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

	@media (max-width: 768px) {
		position: fixed;
		top: 60px;
		left: ${({ $isOpen }) => ($isOpen ? "0" : "-250px")};
		z-index: 1;
		transition: left 0.3s ease;
		width: 250px;
		background-color: #fff;
		color: white;
	}
`;

const MainContent = styled.div`
	overflow-y: auto;
	flex: 1;
	padding-left: 20px;
	background-color: #f9fafb;

	@media (max-width: 768px) {
		padding: 0;
	}
`;

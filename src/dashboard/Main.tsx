import React, { useEffect, useState } from "react";
import styled from "styled-components";
import group from "../assets/Images/Group.png";
import { IoNavigate } from "react-icons/io5";
import vector from "../assets/Images/Vector.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setAvailableUnits, setUnavailableUnits } from "../store/reducers/unitsSlice";
import axiosInstance from "../request/axiosInstance";
import { useParams, Link } from "react-router-dom";


const Main = () => {


	const dispatch = useDispatch();

	const { totalAvailableUnits, totalUnavailableUnits } = useSelector((state: RootState) => state.units);

	const [unitLocations, setUnitLocations] = useState<string[]>([]);
	const [topUnitDetails, setTopUnitDetails] = useState<any>([]);
	const { id } = useParams<{ id: string }>();
	// const username = localStorage.getItem("username")

	function toSentenceCase(str: string) {
 		 return str.charAt(0).toUpperCase() + str.slice(1);
	}


	useEffect(() => {
		const fetchUnits = async () => {
			try {
				const availableResponse = await axiosInstance.get("/api/available-units");
				const unavailableResponse = await axiosInstance.get("/api/unavailable-units");
			

				dispatch(setAvailableUnits(availableResponse.data.units));
				dispatch(setUnavailableUnits(unavailableResponse.data.units));

				const locationsResponse = await axiosInstance.get("/api/units/user-locations");
				setUnitLocations(locationsResponse.data.locations);

				const topUnitResponse = await axiosInstance.get(`/api/my-units`);
				setTopUnitDetails(topUnitResponse.data.units);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchUnits();
	}, [dispatch, id]);

	return (
		<>
			<DashboardHead style={{ padding: "35px 0px 10px" }}>
				<h1 style={{ fontSize: "26px" }}>Dashboard</h1>
				<Para>Welcome to Posh Homes Admin</Para>
			</DashboardHead>
			<GeneralWrap>
				<FirstSection>
					<BigSect>
						<ThirdImageContainer>
							<img src={vector} alt="" />
						</ThirdImageContainer>
						<ThirdContentContainer>
							<H1>Total Properties</H1>
						</ThirdContentContainer>
						<RightParagraph>
							<H1>40</H1>
						</RightParagraph>
					</BigSect>
				</FirstSection>
				<SecondSection>
					<SecondSectionItem>
						<img src={group} alt="" />
						<div>
							<H3>{totalAvailableUnits}</H3>
							{totalAvailableUnits > 1 ? (<H2>Short-lets Available</H2>) : totalAvailableUnits === 1 ? (<H2>Short-let Available</H2>) : (<H2>There are no shortlets available</H2>)}
							{ /* <H2>Short-lets Available</H2> */}
						</div>
					</SecondSectionItem>
					<SecondSectionItem>
						<img src={group} alt="" />
						<div>
							<H3>{totalUnavailableUnits}</H3>
							{totalUnavailableUnits > 1 ? (<H2>Short-lets Occupied</H2>) : totalUnavailableUnits === 1 ? (<H2>Short-let Occupied</H2>) : (<H2>There are no unoccupied short-lets</H2>)}
							{/* <H2>Short-lets Occupied</H2> */}
						</div>
					</SecondSectionItem>
				</SecondSection>
				<Container>
					<FirstDiv>
						<Heading>
							<NavigateIcon/>
							<H3>Property Locations</H3>
						</Heading>
						<Gen>
							{unitLocations.map((location, index) => (
								<List key={index} style={{color : "grey"}}>{location}</List>
							))}
						</Gen>
					</FirstDiv>
					<SecondDiv>
						<H3>Top Units</H3>

						{topUnitDetails.slice(0, 2).map((unit: any) => (
							<BigSect>
								<ThirdImageContainer style={{padding: "0px"}}>
									<img src={unit.pictures[0]} alt="House image" style={{ borderRadius: "5px", marginTop: "0px", height: "100px", width: "150px"}}/>
									{/* <SpecialImg  src={unit.pictures[0]} alt="House image" style={{width: "150px"}} /> */}
								</ThirdImageContainer>
								<ThirdContentContainer style={{marginLeft: "10px"}}>
									<H4>{toSentenceCase(unit.name)}</H4>
									<H5 style={{color : "grey"}}>{unit.type}</H5>
									<H5 style={{color : "grey"}}>{unit.location}</H5>
									<H5 style={{color : "grey"}}>{unit.status}</H5>
									<H5 style={{color : "grey"}}>₦ {unit.price}</H5>
								</ThirdContentContainer>
								<ButtonDiv>
									<Link to={`/dashboard/view-more/${unit.id}`}>
										<Button>View More</Button>
									</Link>
								</ButtonDiv>
								<hr />
							</BigSect>
						))}
					</SecondDiv>
				</Container>
			</GeneralWrap>
		</>
	);
};
export default Main;

export const GeneralWrap = styled.div`
	// padding: 30px;
	width: 90%;
	// margin-top: -4rem;
	// margin: 0 auto 0;
	overflow-y: hidden;
	font-family: Work Sans;
	/* @media screen and (max-width: 960px){
     overflow: auto;
     width:20rem
   } */
   @media (max-width: 769px) {
	  margin: 0 auto;
	}
`;

const RightParagraph = styled.div`
	text-align: center;
	margin-right: 2rem;
	@media (min-width: 800px) {
		text-align: right;
	}
`;

const DashboardHead = styled.div`
	// text-align: center;
	// margin-left: 1.5rem;
	// margin: 0 auto;
	margin-top: -20px;
	width: 90%;
	@media (max-width: 769px) {
	  margin: 0 auto;
	}
`;

const H1 = styled.h1`
	margin: 0 0 0 0.5rem;
	font-size: 32px;
	font-weight: 700;
	// font-family: Inter;

	@media (max-width: 800px) {
		font-size: 18px;
		font-weight: bolder;
	}
`;
const H2 = styled.p`
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	margin: 0 0 0 1rem;
`;

const H3 = styled.p`
	margin: 0 0 0 1rem;
	font-size: 24px;
	font-weight: 600;
	margin-bottom: 0.5rem;
	

	@media (max-width: 759px) {
		font-size: 18px;
		font-weight: bolder;
		margin: 0 0 0 1rem;
	}
	// @media (max-width: 1130px) {
	// 	font-size: 16px;
	// 	font-weight: bolder;
	// }
`;

const H4 = styled.h4`
	font-size: 15px;
	font-weight: 800px;
	color: black;
	margin-right: -1rem;

	@media (max-width: 759px) {
		font-size: 12px;
		margin-left: -1rem;	
	}
	@media (max-width: 391px) {
		font-size: 10px;
		margin-left: -1rem;
	}
`;
const H5 = styled.h5`
	margin: 0;
	font-size: 14px;
	font-weight: 400;

	@media (max-width: 759px) {
		font-size: 12px;
		margin-left: -1rem;		
	}
	@media (max-width: 391px) {
		font-size: 10px;
		margin-left: -1rem;	
	}
`;
const Para = styled.p`
	margin: 0;
	font-size: 14px;
	font-weight: 300;
	color: grey;
`;

const FirstSection = styled.div`
  margin-bottom: 15px;
  border-radius: 20%;
  background-color: #3639cd;
  padding: 0.3rem 1rem;
  color: white;
  border-radius: 10px;
`;

const SecondSection = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	@media (max-width: 769px) {
		flex-direction: column;
	}
`;

const SecondSectionItem = styled.div`
	flex: 1;
	background-color: #ffffff;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	height: 100px;
	margin-right: 3px;
	padding-left: 1.1rem;
	border-radius: 5px;
	display: flex;
	align-items: center;
	img {
		margin-right: 10px;
	}

  @media (max-width : 769px){
   	width: 100%;
    margin-right: 0;
	margin-bottom: 10px; 
	padding:  2rem;
	img{
		margin-left: -1rem;
		width: 35px;
		height: 35px;
	}
  }
  @media (max-width: 450px) {
	img{
		margin-left: -1rem;
		width: 30px;
		height: 30px;
	}
  }
  @media (max-width: 300px) {
	margin-bottom: 5px; 
	padding:  2rem;
	}
`;


export const Container = styled.div`
	display: grid;
	grid-template-columns: 35% auto;
	margin-top: 1rem;
	gap: 0.5rem;
	@media (max-width: 1025px) {
		grid-template-columns: 1fr;
	}
`;
export const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const FirstDiv = styled.div`
	background-color: white;
	border-radius: 10px;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	padding: 12px;
	height: 94%;
	// margin-top: -15.5rem;
	box-sizing: border-box;
	@media (max-width: 800px) {
		// margin-top: -1rem;
	}
	@media (min-width: 801px) and (max-width: 1000px) {
		// margin-top: -20rem;
		height: 22rem;
	}
`;

export const SecondDiv = styled.div`
	background-color: white;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	padding: 20px;
	border-radius: 10px;
	height: 94%;
	box-sizing: border-box;
	@media (max-width: 800px) {
		order: 3;
	}
	//   @media (min-width: 801px) and (max-width: 1000px) {
	//     // margin-top: -17.5rem;
	// 	height: 16rem;
	//   }
`;

const NavigateIcon = styled(IoNavigate)`
	color: #3639cd;
	font-size: 2.5rem;

	@media (max-width : 769px){
		font-size: 2.0rem;
		margin-right: 1rem;
	}
`;

const Gen = styled.ul`
	list-style-type: none;
	margin-left: 3.5rem;
	height: 100%;
	overflow: scroll;

	@media (max-width : 769px){
		margin-left: 3.8rem;
		height: 100%;
	}
`;

const List = styled.li`
  text-decoration: none;
  color: black;
  // cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px 0;
  font-size: 14px;
  font-weight: 500;
  padding: 0px;

  // &:hover {
  //   background-color: #3639cd;
  // }

  a {
    text-decoration: none;
	color: black
	}
  }
`;

const Heading = styled.div`
	display: flex;
	align-items: center;

	// p {
	// 	margin: 0;
	// }
`;

const BigSect = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1rem;
`;

const ThirdImageContainer = styled.div`
	flex: 0 0 auto;
	margin-right: 20px;
	margin-top: 1rem;

	display: flex;

	img {
		width: 90%;
		max-width: 130px;
		height: auto;
		margin-bottom: 0.5rem;
		margin-top: 0.4rem;

		@media (max-width: 769px) {
			width: 50%;
			height: 50%;
		}
	}
`;

const ThirdContentContainer = styled.div`
	flex: 1;
	margin-left: -1rem;
	@media (max-width: 769px) {
			margin-left: -2rem;
		}
`;

export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #3639cd;
	border-radius: 3px;
	border: none;
	color: white;
	padding: 11.37px, 67.58px, 11.37px, 67.58px;
	text-align: center;
	font-size: 10px;
	font-weight: 400;
	width: 150px;
	height: 30px;
	cursor: pointer;
	text-decoration: none;
	@media (max-width: 1000px) {
		width: 100px;
		margin-bottom: -15rem;
	}
	&:hover {
		background-color: white;
		color: #3639cd;
		text-decoration: none;
	}
`;

const ButtonDiv = styled.div`
	text-align: center;
	// margin-right: 2rem;
	margin-top: 60px;
	@media (min-width: 800px) {
		text-align: right;
	}
`;

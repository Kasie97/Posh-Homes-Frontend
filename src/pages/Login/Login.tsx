import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Rectangle from "../../assets/Images/Rectangle 2.svg";
import googleIcon from "../../assets/Images/goggle.svg";
import axiosInstance from "../../request/axiosInstance";
import { API_ENDPOINT } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import BeatLoader from "react-spinners/BeatLoader";
// import { json } from "stream/consumers";

const LoginForm = () => {
	const navigate = useNavigate();
	// const location = useLocation();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [validationErrors, setValidationErrors] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);

	const googleAuth = () => {
		window.open(`${API_ENDPOINT}/auth/google/`, "_self");
		getUserData();
	};

	const getUserData = async () => {
		try {
			const response = await axiosInstance.get("/auth/success", { withCredentials: true });
			localStorage.setItem("token", response.data.token);
			const username = (response.data?.user?.fullname).split(" ")[0];
			localStorage.setItem("username", username);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined) {
			navigate("/dashboard/main");
		}
	}, [navigate]);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (validationErrors) {
			toast.error(validationErrors, {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
			});
		}
	}, [validationErrors]);

	const handleSubmit = async (e: any) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			const response = await axiosInstance.post("/api/login", formData);
			console.log("login ", response);

			if (response.status !== 200) {
				throw new Error("Error logging in");
			}

			console.log(response);
			const { token, firstName: username } = response.data;
			localStorage.setItem("token", token);
			localStorage.setItem("username", username);
			toast.success("Successfully logged in");
			setFormData({ email: "", password: "" });
			setValidationErrors("");
			navigate("/dashboard/main");
		} catch (error: any) {
			//  setValidationErrors(error.response?.data?.Error || 'An error occurred. Please try again.');
			// console.log(error.response.data.Error)
			// console.log(JSON.parse(error.response.request.response)?.message)
			setValidationErrors(
				error.response.data.Error || JSON.parse(error.response.request.response)?.message || "An error occurred. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	// useEffect(() => {
	// 	const getQueryParam = (name: any) => {
	// 		const params = new URLSearchParams(location.search);
	// 		return params.get(name);
	// 	};

	// 	const tokenFromQuery = getQueryParam("token");

	// 	if (tokenFromQuery) {
	// 		localStorage.setItem("token", tokenFromQuery);

	// 		toast.success("Successfully logged in");

	// 		navigate("/dashboard/main");
	// 	}
	// }, [location, navigate]);

	return (
		<>
			<MotherDiv>
				<RectangleImage
					src={Rectangle}
					alt="Rectangle"
					style={{
						width: "",
						height: "",
					}}
				/>

				<SignUpContainer>
					<Logo>
						<img src="src/Component/Images/Group.svg" alt="stead img" style={{ width: "30px", height: "30px" }} />
						<Stead>Close Stead</Stead>
						<p className="welcometext">Welcome back to Close Stead</p>
					</Logo>

					<form>
						<div className="formDiv">
							<label htmlFor="" className="labelText">
								Email Address
							</label>
							<input
								type="text"
								className="inputField"
								placeholder="SandyB@gmail.com"
								value={formData.email}
								onChange={handleInputChange}
								name="email"
							/>

							<label htmlFor="" className="labelText">
								Password
							</label>
							<div style={{ position: "relative" }}>
								<input
									type={passwordVisible ? "text" : "password"}
									className="inputField"
									placeholder="**********"
									value={formData.password}
									onChange={handleInputChange}
									name="password"
								/>
								<span
									style={{
										position: "absolute",
										top: "60%",
										right: "12px",
										transform: "translateY(-50%)",
										cursor: "pointer",
									}}
									onClick={togglePasswordVisibility}>
									{passwordVisible ? <BsEye /> : <BsEyeSlash />}
								</span>
							</div>

							{
								<Link to={"/forgotPassword"} style={{ fontSize: "0.8em" }}>
									{" "}
									Forgot Password{" "}
								</Link>
							}

							<button className="send-btn" onClick={handleSubmit}>
								<BeatLoader
									color="#fff"
									loading={isLoading}
									// cssOverride={override}
									size={10}
									aria-label="Loading Spinner"
									data-testid="loader"
								/>
								{!isLoading ? "LOGIN" : ""}
							</button>

							<>
								<OrText>
									<img src="src/Component/Images/Frame 40.png" alt="frame 40" />
								</OrText>
							</>
							<div className="place">
								<Placeholder onClick={googleAuth}>
									<Icon src={googleIcon} alt="Google Icon" />
									Sign In with Google
								</Placeholder>
							</div>

							<br />
							<StyledParagraph>
								Don't have an account ? <Link to={"/signup"}>Sign up here</Link>
							</StyledParagraph>
						</div>
					</form>
				</SignUpContainer>
			</MotherDiv>
		</>
	);
};

const Logo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1px;
	margin: 50px auto 0px;
`;

const RectangleImage = styled.img`
	width: 97%;
	object-fit: cover;
	height: 100%;
	margin: 0px;
	padding: 0px;

	@media screen and (max-width: 461px) {
		max-width: 130%;
		visibility: hidden;
		height: 652px;
		margin-top: -50px;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}
`;

const Stead = styled.h2`
	font-weight: 400;
	color: #000;
	font-family: "Impact";
	font-size: 15.418px;
	font-style: normal;
	line-height: 1.5;
	margin: 0px;
`;

const Placeholder = styled.div`
	display: flex;
	background-color: var(--White, #fff);
	height: 20px;
	width: 100%;
	cursor: pointer;
	color: var(--Grey-400, #98a2b3);
	font-family: Inter;
	text-decoration: none;
	font-size: 0.8em;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	padding: 13.851px 18.468px;
	justify-content: center;
	align-items: center;
	gap: 9.234px;
	align-self: stretch;
	border-radius: 3px;
	margin: 10px auto 10px;
	border: 1px solid var(--Grey-300, #d0d5dd);
`;

const OrText = styled.div`
	margin: 10px auto 0px;
	color: var(--Grey-400, #98a2b3);
	font-family: Inter;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	width: 100%;
	line-height: 20px;
	text-align: center;
`;

const SignUpContainer = styled.div`
	width: 98%;
	margin: 0px 0px;
	padding-top: 20px;
	border-radius: 2px;
	height: 100%;
	overflow: hidden;

	@media screen and (max-width: 460px) {
		height: 1000px;
	}
`;

const MotherDiv = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1.8fr 1.2fr;
	height: 100vh;
	box-sizing: border-box;
	overflow: hidden;
	width: 98%;

	@media screen and (max-width: 460px) {
		font-size: 14px;
		line-height: 18px;
		width: 100%;
		padding: 8px;
		display: grid;
		overflow: hidden;
		justify-content: center;
		margin: auto;
		grid-template-columns: 0fr 1fr;
		justify-content: center;
		overflow: hidden;
		justify-items: center;
		background-position: fixed;
		background-image: url("src/Component/Images/Rectangle 2.jpg");
		background-size: cover;
		background-repeat: no-repeat;

		element.style {
			margin: -13px;
		}
	}

	p {
		margin-top: 0px;
		/* background-color: blue; */
	}

	.welcometext {
		color: var(--Main-Text, #101828);
		font-family: Inter;
		font-size: 15.418px;
		font-style: normal;
		font-weight: 700;
		line-height: 140%; /* 38.784px */
	}

	.formDiv {
		font-family: "Montserrat", sans-serif;
		display: flex;
		flex-direction: column;
		width: 90%;
		margin: -5px auto 0px;
		padding: 5px;
		overflow: hidden;
		color: var(--Main-Text, #101828);
	}

	.labelText {
		color: var(--Gray-900, #212121);
		font-family: Heebo;
		font-size: 12.16px;
		font-style: normal;
		font-weight: 500;
		line-height: 23.086px;

		@media screen and (max-width: 460px) {
			font-weight: 1200;
			font-size: 15.16px;
		}
	}

	.inputField {
		display: flex;
		gap: 9.234px;
		align-self: stretch;
		width: 100%;
		margin: 3px 0px;
		height: 35px;
		padding: 0px 10px 0px;
		border-radius: 2px;
		border-radius: 4.617px;
		border: 1.154px solid var(--Gray-3, #828282);
		background: var(--Basic-White, #fff);
	}

	::placeholder {
		font-size: 0.8em;
		color: #888;
		padding: 0px;
	}

	::value {
		font-size: 0.8em;
		color: #888;
		padding: 0px;
	}

	.send-btn {
		font-family: "Inter", sans-serif;
		font-size: 12px;
		font-weight: 600;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(255, 255, 255, 1);
		width: 100%;
		height: 35px;
		margin: 10px 0px 0px;
		padding: 5px;
		border-radius: 8px;
		background-color: rgba(0, 0, 205, 1);
		cursor: pointer;
	}
`;

const Icon = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 10px;
`;

const StyledParagraph = styled.p`
	color: var(--Grey-400, #98a2b3);
	font-family: Inter;
	font-size: 0.9em;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	text-align: center;
	margin: 0px;

	@media screen and (max-width: 460px) {
		color: black;
	}
`;

export default LoginForm;

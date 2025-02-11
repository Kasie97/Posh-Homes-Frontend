import React, { ChangeEvent, useEffect, useState } from "react";
// import logo from "../../assets/Images/logo.svg";
import { toast } from "react-toastify";
import Rectangle from "../../assets/Images/Rectangle 2.svg";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../request/axiosInstance";
import { styled } from "styled-components";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import BeatLoader from "react-spinners/BeatLoader";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
    code: "",
  });
  const [validationErrors, setValidationErrors] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const toggleConfirmPasswordVisibility = () => {
		setConfirmPasswordVisible(!confirmPasswordVisible);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		if (name) {
			setFormData({ ...formData, [name]: value });
		}
	};

	// const customStyles = {
	// 	containerStyle: {
	// 		width: "100%",
	// 		borderRadius: "4.617px",
	// 	},
	// 	inputStyle: {
	// 		width: "100%",
	// 		height: "35px",
	// 		borderRadius: "4.617px",
	// 		border: "1.154px solid var(--Gray-3, #828282)",
	// 		background: "var(--Basic-White, #fff)",
	// 		fontSize: "0.8em",
	// 	},
	// };

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);

    try {
      setIsLoading(true);

      // Replace this with your actual API endpoint
       axiosInstance.post("/api/resetPassword", {
        code: formData.code,
        password: formData.password,
        confirm_password: formData.password,
        email: location.state.email,
      }).then((res) => {
					if (res.status === 201) {
						toast.success(res.data.message);
						toast.success("Password changed successfully!");
						setFormData(
              {
                password: "",
                confirm_password: "",
                code: "",
              }
            );
						setValidationErrors("");
						navigate("/");
					}
				});
    } catch (error: any) {
      setValidationErrors(
						error.response.data.Error || JSON.parse(error.response.request.response)?.message || "An error occurred. Please try again."
					);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
						<img src="src/Component/Images/Group.svg" alt="stead img" style={{width: "30px", height : "30px"}} />
						<Stead>Close Stead</Stead>
						<p className="welcometext">Welcome back to Close Stead</p>
					</Logo>

					<form>
						<div className="formDiv">
							<label htmlFor="" className="labelText">
								OTP (One-Time-Password)
							</label>
							<input
								type="text"
								className="inputField"
								placeholder="123456"
								value={formData.code}
								onChange={handleInputChange}
								name="code"
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
						{formData.password.length > 0 && <PasswordGuide password={formData.password} />}

						<label htmlFor="" className="labelText">
							Confirm Password
						</label>
						<div style={{ position: "relative" }}>
							<input
								type={confirmPasswordVisible ? "text" : "password"}
								className="inputField"
								placeholder="**********"
								value={formData.confirm_password}
								onChange={handleInputChange}
								name="confirm_password"
							/>
							<span
								style={{
									position: "absolute",
									top: "60%",
									right: "12px",
									transform: "translateY(-50%)",
									cursor: "pointer",
								}}
								onClick={toggleConfirmPasswordVisibility}>
								{confirmPasswordVisible ? <BsEye /> : <BsEyeSlash />}
							</span>
						</div>

							<button className="send-btn" onClick={handleSubmit}>
								<BeatLoader
									color="#fff"
									loading={isLoading}
									// cssOverride={override}
									size={10}
									aria-label="Loading Spinner"
									data-testid="loader"
								/>
								{!isLoading ? "SUBMIT" : ""}
							</button>

						</div>
					</form>
          		<StyledParagraph>
								Go back to <Link to={"/signup"}>Sign up</Link>
							</StyledParagraph>
				</SignUpContainer>
			</MotherDiv>
		</>
	);
};

const PasswordGuide: React.FC<{ password: string }> = ({ password }) => {
	const hasNumber = /[0-9]/.test(password);
	const hasSymbol = /[@#_!*%$]/.test(password);
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);

	const arrangement = {
		padding: "2px 10px",
		fontSize: " 0.70em",
	};
	const bottomarrangement = {
		padding: "2px 10px",
		fontSize: " 0.70em",
		marginBottom: "5px",
	};

	return (
		<>
			{password.length < 1 ? (
				""
			) : (
				<>
					<p style={arrangement}>
						Length greater than 8 <span>{password.length > 8 ? "✔" : "❌"}</span>
					</p>
					<p style={arrangement}>
						Include a symbol (example #@_!*%$) <span>{hasSymbol ? "✔" : "❌"}</span>
					</p>
					<p style={arrangement}>
						Include 1 uppercase letter <span>{hasUpperCase ? "✔" : "❌"}</span>
					</p>
					<p style={arrangement}>
						Include 1 lowercase letter <span>{hasLowerCase ? "✔" : "❌"}</span>
					</p>
					<p style={bottomarrangement}>
						Include 1 digit <span>{hasNumber ? "✔" : "❌"}</span>
					</p>
				</>
			)}
		</>
	);
};


const Logo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1px;
	margin: 150px auto 30px;
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

const StyledParagraph = styled.p`
	color: var(--Grey-400, #98a2b3);
	font-family: Inter;
	font-size: 0.9em;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	text-align: center;
	margin-top: 50px;

	@media screen and (max-width: 460px) {
		color: black;
	}
`;


export default ChangePassword;
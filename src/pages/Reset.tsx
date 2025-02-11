import React, { useState } from "react";
import logo1 from "../assets/Images/Group.svg";
import Rectangle from "../assets/Images/Rectangle 2.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../request/axiosInstance";
import { Rain } from "./style";
import BeatLoader from "react-spinners/BeatLoader";
import { styled } from "styled-components";

const Reset = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        "/api/forgotPassword",
        formData
      );
      toast.success(response.data.message);
      
      navigate("/changePassword", { state: { email: formData.email } });
      
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <p className="welcometext">Reset Your Password</p>
        </Logo>

      <Rain>
            Enter your email below and we’ll send you instructions on <br /> how
            to reset your password.
      </Rain>

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

         

            <button className="send-btn send-txt" onClick={handleSubmit}>
              <BeatLoader
                color="#fff"
                loading={isLoading}
                // cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {!isLoading ? "Send reset instructions" : ""}
            </button>


          </div>
        </form>
      </SignUpContainer>
    </MotherDiv>
  );
};

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  margin: 150px auto 50px;
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

     @media screen and (max-width: 460px){
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





export default Reset;


    
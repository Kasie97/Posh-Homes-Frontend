import styled from "styled-components";



export const FormContainer = styled.div`
  width: 30%;
  height: fit-content;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0px 6px 16px 0px #00000029;
  margin-left: 6.5%;
  margin-top: 10%;

  @media screen and (max-width: 600px) {
    width: 10%;
    height: fit-content;
    position: fixed;
    background: white;
    gap: 10%
  }

  @media screen and (max-width: 992px) {
    width: 70%;
    margin-top: 40%;
    margin-left: 8%;
    height: fit-content;
    position: fixed;
    background: white;
    //top: 40px;
    
  }
`;


export const InputForm = styled.input`
  width: 100%;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 10px;

  @media screen and (max-width: 600px) {
    width: 90%;
    margin-left: 0px;
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    width: 95%;
    margin-left: 0px;
    font-size: 16px;
  }
`;



export const Content = styled.div`
  width: 50%;
  height: 100vh;
  overflow: hidden;
 position: relative;


  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100vh;
    flex: 1;
    display: none;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: auto;
    display: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 26px;
`;


export const Label = styled.label`
  font-weight: bold;
  font-family: Work Sans;
  margin-bottom: 5px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    font-size: 16px;
  }
`;



export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  border-radius: 10px;
  background: var(--Indigo-700, #3538cd);
  transition: background-color 0.2s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2f32b8;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    font-size: 16px;
  }
`;

export const Stead = styled.h2`
  font-weight: 400;
  color: #000;
  font-family: "Impact";
  font-size: 29.418px;
  font-style: normal;
  line-height: 0.5;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // gap: 10px;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden; /* Prevent vertical scroll */

  font-family: "poppins", sans-serif;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: fit-content;
    width: 100%;
  }

  @media screen and (max-width: 992px) {
    flex-direction: column;
    height: fit-content;
  }
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100vh;
  // martgin-top: -7px;
  // margin-left: -7px;
  // margin-bottom: -10px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const StyledParagraph = styled.p`
  color: var(--Grey-400, #98a2b3);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  margin-top: 1px;
  @media screen and (max-width: 600px) {
    font-size: 12px;
    line-height: 18px;
    margin-top: 0;
  }
`;
export const SignInLink = styled.a`
  color: var(--primary-royal-blue, #0000cd);
  font-family: "Inter";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  text-decoration-line: underline;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;



export const Txt = styled.h1`
color: var(--Main-Text, #101828);
  text-align: center;
  margin-bottom: 55px;
  font-family: "Inter", sans-serif;
 font-size: 25.703px;
  font-style: normal;
font-weight: 700;
line-height: 140%;

  @media screen and (max-width: 600px) {
    height: fit-content;
    width: 80%;
    margin-left: 10%;
    margin-bottom: 70px;
    element.style {
      width: 100%;
      height: 100%;
      display: flow;
      margin: 50%;
    };



  @media screen and (max-width: 992px) {
    font-size: 20px;
  }
`;
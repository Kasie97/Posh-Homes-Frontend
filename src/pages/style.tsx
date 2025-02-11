import styled from "styled-components";

export const ResetPasswordContainer = styled.div`
  width: 40%;
  margin: 0 5%;
  padding: 20px;
  border-radius: 2px;
`;
export const FormContainer = styled.div`
  //  background: blue;
  margin: 120px 2%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    width: 10%;
    height: fit-content;
    position: fixed;
    background: white;
    top: 20%;
  }

  @media screen and (max-width: 992px) {
    width: 80%;
    height: fit-content;
    position: fixed;
    background: white;
    top: 50px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 300;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 2px;
  border-radius: 6px;
  border: 1px solid rgba(213, 215, 222, 1);

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

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  border-radius: 10px;
  background: var(--Indigo-700, #3538cd);
  border: none;
  cursor: pointer;

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

export const Stead = styled.h2`
  font-weight: 400;
  color: #000;
  font-size: 25px;
  font-style: normal;
  line-height: 1.5;
  // margin-top: -6px;
`;

export const Pass = styled.h2`
  width: 286px;
  height: 39px;
  font-size: 25px;
  font-weight: 700;
  line-height: 39px;
  letter-spacing: 0px;
  text-align: center;
  // margin-top: -35px;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }

  @media screen and (max-width: 992px) {
    font-size: 20px;
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Rain = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  color: #98a2b3;
`;

export const MotherDiv = styled.div`
  display: flex;
  height: 100vh;
  overflow: none;
  width: 100%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: 100%;
  }
`;

export const RectangleImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
  margin-bottom: 5px;
`;

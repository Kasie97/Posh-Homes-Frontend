import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  // height: 100%;
  background: var(--Main-Background, #f8f8f8);
  overflow: hidden; /* Prevent vertical scroll */

  font-family: "poppins", sans-serif;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: fit-content;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: fit-content;
  }
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* or use 'cover' depending on your preference */
  /* Additional styles if needed */
  margin-bottom: 10px;
`;

export const FormContainer = styled.div`
  width: 75%;
  // height: fit-content;
  padding: 32px;
  border-radius: 16px;
  //   box-shadow: 0px 6px 16px 0px #00000029;
  margin-left: 6.5%;
  margin-top: 1%;

  // @media screen and (max-width: 759px) {
  //   width: 10%;
  //   // height: fit-content;
  //   position: fixed;
  //   background: white;
  //   gap: 10%;
  // }

  @media screen and (max-width: 769px) {
    width: 100%;
    margin: 0px auto ;
    background: white;
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

export const Button = styled.button`
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 16px;
  color: #fff;
  border-radius: 4px;
  background: var(--Indigo-700, #3538cd);
  transition: background-color 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  width: 400px;
  padding: 10px 150px;
  // margin-left: 20%;
  // margin-top: 40px;
  margin: 40px auto 0;

  &:hover {
    background-color: #2f32b8;
  }

  @media (max-width : 826px){
      width: 100%;
      font-size: 14px;
  }
`;

export const Txt = styled.h1`
color: var(--Main-Text, #101828);
  text-align: center;
  margin-bottom: 15px;
  font-family: "Inter", sans-serif;
 font-size: 32px;
  font-style: normal;
font-weight: 700;
line-height: 45%;

  @media screen and (max-width: 769px) {
    height: fit-content;
    width: 80%;
    margin-bottom: 10px;
    margin-left: 10%;
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

export const Label = styled.label`
  font-weight: bold;
  font-family: Work Sans;
  margin-bottom: 5px;
  display: block;
  //   margin-bottom: 5px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  padding: 12px, 16px;
  background-color: #ffffff;
  border: 1px solid var(--Grey-600, #475467);
  border-radius: 3px;
  font-size: 16px;
  line-height: 22.4px;
  font-weight: 400;
  color: #000000;
  font-family: Heebo;
  padding-left: 16px;
  margin-top: 10px;

  @media (max-width: 992px) {
    width: 100%;
  }

  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 430px) {
    width: auto;
  }
`;
export const Div = styled.div`
  display: flex;
  padding-top: 5px;
  flex-direction: column;
`;

export const Label1 = styled.label`
  font-style: normal;
  font-family: Heebo;
  font-size: 14px;
  font-weight: 700;
  line-height: 22.4px;
  letter-spacing: 0.15px;
  text-align: left;
  color: #212121;
`;

export const InputContainer = styled.div`
  //   gap: 24px;
  width: 100%;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 24px;
  
  ::placeholder{
    font-size: 12px;
  }

  @media (max-width: 769px) {
    display: block;
    width: 100%;
  }
`;

export const DropZone = styled.div`
  position: relative;
  border: 3px dashed #ccc;
  margin-top: 10px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px; /* Adjust the gap as per your preference */
  position: ;
`;
export const SELECT = styled.select`
  width: 98%;
  height: 46px;
  padding: 12px, 16px;
  background-color: #ffffff;
  border: 1px solid var(--Grey-600, #475467);
  border-radius: 3px;
  font-size: 14px;
  line-height: 22.4px;
  font-weight: 400;
  color: #000000;
  font-family: Work Sans;
  padding-left: 16px;
  margin-top: 10px;
  margin-bottom: 24px;

  @media (max-width: 992px) {
    width: 100%;
  }

  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 430px) {
    width: auto;
  }
`;
export const Lastpara = styled.p`
  color: #212121;
  font-family: Work Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
`;
export const LastInput = styled.textarea`
  width: 98%;
  padding-top: 10px;
  padding-bottom: 50px;
  padding-left:10px;
  margin-top: 10px;
  border-radius: 4px;
  verticalAlign: "top"
  border: 1px solid var(--Grey-600, #475467);
  background: var(--Basic-White, #fff);

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
export const Img1 = styled.img`
  // aspect-ratio: 1;
  // object-fit: contain;
  // object-position: center;
  width: 24px;
  // overflow: hidden;
  // max-width: 100%;
`;
export const BtnTxt = styled.div`
  color: var(--White, #fff);
  // align-self: center;
  // flex-grow: 1;
  // white-space: nowrap;
  margin: auto 0 auto 10px;
  font: 500 16px/131% Plus Jakarta Sans, -apple-system, Roboto, Helvetica,
    sans-serif;
  @media (max-width: 769px) {
    // white-space: initial;
    font-size: 12px;
  }
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

export const RemoveButton = styled.button`
  background-color: #ff5858;
  color: #fff;
  border: none;
  padding: 0 8px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;
`;

export const FilePreviewContainer = styled.div`
  text-align: center;
`;

export const FilePreview = styled.img`
  width: 100px;
  height: auto;
  margin-top: 5px;
`;

export const Para = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  margin-bottom: 10px;
  color: #344054;
`;

export const ParaA = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  color: #344054;
  margin-left: 62%;

  @media (max-width: 992px) {
    margin-left: 20%;
  }
`;

export const Para1 = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
`;

export const Images = styled.div`
  width: 90%;
  height: 328px;
  top: 193px;
  left: 308px;
  gap: 433px;
`;
export const Para2 = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: right;
  color: #757575;
  font-family: Heebo;
  padding-bottom: 30px;
`;
export const Para3 = styled.p`
  color: #71717a;
  font-family: Plus Jakarta Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`;

export const H2A = styled.h2`
  font-family: Inter;
  font-size: 32px;
  font-weight: 600;
  line-height: 45px;
  letter-spacing: 0.25px;
  text-align: left;
  margin-top: 20px;
  color: #000000;
`;

export const H2 = styled.h2`
  font-family: Inter;
  font-size: 32px;
  font-weight: 600;
  line-height: 45px;
  letter-spacing: 0.25px;
  text-align: left;
  margin-top: 20px;
  color: #1d2939;
`;

export const H4 = styled.h3`
  font-family: Inter;
  font-size: 32px;
  font-weight: 600;
  line-height: 45px;
  letter-spacing: 0.25px;
  text-align: left;
  // margin-top: 20px;
  color: #1d2939;
`;
export const H5 = styled.h5`
  font-size: 24px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 20px;
  color: #18181b;
  font-family: Plus Jakarta Sans;
`;

export const ReservationContainer = styled.div`
  margin-top: 50px;
  width: 90%;
  space-between: 90px;
  height: fit-content;
  margin-bottom: 100px;

`;

export const BigDiv = styled.div`
  width: 50%;
  text-align: right;
  padding-top: 20px;
`;

export const Div1 = styled.div`
  width: 100%;
  height: fit-content;
`;

export const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: fit-content;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  margin-top: 40px;
  margin-left: 30%;
  align-items: flex-end;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 0%;
    margin-bottom: 20px;
    align-items: flex-end;
    justify-content: flex-start;
    }
`;

export const Div3 = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Link = styled.a`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  color: #1d2939;
`;

export const Button3 = styled.button`
  background: #3538cd;
  width: Hug (95px);
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

export const Button1 = styled.button`
  background: ${props => props.disabled ? '#ccc' : '#3538cd'};
  width: 100px;
  height: 40px;
  padding: 9px 14px 9px 14px;
  border-radius: 5px;
  gap: 10px;
  // background: #3538cd;
  border: none;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
  margin-right: 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'arrow'};
`;

export const Button2 = styled.button`
  width: fit-cotent;
  height: 40px;
  padding: 9px 14px 9px 14px;
  border-radius: 5px;
  border-radius: 5px;
  gap: 10px;
  border: ${props => props.disabled ? "none" : "1px solid #3538cd"};
  padding: 9px 14px 9px 14px;
  color: ${props => props.disabled ? "#fff" : "#3538cd"};
  font-size: 16px;
  font-weight: 400;
  background: ${props => props.disabled ? '#ccc' : '#ffffff'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'arrow'};
  text-align: center;
`;

export const Pic1 = styled.div`
  margin-right: 9px;
  padding-right: 9px;
   img {
    width: 100%;
    height: auto;
  }
  // img {
  //   maxHeight: 100%;
  //   width: auto;
  //   margin-right: 9px;
  //   padding-right: 9px;

  // }
`;

export const Div4 = styled.div`
  display: flex;
  padding-top: 60px;
`;


export const MotherDivs = styled.div``;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import house from "../assets/Images/house 1.svg";
import naira from "../assets/Images/Naira.png";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { reserveUnitSchema } from "../utils/reserveUnitShema";
import axiosInstance from "../request/axiosInstance";


export type FormDataType = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkInDate: string;
  checkOutDate: string;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ReserveUnitPage = () => {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const initialFormData: FormDataType = {
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    checkInDate: "",
    checkOutDate: "",
  };
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<Record<string, any>>({});
  const [minCheckInDate, setMinCheckInDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedMinDate = formatDate(currentDate);
    setMinCheckInDate(formattedMinDate);
  }, []);

  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/unit/${unitId}`);
        setUnit(response.data.unit);
      } catch (error) {
        console.error("Error fetching unit details:", error);
      }
    };

    fetchUnitDetails();
  }, [unitId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handlePhoneNumberChange = (isValid: boolean, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      customerPhone: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await reserveUnitSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      await axiosInstance.post("/api/create-reservation", {
        ...formData,
        unitId,
      });
      toast.success("Reservation created successfully!");
      setLoading(false);
      navigate("/dashboard/main");
    } catch (error) {
      toast.error("Error creating reservation!");
      if (error instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        setFormErrors(errors);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundDiv>
      <BodyContainer>
        <CenteredDiv>
          <Motherdiv>
            <ReserveUnitHeading>Reserve Unit</ReserveUnitHeading>
            <AdditionalText>View Reserved Short-lets Units</AdditionalText>
          </Motherdiv>
          <Card>
            <ImageContainer >
              <ImagedivImportant >
                {unit && unit.pictures && unit.pictures.length > 0 ? (
                  <ImageImportant src={unit.pictures[0]} alt="Sunny-side short-let" />
                ) : (
                  <p>No image available</p>
                )}{" "}
                <Textdiv>
                  <ImageTextImportant>{unit?.name}</ImageTextImportant>
                  <H3Important>
                    {unit?.numberOfBedrooms && <p>{unit?.numberOfBedrooms}</p>}
                    {unit?.location && <p>{unit?.location}</p>}
                    {unit?.price && (<p> ₦ {unit.price} </p>)}
                    {unit?.description && <p>{unit?.description}</p>}
                  </H3Important>
                </Textdiv>
              </ImagedivImportant>
            </ImageContainer>
            <Formcontainer>
              <br />
              <br />
              <Formdata>Tenants Details</Formdata>
              <form onSubmit={handleSubmit} method="post">
                <InputDiv
                
                >
                  <div className="label">
                    <label htmlFor="customerName" className="name">
                      <Labeltext>Name of Customer</Labeltext>
                    </label>
                    {formErrors.customerName && (
                      <ErrorMessage>{formErrors.customerName}</ErrorMessage>
                    )}
                    <InputImportant >
                      <input
                        type="text"
                        className="mail-box"
                        placeholder="Sunny side Shortlet"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                      />
                    </InputImportant>
                  </div>
                  <div className="label">
                    <label htmlFor="customerEmail" className="customerEmail">
                      <Labeltext>Email address</Labeltext>
                    </label>
                    {formErrors.customerEmail && (
                      <ErrorMessage>{formErrors.customerEmail}</ErrorMessage>
                    )}
                    <InputImportant>
                      <input
                        type="email"
                        className="mail-box"
                        placeholder="Email address"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                      />
                    </InputImportant>
                  </div>
                </InputDiv>
                <InputDiv
              
                >
                  <div style={{ position: "relative", marginBottom: "12px" }}>
                    <label htmlFor="number" className="number">
                      <Labeltext>Phone Number</Labeltext>
                    </label>
                    {formErrors.customerPhone && (
                      <ErrorMessage>{formErrors.customerPhone}</ErrorMessage>
                    )}
                    <InputImportant>
                      <IntlTelInput
                        onPhoneNumberChange={handlePhoneNumberChange}
                      />
                    </InputImportant>
                  </div>
                  <div className="location">
                    <label htmlFor="location" className="location">
                      <Labeltext>Location</Labeltext>
                    </label>

                    <InputImportant>
                      <input
                        type="text"
                        className="mail-box"
                        placeholder="Abuja"
                        name="location"
                        value={unit.location}
                        onChange={handleInputChange}
                      />
                    </InputImportant>
                  </div>
                </InputDiv>
                <InputDiv

    >
      <div className="check-in Date">
        <label htmlFor="date" className="name">
          <Labeltext>Check-in Date</Labeltext>
        </label>
        {formErrors.checkInDate && (
          <ErrorMessage>{formErrors.checkInDate}</ErrorMessage>
        )}
        <InputImportant>
          <input
            type="date"
            className="mail-box"
            placeholder="09-12-2023"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleInputChange}
            min={minCheckInDate} 
          />
        </InputImportant>
      </div>
      <div className="check-in date">
        <label htmlFor="date" className="date">
          <Labeltext>Check-out Date</Labeltext>
        </label>
        {formErrors.checkOutDate && (
          <ErrorMessage>{formErrors.checkOutDate}</ErrorMessage>
        )}
        <InputImportant>
          <input
            type="date"
            className="mail-box"
            placeholder="09-12-2023"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleInputChange}
             min={minCheckInDate} 
          />
        </InputImportant>
      </div>
    </InputDiv>
                {/* <div style={{ margin: "auto", marginBottom: "25px" }}>
                  <label htmlFor="number" className="name">
                    <Labeltext>Price of Unit</Labeltext>
                  </label>
                  {formErrors.price && (
                    <ErrorMessage>{formErrors.price}</ErrorMessage>
                  )}
                  <Input>
                    <input
                      type="text"
                      className="mail-box"
                      placeholder="70,000"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </Input>
                </div> */}
              </form>
              <br />
              <SubmitButton type="button" onClick={(e: any) => handleSubmit(e)}>
                {loading ? (
                  <BeatLoader
                    color="#fff"
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Save & Reserve"
                )}
              </SubmitButton>
            </Formcontainer>
          </Card>
        </CenteredDiv>
      </BodyContainer>
    </BackgroundDiv>
  );
};
const BackgroundDiv = styled.div`
  width: 100%;
  background: var(--Grey-50, #f9fafb);

 

`;

const BodyContainer = styled.div`
  margin: auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--Grey-50, #f9fafb);

    
`;

const CenteredDiv = styled.div`
  background: var(--Grey-50, #f9fafb);
  padding: 20px;
  border-radius: 8px;
  color: var(--Black, #000);

   @media (max-width: 769px){
      width: 80%;
      // background: red;
  }
`;

const ReserveUnitHeading = styled.h1`
  color: var(--Black, #000);
  /* Headline Semi Bold - 32 */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 44.8px */
  letter-spacing: 0.25px;

  @media screen and (max-width: 759px) {
    font-size: 24px;
  }
`;

const AdditionalText = styled.p`
  color: var(--Grey-700, #344054);
  /* Body Text Normal -16 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.15px;
`;

const Motherdiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Card = styled.div`
  background: var(--Grey-50, #f9fafb);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 1003px;
  height: 819px;
  flex-shrink: 0;
  border-radius: px;
  background: #fff;
  @media screen and (max-width: 759px) {
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 130px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 0;
  margin-bottom: 20px;
  margin-top: 20px;

`;

const Input = styled.div`
  display: flex;
  width: 400px;
  padding: 12px;
  align-items: center;
  gap: 38px;
  border-radius: 4px;
  border: 1px solid var(--Grey-600, #475467);
  background: var(--Basic-White, #fff);
  input {
    flex: 2;
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
  }
`;
const InputImportant = styled.div`
  display: flex;
  width: 400px;
  padding: 12px;
  align-items: center;
  gap: 38px;
  border-radius: 4px;
  border: 1px solid var(--Grey-600, #475467);
  background: var(--Basic-White, #fff);
  input {
    flex: 2;
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
  }

  @media (max-width : 769px){
    width: 220px;
  }
`;

export const Imagediv = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

`;

export const ImagedivImportant = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  @media (max-width: 460px){
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    margin-top: -80px;
  }

`;

export const Textdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 4px;
`;
export const H3 = styled.div`
  color: var(--Grey-700, #344054);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.15px;

  @media (max-width: 769px){
    font-size: 12px;
  }
`;
export const H3Important = styled.div`
  color: var(--Grey-700, #344054);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.15px;

  @media (max-width: 769px){
    font-size: 12px;
  }
`;

const Formdata = styled.div`
  color: var(--Black, #000);
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: 0.25px;

  @media (max-width : 460px){
    margin-top: -130px;
   
  }
`;

const InputDiv = styled.div`
  margin: auto;
  marginBottom: 25px;
  display: flex;
  gap: 30px;

  @media (max-width : 729px){
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    gap: 10px;
  }
`

export const ImageText = styled.p`
  color: var(--Grey-800, #1d2939);
  font-family: Inter;
  text-wrap: no-wrap;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 33.6px */

  @media (max-width: 769px){
    font-size: 16px;
  }
`;
export const ImageTextImportant = styled.p`
  color: var(--Grey-800, #1d2939);
  font-family: Inter;
  text-wrap: no-wrap;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 33.6px */

  @media (max-width: 769px){
    font-size: 12px;
  }
`;

const Formcontainer = styled.div`
  // display: inline-flex;
  // flex-direction: column;
  // align-items: flex-start;
  // gap: 16px;

  // @media screen and (max-width: 800px) {
  //   font-size: 10px;
  //   display: grid;
  //   overflow-x: none;
  //   width: 50%;
  //   grid-template-columns: 1fr;
  //   /* display: none */

  // }

    display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const Image = styled.img`
  width: 213px;
  height: 166px;
  border-radius: 4px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;

  @media {max-width : 729px}{
    width: 106px;
    height: 83px;
  }
`;

export const ImageImportant = styled.img`
  width: 213px;
  height: 166px;
  border-radius: 4px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;

  @media (max-width: 460px){
    width: 106px;
    height: 83px;
  }

`;

const Labeltext = styled.label`
  color: var(--Gray-900, #212121);
  font-family: Heebo;
  font-size: 16px;
  font-style: normal;
  font-weight: 500px;
  line-height: 20px;
`;

const SubmitButton = styled.button`
  color: var(--White, #fff);
  white-space: nowrap;
  justify-content: center;
  border-radius: 5px;
  background-color: #3538cd;
  padding: 15px 35px;
  font: 500 16px/131% Plus Jakarta Sans, -apple-system, Roboto, Helvetica,
    sans-serif;
  margin-top: -40px; /* Adjust the margin-top as needed */
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-bottom: -2px;
  margin-top: -5px;
  display: block;
`;

export default ReserveUnitPage;

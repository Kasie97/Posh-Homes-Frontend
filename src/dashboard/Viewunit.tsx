import React, {
  // useContext,
  useEffect,
} from "react";
import axiosInstance from "../request/axiosInstance";
import { useState } from "react";
import styled from "styled-components";
import Modal2 from "../Component/Modal/Modal2";
import Fiilter from "../assets/Images/filter.svg";
import Unit from "../components/Unit";
import FilterModal from "./FilterModal";
import { toast } from "react-toastify";

interface filterValues {
  status: string;
  amenities: string;
  type: string;
  price: string;
}

const Viewunit = () => {
  const [userUnits, setUserUnits] = useState<any>([]);

  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleFilterSave = async (value: filterValues) => {
    console.log(value);

    try {
      const response = await axiosInstance.get("api/filter-units", {
        params: {
          status: value.status,
          amenities: value.amenities,
          type: value.type,
          price: value.price,
        },
      });
      setUserUnits(response.data.units);
      setShowFilterModal(false);
    } catch (error) {
      toast.error(error?.response?.data.message);
      console.error("Error fetching user units:", error);
    }
  };

  const fetchUserUnits = async () => {
    try {
      const response = await axiosInstance.get("api/my-units");
      setUserUnits(response.data.units);
    } catch (error) {
      console.error("Error fetching user units:", error);
    }
  };

  useEffect(() => {
    fetchUserUnits();
  }, []);

  // useEffect(() => {
  // const fetchFilter = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/api/filter-units");
  //     const data = await response.data.data;
  //     console.log("Filter", data);

  //     setFilter(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   }
  // };
  // fetchFilter();
  // });

  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const newModal = () => {
    setMode(!mode);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

    return (
    <>
      <FilterModal
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onSave={handleFilterSave}
      />

      <MotherDiv>
        <TitleDiv>
          <TitleText style={{ fontSize: "25px" }}>View Units</TitleText>
          <p className="titleParagraph">View Short-lets Units</p>
        </TitleDiv>

        <FilterDiv>

          <span style={{color: "grey"}} > Sort by: </span> 
          <FilterButton onClick={() => setShowFilterModal(true)}> 
              <img src={Fiilter} alt="Filter Icon" style={{width: "15px", height : "15px"}} />
               &nbsp; &nbsp;
              <span style={{color: "grey"}} >Filter </span> 
          </FilterButton>

        </FilterDiv>

        <Modal2 />
        {userUnits.map((unit: any) => (
          <Unit unit={unit} key={unit.id} />
        ))}

      </MotherDiv>

      {/* <MotherDiv>
        <Shinar>
          <Shina style={{ fontSize: "25px" }}>View Units</Shina>
          <p className="Judah">View Short-lets Units</p>
        </Shinar>
        <Filter>
          <span style={{ fontSize: "0.9em", color : "grey" }}>
            Sort by:{" "}
          </span>
            <Button
              onClick={() => setShowFilterModal(true)}
            >
              <img className="filterIcon" src={Fiilter} alt="Filter Icon" />
              <span className="filterText" style={{ fontSize: "0.9em", color : "grey" }}> Filter </span>
            </Button>
        </Filter>

        <Modal2 />
        {userUnits.map((unit: any) => (
          <Unit unit={unit} key={unit.id} />
        ))}
      </MotherDiv> */}
    </>
  );
};

export const FilterDiv = styled.div`
   padding: 20px 10px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   font-size: 0.85em;

   @media (max-width: 769px){
    margin-left: 1rem;
   }
  
`

export const FilterButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color : white;
    border-radius: 25px;
    border: 1px solid grey;
    padding: 5px 15px;
    margin-left: 5px;
    cursor :pointer;
`

const TitleText = styled.div`
  font-family: Heebo;
`;

const TitleDiv = styled.div`
  padding: 20px 10px;

  .titleParagraph {
    color: var(--Grey-700, #344054);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    padding-top: 5px;
    padding-left: 0px;
    letter-spacing: 0.15px;
  }

  @media (max-width : 769px){
    margin-left: 1rem;
  }
`;

export const Div4 = styled.div`
position: absolute;
top: 5px;
right: 20px;
  margin-bottom: 0px;
  margin-top: 5px;
  margin-left: 95%;
  text-align: right;
`;

export const Div5 = styled.div`
  display: flex;
  margin-left: 100px;
  width: 100%;
  // margin-top: -10px;
  margin-top: 7em;
  justify-content: space-between;

  @media (max-width : 769px){
    margin: 0 auto;
  }
`;

export const ModButon = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0px;
  border: none;
  align-content: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const InputContain = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  label {
    display: block;
    font-size: 16.16px;
  }
  select {
    /* border: 1px solid blue; */
    width: 100%;
    height: 3rem;
    padding: 0.5rem;
    color: var(--Gray-600, #757575);
    font-family: Heebo;
    font-size: 18.468px;
    font-style: normal;
    font-weight: 400;
    /* line-height: 150%; */
  }
`;

export const MotherDiv = styled.div`
  overflow-x: hidden;
  width: 100%;
`;

export const Containers = styled.div`
  background: var(--White, #fff);
  display: flex;
  padding: 16px 8px;
  gap: 54px;
  margin-left: 0%;
  padding-right: 5%;
  width: 90%;
  margin-bottom: 15px;
    position : relative;

  @media screen and (max-width: 769px) {
    display: flex;
    flex-direction: column;
    padding-right: 5%;
    width: 95%;
    margin-left: 2.5%;

  }
`;

export const Btn3 = styled.div`
  color: #ffffff;
  font-family: Plus Jakarta Sans;
  font-size: 16px;
  text-align: center;
  text-wrap: nowrap;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  background-color: var(--Indigo-700, #3538cd);
  width: 222px;
  padding: 18px 71px;
  gap: 5px;
  border-radius: 4px;
  margin-left: 40px;
  height: 57px;

  @media (max-width: 769px){
  font-size: 12px;
  width: 111px;
  padding: 9px 0;
  height: 40px;


  }
`;

export const Btn2 = styled.div`
  color: var(--Indigo-700, #3538cd);
  font-family: Plus Jakarta Sans;
  font-size: 16px;
  text-align: center;
  text-wrap: nowrap;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  width: 222px;
  height: 57px;
  padding: 18px 63.5px;
  gap: 5px;
  border-radius: 4px;
  border: 1px solid var(--Indigo-700, #3538cd);

    @media (max-width: 769px){
      font-size: 12px;
      width: 111px;
      padding: 9px 0px;
      height: 40px;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  width: 50%;
  height: fit-content;
  margin-right: -5%;


  @media screen and (max-width: 600px) {
    margin-left: 0%;
    width: 100%;
  }
`;

const WriteUp = styled.div`
  /* border: 3px solid; */
  text-wrap: nowrap;
  height: 100%;
  line-height: 35px;
`;

const Left = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const Shina = styled.div`
  font-family: Heebo;
`;

const Shinar = styled.div`
  padding: 20px 10px;

  .Judah {
    color: var(--Grey-700, #344054);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    padding-top: 5px;
    padding-left: 0px;
    letter-spacing: 0.15px;
  }

  @media (max-width : 769px){
    margin-left: 1rem;
  }
`;

export const Button = styled.button`
  font-family: Inter;
  width: 100px;
  height: 2rem;
  border-radius: 40px;
  border: 1px solid grey;
  background-color: white;
  text-align: center;
  text-decoration: none;

  .filter-text{
    margin-right: 5px;
  }

   .filterIcon {
      margin-right: 3px;
      width: 20px;
      height: 20px;
      padding-top: 5px;
  }
`;

const Filter = styled.div`
  padding: 20px 10px;
   @media (max-width : 769px){
    margin-left: 1rem;
  }
`;

export const ModelDiv = styled.div`
  z-index: 1000;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 12px 16px -4px #2121211a;
  box-shadow: 0px 4px 8px -2px #21212112;
  width: 121px;
  height: 65px;
  position: relative;
  top: -22px;
  right: 0px;
  border-radius: 10px;
  background: #ffffff;
  color: black;
`;

export const EditModelDdiv = styled.div`
  margin-top: -20px;
  margin-bottom: 10px;
  padding: 5px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
   :hover{
    transform: scale(0.75)
  }
 
`;

export const ModelText = styled.h1`
  font-size: 16px;
  font-weight: 500;
`;

export default Viewunit;

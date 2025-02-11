import React, { useEffect, useState } from "react";
import {
  Btn2,
  Btn3,
  Containers,
  Div4,
  Div5,
  EditModelDdiv,
  ModelDiv,
  ModelText,
  Right,
} from "../dashboard/Viewunit";
import {
  Imagediv,
  ImageContainer,
  ImageText,
  Textdiv,
  Image,
  H3,
} from "../dashboard/ReserveUnit";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import naira from "../assets/Images/Naira.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import axiosInstance from "../request/axiosInstance";
import { GiCancel } from "react-icons/gi";
import ConfirmationModal from "../Component/Modal/ConfirmationModal";
import { FaBullseye } from "react-icons/fa6";

const Unit = ({ unit }: { unit: Record<string, any> }) => {
  const [showModal, setShowModal] = useState(false);
const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

	function toSentenceCase(str: string) {
 		 return str.charAt(0).toUpperCase() + str.slice(1);
	}

useEffect(() => {
    if(isDeleteModalOpen)
      setShowModal(false);
  }, [isDeleteModalOpen]);

  
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };


  const handleDeleteConfirm = () => {
    deleteUnit();
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleIconClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const deleteUnit = async () => {
    try {
      const response = await axiosInstance.delete(`api/delete/${unit.id}`);
      toast.success("unit deleted successfully");
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Error deleting Unit");
    }
  };
  return (
    <Containers key={unit.id}>
      <ImageContainer>
        <Imagediv>
          {unit.pictures && unit.pictures.length > 0 ? (
            <Image src={unit.pictures[0]} alt="Sunny-side short-let" />
          ) : (
            <p>No image available</p>
          )}
          <Textdiv>
            <ImageText>{toSentenceCase(unit?.name)}</ImageText>
            <H3>
              {unit?.type && <p>{unit?.type}</p>}
              {unit?.location && <p>{unit?.location}</p>}
              {unit?.status && <p>{unit?.status}</p>}
              {unit?.price && (<p> <span style={{textDecorationLine : "line-through", textDecorationStyle : "double"}}>N</span> &nbsp;{unit?.price} </p>
              )}
            </H3>
          </Textdiv>
        </Imagediv>
      </ImageContainer>
      <Right>
        <Div4>
          <BsThreeDotsVertical onClick={handleIconClick} />

          {showModal && (
            <ModelDiv>
              <RxCross2
                onClick={handleCloseModal}
                style={{ marginTop: "5px", marginLeft: "50%" }}
              />

              <Link
                to={`/dashboard/edit-unit/${unit.id}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                <EditModelDdiv>
                  <MdOutlineModeEdit style={{ fontSize: "14px" }} />
                  <ModelText>Edit Unit</ModelText>
                </EditModelDdiv>
              </Link>
              <EditModelDdiv onClick={handleDeleteClick} style={{ cursor: "pointer" }}>
                <GiCancel style={{ fontSize: "20px" }} />
                <ModelText>Delete Unit</ModelText>
              </EditModelDdiv>
            </ModelDiv>
          )}
        </Div4>

      {isDeleteModalOpen ? (
           <ConfirmationModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          message="Are you sure you want to delete this unit? All of the units data will be permanently deleted from our database. This action cannot be undone!"
          color="black"
          width="300px"
          height="250px"
        />) : null }


        <Div5>
          <Link
            to={`/dashboard/view-more/${unit.id}`}
            style={{ textDecoration: "none" }}
          >
            <Btn3>View More</Btn3>
          </Link>

          <Link
            to={`/dashboard/reserve-unit/${unit.id}`}
            style={{ textDecoration: "none" }}
          >
            <Btn2>Reserve Unit</Btn2>
          </Link>
        </Div5>
      </Right>
    </Containers>
  );
};

export default Unit;

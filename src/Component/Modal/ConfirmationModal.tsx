import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CiWarning } from "react-icons/ci";


interface ModalContentProps {
  width?: string;
  height?: string;
}


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div<ModalContentProps>`
  background: #ebebeb;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items : center;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  width: ${(props) => props.width || '400px'};
  height: ${(props) => props.height || '600px'};


  button {
    cursor: pointer;
    transition: background-color 0.3s;
`;

const ConfirmationModal: React.FC<{
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
  color?: string;
  width?: string;
  height?: string;
}> = ({ onCancel, onConfirm, message, color, width, height }) => {
  return (
    <ModalOverlay>
      <ModalContent width={width} height={height}>
       {/* <div style={{display : "flex", justifyContent: "center", alignItems : "space-around"}}> */}
        <StyledWarningIcon size={60}/>                              
        <p style={{ color: color || 'grey' , textAlign : "justify", fontSize : ".80em", marginTop: "10px"}}>{message}</p>
       {/* </div> */}
       <div style={{textAlign: "right"}}>
        <button onClick={onConfirm} style={{marginBottom: "10px", marginTop: "10px", backgroundColor: "inherit", color: "black", borderRadius: "5px", border: "1px solid grey",  height: "30px", padding: "5px", width: "100px"}}>Confirm</button>
        <button onClick={onCancel} style={{backgroundColor: "red", color: "white", border : "1px solid red", borderRadius: "5px", height: "30px", padding: "5px", width: "100px", marginLeft : "15px"}}>Cancel</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

ConfirmationModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

const StyledWarningIcon = styled(CiWarning)`
  color: red; 
  background-color: #fec5e5; 
  border: 2px solid  #fec5e5; 
  border-radius: 50%;
  padding: 10px; 
`;

export default ConfirmationModal;

import React, { useState } from "react";
import styled from "styled-components";
import "./Modal.css";

const Modal2 = () => {
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const newModal = () => {
    setMode(!mode);
  };
  if (mode) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {mode && (
        <div className="modal">
          <div onClick={newModal} className="overlay"></div>
          <div className="modal-container">
            <button>
              {/* <Link to={/dashboard/Edit-unit}>{BsPen} Edit</Link> */}
            </button>
          </div>
        </div>
      )}

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <form>
              <InputContain>
                <label
                  id="cars"
                  style={{
                    fontFamily: "Heebo",
                    fontSize: "16px",
                    color: "var(--Gray-900, #212121)",
                  }}
                >
                  Status
                </label>

                <select id="cars" name="cars">
                  <option value="occupied">Occupied</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                </select>
                <br />

                <label
                  id="cars"
                  style={{
                    fontFamily: "Heebo",
                    fontSize: "16px",
                    color: "var(--Gray-900, #212121)",
                  }}
                >
                  Amenties:
                </label>
                <br />
                <select id="cars" name="Amenities">
                  <option value="volvo">Bathroom</option>
                  <option value="saab">Jacuzzi</option>
                  <option value="mercedes">Detached</option>
                  <option value="audi">Audi</option>
                </select>
                <br />

                <label
                  id="cars"
                  style={{
                    fontFamily: "Heebo",
                    fontSize: "16px",
                    color: "var(--Gray-900, #212121)",
                  }}
                >
                  Type
                </label>

                <select id="cars" name="cars">
                  <option value="volvo">Duplex</option>
                  <option value="saab">Bungalow</option>
                  <option value="mercedes">Storey Building</option>
                  <option value="audi">Audi</option>
                </select>
                <br />

                <label id="cars">Price</label>

                <select id="cars" name="price">
                  <option value="volvo">70,000</option>
                  <option value="saab">50,000</option>
                  <option value="mercedes">30,000</option>
                  <option value="audi">10,000</option>
                </select>
              </InputContain>
            </form>
            <br />
            <ModButon>
              <button
                className="btn4"
                onClick={toggleModal}
                style={{
                  color: "var(--Indigo-700, #3538cd)",
                  backgroundColor: "white",
                }}
              >
                CANCEL
              </button>
              <button
                className="btn5"
                onClick={toggleModal}
                style={{
                  color: "White",
                  backgroundColor: "var(--Indigo-700, #3538cd)",
                }}
              >
                SAVE
              </button>
            </ModButon>
          </div>
        </div>
      )}
    </>
  );
};

const ModButon = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0px;
  border: none;
`;

const InputContain = styled.div`
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

export default Modal2;

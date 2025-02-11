import React, { useState, useEffect } from "react";
import { Div1, Div3, H4, Para, ParaA, ReservationContainer } from "../dashboard/style";
import ReservationDescription from "./ReservationDescription";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axiosInstance from "../request/axiosInstance";

const Reservation = () => {
  const { id } = useParams<{ id: string }>();
  const [reservationHistory, setReservationHistory] = useState<
    Record<string, any>[]
  >([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseReservation = await axiosInstance.get(
          `api/reservations/unit/${id}`
        );
        setReservationHistory(responseReservation.data.reservations);
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ReservationContainer>
      <Div3>
          <H4>Reservation History</H4>
          <ParaA>View More</ParaA>
      </Div3>
      <Div1>
        

        {reservationHistory.length > 0 ? (
          reservationHistory.map((reservation: Record<string, any>) => (
            <ReservationDescription
              key={reservation.id}
              reservation={reservation}
            />
          ))
        ) : (
          <Para>No Reservations</Para>
        )}
      </Div1>
    </ReservationContainer>
  );
};

export const ModelDiv1 = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 12px 16px -4px #2121211a;
  box-shadow: 0px 4px 8px -2px #21212112;
  width: 210px;
  height: fit-contents;
  position: relative;
  right: -90px;
  bottom: 10px;
  border-radius: 10px;
  color: black;
  padding-bottom: 10px;

  @media (max-width: 600px) {
    position: relative;
    right: -10px;
    bottom: 10px;
  }
`;

export default Reservation;
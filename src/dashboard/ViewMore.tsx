import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../request/axiosInstance";
import { useParams } from "react-router-dom";
import UnitDescription from "../components/UnitDescription";
import { H2A, MotherDivs, Images, Pic1, Para } from "./style";
import Reservation from "../components/Reservation";

const ViewMore = () => {
  const { id } = useParams();
  const [unit, setUnit] = useState<any>({});
  const [reservationHistory, setReservationHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`api/unit/${id}`);
        setUnit(response.data.unit);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   customPaging: (i) => (
  //     <a style={{ marginRight: '10px' }}></a>
  //   ),
  // };

  return (
    <MotherDivs>
      <div>
        <H2A>View More</H2A>
        <Para> View Short-lets Units</Para>
      </div>

      {unit.description ? (
        <>
          <Images>
            <Slider {...settings}>
              {unit.pictures.map((picture: string, index: number) => (
                <Pic1 key={index}>
                  <img src={picture} alt={`house ${index + 1}`} />
                </Pic1>
              ))}
            </Slider>
          </Images>

          <UnitDescription unit={unit} />
          <Reservation />
          {/* <ReservationContainer>
            <Div1>
              <Div3>
                <H4>Reservation History</H4>  
              </Div3>

              {reservationHistory.length > 0 ? (
                reservationHistory.map((reservation, index) => (
                  <ReservationDescription
                    key={index}
                    reservation={reservation}
                  />
                ))
              ) : (
                <Para>No Reservations</Para>
              )}
            </Div1>
            <Div2>
              <Para2>View More</Para2>
              <HiDotsHorizontal />
              <Div4>
                <Button1>check-In</Button1>
                <Button2>check-Out</Button2>
              </Div4>
            </Div2>
          </ReservationContainer> */}
        </>
      ) : (
        <p>No units available</p>
      )}
    </MotherDivs>
  );
};

export default ViewMore;
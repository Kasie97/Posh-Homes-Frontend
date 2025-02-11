import React, { useEffect, useState } from "react";
import styled from "styled-components";
import house from "../assets/Images/house 1.svg";
import axiosInstance from "../request/axiosInstance";
import { useDispatch } from "react-redux";
import { increment } from "../store/reducers/modalSlice";

interface Inotification {
  id: string;
  title: string;
  body: string;
}

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/api/unseen-notifications");
        console.log(response.data);
        setNotifications(response.data.unseenNotification);
        dispatch(increment(response.data.unseenNotification.length));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markNotificationAsSeen = async (id: any) => {
    try {
      await axiosInstance.patch(`/api/notifications/seen/${id}`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification: Inotification) => notification?.id !== id
        )
      );
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  return (
    <div>
      <Backdrop />

      <Modal>
        {notifications.length === 0 && <p>no notification</p>}
        {notifications.length > 0 &&
          notifications.map((notification: Inotification) => (
            <Wrapper key={notification.id}>
              <ProfileImg src={house} alt="Notification" />
              <Content>
                <Title>{notification.title}</Title>
                <Body>{notification.body}</Body>
              </Content>
              <MarkAsSeenButton
                onClick={() => markNotificationAsSeen(notification.id)}
              >
                Mark as Read
              </MarkAsSeenButton>
            </Wrapper>
          ))}
        {/* <ViewAllBtn>View All</ViewAllBtn> */}
      </Modal>
    </div>
  );
};
export default NotificationList;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -2;
`;

const Modal = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid lightgray;
  padding: 5px;
  border-radius: 8px;
  background: white;
  width: 505px;
  max-height: 1000px;
  overflow-y: auto;
  z-index: 100;

  @media (max-width: 769px) {

    width: 80%;
    top: 60;
    right: 10;
    border-radius: 8;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4;
  border-bottom: 2px solid #3d3a3a;
  z-index: 100;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;

  @media (max-width: 769px) {
    height: 50px;
    width: 50px;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  color: #333;
  margin: 0;
  margin-bottom: 10px;
`;

const Body = styled.p`
  color: #666;
  margin: 0;
  margin-bottom: 20px;
`;

const MarkAsSeenButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  padding: 10px 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

// const ViewAllBtn = styled.button`
// 	color: white;
// 	font-size: 24px;
// 	font-weight: 600;
// 	line-height: 33.6px;
// 	width: 100%;
// 	height: 66px;
// 	border-radius: 5px;
// 	background-color: blue;
// 	border: none;
// 	margin-top: 16px;
// `;

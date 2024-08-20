import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Navbar from "./Navbar";
import Card from "./Card"; 
import NotificationCard from "./NotificationCard";
import { useNavigate } from "react-router-dom"; 

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-top: 5rem;
  width: 100%;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
`;

const NotificationsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
  margin-left: 300px;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
  overflow-y: auto;
  max-height: 300px;
`;

const NotificationsHeading = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  color: #333;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [todaysMeal, setTodaysMeal] = useState(null);
  const [tomorrowsMeal, setTomorrowsMeal] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    }

    // Fetch today's menu item
    axios
      .post("http://localhost:3000/menu/get-todays-menu-item")
      .then((response) => {
        setTodaysMeal(response.data);
      })
      .catch((error) => console.error("Error fetching today's menu:", error));

    // Fetch tomorrow's menu item
    axios
      .post("http://localhost:3000/menu/get-tomorrows-menu-item")
      .then((response) => {
        setTomorrowsMeal(response.data);
      })
      .catch((error) => console.error("Error fetching tomorrow's menu:", error));

    // Fetch all orders (notifications)
    axios
      .post("http://localhost:3000/order/get-all-orders")
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [navigate]);

  const handleAcceptOrder = (orderId) => {
    const token = localStorage.getItem("token");
  
    axios
      .post(
        "http://localhost:3000/order/accept-order",
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setNotifications(notifications.filter((order) => order.id !== orderId));
        alert("Order accepted successfully!");
      })
      .catch((error) => console.error("Error accepting order:", error));
  };

  return (
    <div>
      <Navbar />
      <DashboardContainer>
        <CardsWrapper>
          {todaysMeal && (
            <Card
              title="Today's Meal"
              name={todaysMeal.name}
              image={todaysMeal.picture}
            />
          )}
          {tomorrowsMeal && (
            <Card
              title="Tomorrow's Meal"
              name={tomorrowsMeal.name}
              image={tomorrowsMeal.picture}
            />
          )}
        </CardsWrapper>
        <NotificationsContainer>
          <NotificationsHeading>Notifications</NotificationsHeading>
          {notifications.map((notification, index) => (
            <NotificationCard
              key={index}
              message={`${notification?.user?.name} has ordered a menu with a quantity of ${notification.quantity}.`}
              time={`Created At: ${new Date(notification.createdAt).toLocaleString()}`}
              accept={() => handleAcceptOrder(notification.id)}
              reject={() => alert("Reject functionality not implemented yet.")}
            />
          ))}
        </NotificationsContainer>
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;

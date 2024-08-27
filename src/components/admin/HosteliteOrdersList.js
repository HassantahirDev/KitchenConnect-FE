import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ItemCard from "./ItemCard";
import Navbar from "./Navbar";

const OrderListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 22rem;
  margin-top: 5rem;
`;

const HosteliteOrdersList = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch("http://192.168.1.5:3000/order/hostelite-orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, []);

  return (
   <>
   <Navbar/>
   <OrderListContainer>
      {order && order.menu.dailyMenus.map((menuItem) => (
        <ItemCard
          key={menuItem.id}
          title={menuItem.name}
          date={order.menu.date} // Date from the order's menu
          image={menuItem.picture}
          price={menuItem.price}
          ingredients={menuItem.ingredients}
        />
      ))}
    </OrderListContainer>
   </>
  );
};

export default HosteliteOrdersList;

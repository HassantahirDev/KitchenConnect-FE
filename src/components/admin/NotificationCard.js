import React from "react";
import styled from "styled-components";

const NotificationCardContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1rem;
  margin: 0 0 0.5rem;
`;

const Time = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  color: #fff;

  &.accept {
    background-color: #28a745;
  }

  &.reject {
    background-color: #dc3545;
  }
`;

const NotificationCard = ({ message, time, accept, reject }) => {
  return (
    <NotificationCardContainer>
      <Message>{message}</Message>
      <Time>{time}</Time>
      <ButtonsWrapper>
        <Button className="accept" onClick={accept}>
          Accept
        </Button>
        <Button className="reject" onClick={reject}>
          Reject
        </Button>
      </ButtonsWrapper>
    </NotificationCardContainer>
  );
};

export default NotificationCard;

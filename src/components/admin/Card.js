// Card.js
import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 300px;
  background: rgba(255, 255, 255, 0.8); /* Transparent white background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  margin: 1rem;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
`;

const CardContent = styled.div`
  padding: 1rem;
  text-align: center;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const Card = ({ title, image, name }) => (
  <CardContainer>
    <CardImage src={image} alt={title} />
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardTitle>{name}</CardTitle>
    </CardContent>
  </CardContainer>
);

export default Card;

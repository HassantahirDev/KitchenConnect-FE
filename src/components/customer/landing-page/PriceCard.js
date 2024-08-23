import React from 'react';
import styled from 'styled-components';
import { FaDollarSign, FaCheckCircle, FaUserShield, FaClock, FaThumbsUp } from 'react-icons/fa';

// Styled components
const PriceCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f9f9f9 0%, #e1e1e1 100%);
  width: 100%;
  max-width: 100%;
  margin: 20px 0;
  box-sizing: border-box;
`;

const PriceCardHeader = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
  border-right: 1px solid #ddd;
  background: #ee8417;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PriceCardTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const PriceCardPrice = styled.div`
  display: flex;
  align-items: center;
  font-size: 36px;
  margin-top: 10px;
`;

const PriceCardPriceIcon = styled(FaDollarSign)`
  margin-right: 5px;
`;

const PriceCardBody = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PriceCardFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PriceCardFeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
`;

const FeatureIcon = styled.div`
  margin-right: 10px;
  color: #333;
`;

const PriceCardButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  color: #fff;
  background-color: #ee8417;
  border: none;
  border-radius: 34px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #000;
    color: #fff
  }
`;

// PriceCard Component
const PriceCard = () => {
  return (
    <PriceCardContainer>
      <PriceCardHeader>
        <PriceCardTitle style={{fontFamily:'Outfit'}}>Dana Pani Monthly Package</PriceCardTitle>
        <PriceCardPrice>
          <PriceCardPriceIcon />
          <span style={{fontFamily:'Outfit'}}>8,000</span>
        </PriceCardPrice>
      </PriceCardHeader>
      <PriceCardBody>
        <PriceCardFeatures>
          <PriceCardFeatureItem style={{fontFamily:'Outfit'}}>
            <FeatureIcon><FaCheckCircle /></FeatureIcon>
            Unlimited Orders
          </PriceCardFeatureItem>
          <PriceCardFeatureItem style={{fontFamily:'Outfit'}}>
            <FeatureIcon><FaUserShield /></FeatureIcon>
            Secure Payment
          </PriceCardFeatureItem >
          <PriceCardFeatureItem style={{fontFamily:'Outfit'}}>
            <FeatureIcon><FaClock /></FeatureIcon>
            24/7 Support
          </PriceCardFeatureItem>
          <PriceCardFeatureItem style={{fontFamily:'Outfit'}}>
            <FeatureIcon><FaThumbsUp /></FeatureIcon>
            High Satisfaction
          </PriceCardFeatureItem>
        </PriceCardFeatures >
        <PriceCardButton style={{fontFamily:'Outfit'}}>Subscribe</PriceCardButton>
      </PriceCardBody>
    </PriceCardContainer>
  );
};

export default PriceCard;

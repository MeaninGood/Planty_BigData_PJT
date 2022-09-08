import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 0px 20px;

  &:hover {
    & .plant-img {
      transition: transform 0.3s;
      transform: scale3d(1.03, 1.03, 1.03);
    }
  }
`;

const PlantImg = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.themeColor[5]};
`;

const BigCard = () => {
  return (
    <Wrapper>
      <PlantImg className="plant-img" />
    </Wrapper>
  );
};

export default BigCard;

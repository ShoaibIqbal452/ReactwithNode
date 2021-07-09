import React from 'react';
import styled, { css } from 'styled-components';

const StyledMarker = styled.div`
  height: 30px;
  width: 30px;
  background-color: blue;
  display: flex;
  conlor: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-wright: bold;

  ${(props) =>
    props.type == 'departure' &&
    css`
      background-color: red;
    `}
`;

const MapMarkerPin = (props) => {
  return <StyledMarker type={props.type}>{props.type?.substring(0, 1).toUpperCase()}</StyledMarker>;
};

export default MapMarkerPin;

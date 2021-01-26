// import { Resume } from "./Resume";
// import { useEffect, useState } from "react";
import { useWindowDimensions } from "./hooks";
import "./App.css";
import styled, { keyframes } from "styled-components";
// Gate door opening animation --> transitions

const slideOutRight = (width) => keyframes`
  from {
    transform: translate(${width*2}px);
  }
  to {
    transform: translate(-${width*2}px);
  }
`;

const slideOutLeft = (width) => keyframes`
  from {
    transform: translate(-${width}px);
  }
  to {
    
    transform: translate(${width}px);
  }
`;

const StyledBrickRight = styled.div`
  // display: inline-block;
  // height: ${(props) => props.height}px;
  // width: ${(props) => props.width}px;
  background-color: grey;
  border: 1px solid black;
  animation: ${(props) => slideOutRight(props.width)} 0.7s linear;
`;

const StyledBrickLeft = styled.div`
  // display: inline-block;
  // height: ${(props) => props.height}px;
  // width: ${(props) => props.width}px;
  background-color: grey;
  border: 1px solid black;
  animation: ${(props) => slideOutLeft(props.width)} 0.7s linear;
`;

const Parent = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

function OpeningDoor() {
  const [width, height] = useWindowDimensions();

  const getDiv = () => {
    // const heightOfBricks = Math.ceil(height / 8) - 2;
    const widthOfBricks = Math.floor(width / 2);
    let elements = [];
    for (let i = 0; i < 16; i++) {
      if (i % 2 === 0) {
        elements.push(<StyledBrickRight width={widthOfBricks} />);
      } else {
        elements.push(<StyledBrickLeft width={widthOfBricks} />);
      }
    }
    return elements;
  };
  return (
    <Parent width={width} height={height}>
      {getDiv()}
    </Parent>
  );
}

function App() {
  // return <Resume />;
  return <OpeningDoor />;
}

export default App;

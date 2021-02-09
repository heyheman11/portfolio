import { useState, useEffect } from 'React;'
import { useWindowDimensions } from "../hooks";
import styled, { keyframes } from "styled-components";

const useHeight = (ref) => {
  const [height, setHeight] = useState(0);
  console.log("HEIGHT", height);

  // console.log("HEIGHT ", ref?.current?.offsetWidth);
  useEffect(() => {
    const copiedRef = ref;
    const resize = new ResizeObserver((node) => {
      setHeight(node[0]?.contentRect?.height);
    });
    if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
      resize.observe(copiedRef.current);
    }
    return () => {
      if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
        resize.unobserve(copiedRef?.current);
      }
    };
  }, []);
  return height;
};

const slideInRight = (width) => keyframes`
  from {
    transform: translateX(${width}px);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInLeft = (width) => keyframes`
  from {
    transform: translateX(-${width}px);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledBrickRight = styled.div`
  background-color: grey;
  border: 1px solid black;
  animation: ${(props) => slideInRight(props.width)} 0.7s linear;
`;

const StyledBrickLeft = styled.div`
  background-color: grey;
  border: 1px solid black;
  animation: ${(props) => slideInLeft(props.width)} 0.7s linear;
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
    const widthOfBricks = Math.floor(width / 2);
    let elements = [];
    for (let i = 0; i < 16; i++) {
      if (i % 2 === 0) {
        elements.push(<StyledBrickLeft width={widthOfBricks} />);
      } else {
        elements.push(<StyledBrickRight width={widthOfBricks} />);
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
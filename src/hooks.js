import { useEffect, useState } from "react";

function useWindowDimensions() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
  }, []);
  return [width, height];
}

const useDimensions = (ref) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const copiedRef = ref;
    const resize = new ResizeObserver((node) => {
      setHeight(node[0]?.contentRect?.height);
      setWidth(node[0]?.contentRect?.width);
    });
    if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
      resize.observe(copiedRef.current);
    }
    return () => {
      if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
        resize.unobserve(copiedRef?.current);
      }
    };
  }, [ref]);
  return [width, height];
};

const useMouse = (ref) => {
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const copiedRef = ref;
    if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
      copiedRef.current.addEventListener("mousemove", (event) => {
        setCoord({ x: event.clientX, y: event.clientY });
      });
    }
    return () => {
      if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
        // copiedRef.current.addEventListener;
      }
    };
  }, [ref]);
  return coord;
};

export { useWindowDimensions, useDimensions, useMouse };

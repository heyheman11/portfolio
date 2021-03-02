import { useEffect, useState, useCallback } from "react";
import { debounce, throttle } from "lodash";

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

  const debouncedFunction = useCallback(
    debounce((node) => {
      setHeight(node[0]?.contentRect?.height);
      setWidth(node[0]?.contentRect?.width);
    }, 350),
    []
  );

  useEffect(() => {
    const copiedRef = ref;
    const resize = new ResizeObserver(debouncedFunction);
    if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
      resize.observe(copiedRef.current);
    }
    return () => {
      if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
        resize.unobserve(copiedRef?.current);
      }
    };
  }, [ref, debouncedFunction]);
  return [width, height];
};

const useMouse = (ref) => {
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  const mouseMoveCallback = useCallback((event) => {
    setCoord({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    const copiedRef = ref;
    if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
      copiedRef.current.addEventListener("mousemove", mouseMoveCallback);
    }
    return () => {
      if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
        copiedRef.current.removeEventListener("mousemove", mouseMoveCallback);
      }
    };
  }, [ref, mouseMoveCallback]);
  return coord;
};

export { useWindowDimensions, useDimensions, useMouse };

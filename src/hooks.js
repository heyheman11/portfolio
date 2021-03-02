import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

/**
 * Captures height and width of window.
 *
 * @returns [width, height]
 */
function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const captureWindow = useCallback(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => captureWindow);
    return () => window.removeEventListener("resize", () => captureWindow);
  }, [captureWindow]);
  return [dimensions.width, dimensions.height];
}

/**
 * Captures height and width of ref. Uses resizeObserver
 * to capture changes in objects size, utilises lodash
 * debounce to reduce number of returns
 *
 * @returns [width, height]
 */
const useDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const debouncedFunction = useCallback(
    debounce((node) => {
      setDimensions({
        height: node[0]?.contentRect?.height,
        width: node[0]?.contentRect?.width,
      });
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
  return [dimensions.width, dimensions.height];
};

/**
 * Captures mouse corrdinates of a given element
 *
 * @returns object of x and y coordinates
 */
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

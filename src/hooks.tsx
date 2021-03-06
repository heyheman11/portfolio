import { useEffect, useState, useCallback } from "react";
import { PartialDOMRect } from "./nav/types";
import { debounce } from "lodash";

/**
 * Captures height and width of window.
 *
 * @returns [width, height]
 */
function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [isResizing, setIsResizing] = useState(false);
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    setIsResizing(true);
    const captureWindow = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setIsResizing(false);
    };
    window.addEventListener("resize", captureWindow);
    return () => window.removeEventListener("resize", captureWindow);
  }, []);

  return { values: [dimensions.width, dimensions.height], isResizing };
}

/**
 * Captures height and width of window. Debpounced version.
 *
 * @returns [width, height]
 */
function useWindowDimensionsDebounced() {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    const captureWindow = debounce(() => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }, 350);
    window.addEventListener("resize", captureWindow);
    return () => window.removeEventListener("resize", captureWindow);
  }, []);

  return [dimensions.width, dimensions.height];
}

/**
 * Captures height and width of ref. Uses resizeObserver
 * to capture changes in objects size, utilises lodash
 * debounce to reduce number of returns
 *
 * @returns [width, height]
 */
const useDimensions = (ref: React.Ref<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
const useMouse = (ref: React.Ref<HTMLElement>) => {
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  const mouseMoveCallback = useCallback((event: MouseEvent) => {
    setCoord({ x: event.clientX, y: event.clientY });
  }, []);

  const touchMoveCallback = useCallback((event: TouchEvent) => {
    event.preventDefault();
    setCoord({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  }, []);

  useEffect(() => {
    const copiedRef = ref;
    if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
      copiedRef.current.addEventListener("mousemove", mouseMoveCallback);
      copiedRef.current.addEventListener("touchmove", touchMoveCallback);
    }
    return () => {
      if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
        copiedRef.current.removeEventListener("mousemove", mouseMoveCallback);
        copiedRef.current.removeEventListener("touchmove", touchMoveCallback);
      }
    };
  }, [ref, mouseMoveCallback, touchMoveCallback]);
  return coord;
};

function useBoundingRect(ref: React.Ref<HTMLElement>): PartialDOMRect {
  const [coord, setCoord] = useState<PartialDOMRect>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const copiedRef = ref;
    if (copiedRef && "current" in copiedRef && copiedRef.current !== null) {
      const {
        x,
        y,
        height,
        width,
      } = copiedRef.current?.getBoundingClientRect() as DOMRect;
      setCoord({ x, y, height, width });
    }
  }, [ref]);

  return coord;
}

export {
  useWindowDimensions,
  useDimensions,
  useMouse,
  useBoundingRect,
  useWindowDimensionsDebounced,
};

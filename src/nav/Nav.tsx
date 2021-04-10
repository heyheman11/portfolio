import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { getX, getY, isCollision, setActive } from "./utils";
import { NAV_BALL_RADIUS } from "./constants";
import { useBoundingRect, useWindowDimensions } from "../hooks";
import "./Nav.css";

function NavigationPip({
  index,
  title,
  navBallCoordinates,
  handleCollision,
}: {
  index: number;
  title: string;
  navBallCoordinates: { x: number; y: number };
  handleCollision: any;
}) {
  const pipRef = useRef<HTMLDivElement>(null);
  const pipCoordinates = useBoundingRect(pipRef);
  const [isHover, setIsHover] = useState(false);

  const navBall = useMemo(
    () => ({
      ...navBallCoordinates,
      height: NAV_BALL_RADIUS,
      width: NAV_BALL_RADIUS,
    }),
    [navBallCoordinates]
  );

  useEffect(() => {
    if (isCollision(navBall, pipCoordinates)) {
      setIsHover(true);
      const timeout = setTimeout(() => {
        if (isCollision(navBall, pipCoordinates)) {
          handleCollision(title);
          setIsHover(false);
        }
      }, 500);
      return () => {
        setIsHover(false);
        clearTimeout(timeout);
      };
    }
  }, [navBall, pipCoordinates, handleCollision, title]);

  return (
    <div
      ref={pipRef}
      key={index}
      className="nav-pip"
      style={{
        transform: `translate3d(${getX(index, 2)}px, ${getY(index, 2)}px, 0)`,
        fontWeight: isHover ? 700 : "inherit",
      }}
    >
      {title}
    </div>
  );
}

function Nav({
  pageRef,
  routes,
  setSelected,
}: {
  pageRef: React.Ref<HTMLElement>;
  routes: Array<string>;
  setSelected: any;
}) {
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [width, height] = useWindowDimensions();
  const [isDragOn, setIsDragOn] = useState(false);
  const moveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageCopy = pageRef;
    const onDragStart = (event: MouseEvent | TouchEvent) => {
      if (moveRef && "current" in moveRef && event.target === moveRef.current) {
        setIsDragOn(true);
        moveRef.current?.style.removeProperty("transition");
      }
    };
    const onDragMouse = (event: MouseEvent) => {
      if (isDragOn) {
        const currentX = event.clientX - initial.x - NAV_BALL_RADIUS;
        const currentY = event.clientY - initial.y - NAV_BALL_RADIUS;
        setCoord({ x: event.clientX, y: event.clientY });
        if (moveRef && "current" in moveRef) {
          moveRef.current?.style.setProperty("--x-position", `${currentX}px`);
          moveRef.current?.style.setProperty("--y-position", `${currentY}px`);
        }
      }
    };
    const onDragTouch = (event: TouchEvent) => {
      const currentX = event.touches[0].clientX - initial.x - NAV_BALL_RADIUS;
      const currentY = event.touches[0].clientY - initial.y - NAV_BALL_RADIUS;
      setCoord({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });

      if (moveRef && "current" in moveRef) {
        moveRef.current?.style.setProperty("--x-position", `${currentX}px`);
        moveRef.current?.style.setProperty("--y-position", `${currentY}px`);
      }
    };
    const onDragEnd = () => {
      setIsDragOn(false);
      setCoord({ x: 0, y: 0 });
      if (moveRef && "current" in moveRef) {
        moveRef.current?.style.setProperty("--x-position", "0px");
        moveRef.current?.style.setProperty("--y-position", "0px");
        moveRef.current?.style.setProperty("transition", "all 0.4s");
      }
    };
    if (pageRef && "current" in pageRef) {
      pageRef.current?.addEventListener("mousedown", onDragStart, false);
      pageRef.current?.addEventListener("mouseup", onDragEnd, false);
      pageRef.current?.addEventListener("mousemove", onDragMouse, false);
      pageRef.current?.addEventListener("touchstart", onDragStart, false);
      pageRef.current?.addEventListener("touchmove", onDragTouch, false);
      pageRef.current?.addEventListener("touchend", onDragEnd, false);
    }
    return () => {
      if (pageCopy && "current" in pageCopy) {
        pageCopy.current?.removeEventListener("mousedown", onDragStart, false);
        pageCopy.current?.removeEventListener("mouseup", onDragEnd, false);
        pageCopy.current?.removeEventListener("mousemove", onDragMouse, false);
        pageCopy.current?.removeEventListener("touchstart", onDragStart, false);
        pageCopy.current?.removeEventListener("touchmove", onDragTouch, false);
        pageCopy.current?.removeEventListener("touchend", onDragEnd, false);
      }
    };
  }, [initial, isDragOn, pageRef]);

  useEffect(() => {
    if (moveRef && "current" in moveRef) {
      const { x, y } = moveRef.current?.getBoundingClientRect() as DOMRect;
      setInitial({ x, y });
    }
  }, [width, height]);

  const handleCollision = useCallback(
    (title: string) => {
      setSelected(title);
    },
    [setSelected]
  );

  const getNavItems = useCallback(() => {
    return routes.map((route, index) => (
      <NavigationPip
        key={index}
        title={route}
        index={index}
        navBallCoordinates={coord}
        handleCollision={handleCollision}
      />
    ));
  }, [coord, routes, handleCollision]);

  return (
    <div className={setActive("nav", isDragOn)}>
      <div className="nav-ball" ref={moveRef}>
        <div className="nav-ball-inner"></div>
      </div>
      <div className="nav-inner">
        {isDragOn ? <div className="nav-options">{getNavItems()}</div> : null}
      </div>
    </div>
  );
}

export { Nav };

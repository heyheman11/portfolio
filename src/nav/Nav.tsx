import React, { useState, useRef, useEffect, useCallback } from "react";
import { getX, getY } from "./utils";
import { NAV_BALL_RADIUS } from "./constants";
import { useBoundingRect } from "../hooks";
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

  useEffect(() => {
    /*
     * Logic taken from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
     */
    if (
      navBallCoordinates.x < pipCoordinates.x + pipCoordinates.width &&
      navBallCoordinates.x + NAV_BALL_RADIUS > pipCoordinates.x &&
      navBallCoordinates.y < pipCoordinates.y + pipCoordinates.height &&
      navBallCoordinates.y + NAV_BALL_RADIUS > pipCoordinates.y
    ) {
      handleCollision(title);
    }
  }, [
    navBallCoordinates.x,
    navBallCoordinates.y,
    pipCoordinates.x,
    pipCoordinates.y,
    pipCoordinates.width,
    pipCoordinates.height,
    handleCollision,
    title
  ]);

  return (
    <div
      ref={pipRef}
      key={index}
      style={{
        transform: `translate3d(${getX(index, 2)}px, ${getY(index, 2)}px, 0)`,
      }}
    >
      {title}
    </div>
  );
}

function Nav({ pageRef, routes, setSelected }: { pageRef: React.Ref<HTMLElement>; routes: Array<string>; setSelected: any }) {
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [isDragOn, setIsDragOn] = useState(false);
  const moveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageCopy = pageRef;
    const onDragStart = (e: MouseEvent) => {
      if (moveRef && "current" in moveRef && e.target === moveRef.current) {
        setIsDragOn(true);
        moveRef.current?.style.removeProperty("transition");
      }
    };
    const onDrag = (event: MouseEvent) => {
      event.preventDefault();
      if (isDragOn) {
        const currentX = event.clientX - initial.x - NAV_BALL_RADIUS;
        const currentY = event.clientY - initial.y - NAV_BALL_RADIUS;
        setCoord({ x: event.clientX, y: event.clientY });
        // subtract half the height of the ball
        if (moveRef && "current" in moveRef) {
          moveRef.current?.style.setProperty("--x-position", `${currentX}px`);
          moveRef.current?.style.setProperty("--y-position", `${currentY}px`);
        }
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
      pageRef.current?.addEventListener("mousemove", onDrag, false);
    }
    return () => {
      if (pageCopy && "current" in pageCopy) {
        pageCopy.current?.removeEventListener("mousedown", onDragStart, false);
        pageCopy.current?.removeEventListener("mouseup", onDragEnd, false);
        pageCopy.current?.removeEventListener("mousemove", onDrag, false);
      }
    };
  }, [initial, isDragOn, pageRef]);

  useEffect(() => {
    if (moveRef && "current" in moveRef) {
      const { x, y } = moveRef.current?.getBoundingClientRect() as DOMRect;
      setInitial({ x, y });
    }
  }, []);

  const handleCollision = useCallback((title: string) => {
    setSelected(title)
  }, [setSelected]);

  const getNavItems = useCallback(() => {
    return routes.map((route, index) => (<NavigationPip
      title={route}
      index={index}
      navBallCoordinates={coord}
      handleCollision={handleCollision}
    />))
  }, [coord, routes, handleCollision]);

  return (
    <div className="nav-outer">
      <div className={`nav-ball${isDragOn ? " selected" : ""}`} ref={moveRef}>
        <div></div>
      </div>
      <div className="nav-inner">
        {isDragOn ? <div className="nav-options">{getNavItems()}</div> : null}
      </div>
    </div>
  );
}

export { Nav };

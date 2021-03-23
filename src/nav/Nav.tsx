import React, { useState, useRef, useEffect, useCallback } from "react";
import { useMouse } from "../hooks";
import { getX, getY } from "./utils";
import "./Nav.css";
import { useInView } from "react-intersection-observer";

function NavigationPip({
  index,
  title,
  moveRef,
}: {
  index: number;
  title: string;
  moveRef: any;
}) {
  const pipRef = useRef<HTMLDivElement>(null);
  // const { ref, inView, entry } = useInView({ root: moveRef?.current });

  // console.log("inView", inView, "entry", entry);

  // useEffect(() => {
  //   if (pipRef && "current" in pipRef) {
  //     console.log(pipRef.current?.getBoundingClientRect());
  //   }
  // }, []);

  return (
    <div
      // ref={ref}
      key={index}
      style={{
        transform: `translate3d(${getX(index, 2)}px, ${getY(index, 2)}px, 0)`,
      }}
    >
      {title}
    </div>
  );
}

function Nav({ pageRef }: { pageRef: React.Ref<HTMLElement> }) {
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [isDragOn, setIsDragOn] = useState(false);
  const { x, y } = useMouse(pageRef);
  const moveRef = useRef<HTMLDivElement>(null);

  // const

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
        // subtract half the height of the ball
        const currentX = event.clientX - initial.x - 20;
        const currentY = event.clientY - initial.y - 20;
        if (moveRef && "current" in moveRef) {
          moveRef.current?.style.setProperty("--x-position", `${currentX}px`);
          moveRef.current?.style.setProperty("--y-position", `${currentY}px`);
        }
      }
    };
    const onDragEnd = () => {
      setIsDragOn(false);
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

  const getNavItems = useCallback(() => {
    return (
      <>
        <NavigationPip title={"Home"} index={0} moveRef={moveRef} />
        <NavigationPip title={"Home"} index={1} moveRef={moveRef} />
      </>
    );
  }, []);

  return (
    <div className="nav-outer">
      <div className={`nav-ball${isDragOn ? " selected" : ""}`} ref={moveRef}>
        <div></div>
      </div>
      <div className="nav-inner">
        {isDragOn || true ? (
          <div className="nav-options">{getNavItems()}</div>
        ) : null}
      </div>
    </div>
  );
}

export { Nav };

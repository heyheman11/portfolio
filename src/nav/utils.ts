import { MAIN_CIRCLE_RADIUS } from "./constants";
import { PartialDOMRect } from "./types";

export const getX = (i: number, length: number) => {
  const position = (i + 1) / (length + 1);
  const angle = position * 180 + 270;
  const radian = angle * (Math.PI / 180);
  let answer = Math.cos(radian) * MAIN_CIRCLE_RADIUS;
  return Math.ceil(answer);
};

export const getY = (i: number, length: number) => {
  const position = (i + 1) / (length + 1);
  const angle = position * 180 + 270;
  const radian = angle * (Math.PI / 180);
  const answer = Math.sin(radian) * MAIN_CIRCLE_RADIUS;
  return Math.ceil(answer);
};

/*
 * Logic taken from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 */
export const isCollision = (
  first: PartialDOMRect,
  second: PartialDOMRect
): boolean => {
  return (
    first.x < second.x + second.width &&
    first.x + first.width > second.x &&
    first.y < second.y + second.height &&
    first.y + first.height > second.y
  );
};

export const setActive = (baseClass: string, isActive: boolean) => {
  return [baseClass, isActive && `${baseClass}--active`]
    .filter((item) => !!item)
    .join(" ");
};

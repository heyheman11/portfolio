import { MAIN_CIRCLE_RADIUS } from "./constants";

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

export const isCollision = () => {}
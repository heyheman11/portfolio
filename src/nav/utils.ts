const RADIUS = 100;

export const getX = (i: number, length: number) => {
  const position = (i + 1) / (length + 1);
  const angle = position * 180 + 270;
  const radian = angle * (Math.PI / 180);
  let answer = Math.cos(radian) * RADIUS;
  return Math.ceil(answer);
};

export const getY = (i: number, length: number) => {
  const position = (i + 1) / (length + 1);
  const angle = position * 180 + 270;
  const radian = angle * (Math.PI / 180);
  const answer = Math.sin(radian) * RADIUS;
  return Math.ceil(answer);
};

export const setActive = (baseClass: string, isActive: boolean) => {
  return [baseClass, isActive && `${baseClass}--active`]
    .filter((item) => !!item)
    .join(" ");
};

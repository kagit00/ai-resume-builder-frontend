export const areAllFieldsFilled = (obj) => {
  console.log(obj)
  const areFilled = Object.values(obj).every(value => value.trim() !== '');
  return areFilled;
};
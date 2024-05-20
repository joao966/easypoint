export const serializePostAme = (dataset) => {
  const result = dataset.map((element) => ({
    ...element,
    bonusScheduledDate: '',
    isReceiveCash: true,
  }));
  return result;
};

export const getNumCols = (width: number, isMapHidden: boolean) => {
  if (isMapHidden) {
    if (width > 1660) return 5;
    if (width > 1360) return 4;
    if (width > 1060) return 3;
    if (width > 744) return 2;
    return 1;
  }

  if (width > 1440) return 3;
  if (width > 600) return 2;
  return 1;
};

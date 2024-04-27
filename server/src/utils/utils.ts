export const convertData = (arr: any[]) => {
  return Object.keys(arr[0]).map((c: string) => {
    return { nameCol: c, value: arr[0][c] };
  });
};
export const convertMultiData = (arr: any[]) => {
  const getKey = Object.keys(arr[0]);
  const formatData = arr.map((a: any) => {
    return getKey.map((k: string) => {
      return {
        nameCol: k,
        value: a[k],
      };
    });
  });
  return formatData;
};

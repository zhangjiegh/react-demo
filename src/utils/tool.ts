export const getParams = (url: string) => {
  const keyValueArr = url.split("?")[1].split("&");
  const paramObj: any = {};
  keyValueArr.forEach(item => {
    const keyValue = item.split("=");
    const a = keyValue[0];
    const b = keyValue[1];
    paramObj[a] = b;
  });
  return paramObj;
};
export default getParams;

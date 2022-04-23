// 处理单位
export const handleCompany = (val: string | number) => {
  const type = Object.prototype.toString.call(val);
  if (type === '[object Number]') {
    return val + 'px';
  } else {
    return val;
  }
};

export const stringToColor = (inputString: string): string => {
  let hash = 0;
  if (inputString.length === 0) return hash.toString();
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return String(color);
};

export const stringToTextColor = (hash: string) => {
  const num = parseInt(hash.replace("#", ""), 16);
  return num < 5000000 ? "white" : "black";
};

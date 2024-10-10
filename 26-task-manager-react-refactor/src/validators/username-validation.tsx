export const UsernameValidation = (value: string) => {
  return value.length >= 5 ? "" : "Username length must be more then 5";
};

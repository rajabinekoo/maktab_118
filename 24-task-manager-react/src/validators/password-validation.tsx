export const PasswordValidation = (value: string) => {
  return value.length >= 8 ? "" : "Username length must be more then 8";
};

type email = `${string}@gmail.com`;
type vehicle = { color: string; wheelsCount: number };
type person = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
};

// https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype
// Utility Types:
type user = Omit<person, "avatar"> & {
  email?: email;
  username: string;
  avatar?: string;
};

type pureUser = {
  id: number;
  email?: email;
  username: string;
  avatar?: string;
};

type countingObject = { [key: string]: number };

// id -> user
type usersCounting = { [key: number]: pureUser };

interface IUser {
  id: string;
  username: string;
  password: string;
}

interface ISession {
  id: string;
  userId: string;
  token: string;
  expiration: number;
}

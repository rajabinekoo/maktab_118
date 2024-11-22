interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface ISession {
  id: string;
  userId: string;
  token: string;
  expiration: number;
}

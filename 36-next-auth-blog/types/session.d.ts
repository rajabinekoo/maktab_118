interface INextAuthProvider {
  id: string;
  type: string;
  name: string;
  signinUrl: string;
  callbackUrl: string;
}

interface ICustomSession extends Session {
  accessToken: string;
}

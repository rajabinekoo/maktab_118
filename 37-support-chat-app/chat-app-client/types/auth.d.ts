interface ILoginResDto {
  access_token: string;
}

interface ILoginReqDto {
  refresh_token: string;
}

interface ISignupReqDto {
  email: string;
}

interface ISignupResDto {
  access_token: string;
  refresh_token: string;
}

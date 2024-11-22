import { LoginBtn } from "@/components/login-btn";
import { cookies } from "next/headers";

export default async function Home() {
  const cookie = await cookies();
  console.log("[!] sessions", cookie.get("sessions"));

  return (
    <>
      <LoginBtn />
    </>
  );
}

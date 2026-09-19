import { auth } from "@/auth";
import SignOut from "../../components/sign-out";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>Profile</h1>
      <p>User name : {session.user.name}</p>
      <p>Email : {session.user.email}</p>
      <SignOut />
    </main>
  );
}
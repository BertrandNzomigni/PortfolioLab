import SignOut from "../components/sign-out";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/")
  }
  return (
    <main>
      <h1>Welcome {session.user.name} to the main menu of Portfoliolab.</h1>
      <SignOut />
    </main>
  );
}
import { auth } from "@/auth";
import userExist from "@/app/actions/userexist";
import createUser from "@/app/actions/createuser";


export default async function Home() {
  const session = await auth();
  
  userExist(session.user.email).then( (result) => {
    if (!result){
      createUser();
    }
  });

  return (
    <main>
      <h1>Welcome {session.user.name} to PortfolioLab.</h1>
    </main>
  );
}
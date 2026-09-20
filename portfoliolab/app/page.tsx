import SignIn from "@/app/components/sign-in";

export default function Home() {
  return (
    <main>
      <div style={{alignItems: 'center',marginLeft: '16em',marginTop:'16em'}}>
        <h1 style={{fontSize: 50}} >PortfolioLab</h1>
        <div style={{marginLeft: '12%'}}>
          <SignIn/>
        </div>
      </div>
    </main>
  );
}

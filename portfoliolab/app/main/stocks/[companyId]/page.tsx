type PageProps = {
  params: Promise<{
    companyId: string
  }>
}

import { prisma } from "@/lib/prisma";
import currentUserMoney from "@/app/actions/currentUserMoney";
import Transaction from "@/app/components/transaction";
import ownershipQuantity from "@/app/actions/ownership";
import userId from "@/app/actions/userId";
import { auth } from "@/auth";
import GoBackButton from "@/app/components/goBackButton";
import { companyLastestPrice } from "@/app/actions/companyPrice";

export default async function Page({ params }: PageProps) {
  const { companyId } = await  params;
  const session = await auth();

  const company = await prisma.company.findUnique({
    where: { id: parseInt(companyId) },
    select: { name: true, stockPrices: true },
  });

  if (!company) {
    return <h1>Company not found</h1>;
  }

  const money = (await currentUserMoney());
  const stock_price = await companyLastestPrice(parseInt(companyId));

  return(<div>
    <h1>Transaction page of {company.name}</h1>
    <div>You have {money.toString()}$ available to invest.</div>
    <p> You own {await ownershipQuantity((await userId(session.user.email)), parseInt(companyId))} stocks of {company.name}. </p>
    <p> The price of each stock is {stock_price.toString()}$. </p>
    <Transaction companyid={parseInt(companyId)} companyName={company.name} />
    <GoBackButton></GoBackButton>
    </div>)
}
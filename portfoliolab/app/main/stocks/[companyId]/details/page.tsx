
type PageProps = {
  params: Promise<{
    companyId: string
  }>
}
import GoBackButton from "@/app/components/goBackButton";
import { companyName, companySector, companySubindustry, companyHeadquarter, companyFoundationYear } from "@/app/actions/companyField";


export default async function Page({ params }: PageProps) {

  const companyId = Number(await (await params).companyId);

  return (
    <div>
      <h1>Details page</h1>
      <p>Company : {companyName(companyId)}</p>
      <p>Sector : {await companySector(companyId)}</p>
      <p>Subindustry : {await companySubindustry(companyId)}</p>
      <p>Headquarters : {await companyHeadquarter(companyId)}</p>
      <p>Foundation Year : {await companyFoundationYear(companyId)}</p>
      <GoBackButton />
    </div>
  );

}
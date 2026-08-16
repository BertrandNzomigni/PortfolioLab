import { prisma } from "../../lib/prisma";

async function Company_data(){
    const companies = await prisma.company.findMany({
        select: {
            id: true,
            name: true,
            stockPrices: {
                orderBy: {
                    datetime: "desc",
                },
                take: 1,
                select: {
                    id: true,
                    closePrice: true,
                    datetime: true,
                },
            },
        },
    });
    return (
        <tbody>
            {companies.slice(0,60).map((company) => {
                const latestPrice = company.stockPrices[0];

                return(
                    <tr key={company.id}>
                        <th>{company.name}</th><th>{latestPrice.closePrice.toNumber()}</th>
                    </tr>
                )
            })}
        </tbody>
    );
}

export { Company_data }
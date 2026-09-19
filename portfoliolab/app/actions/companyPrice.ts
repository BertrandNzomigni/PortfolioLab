import { prisma } from "@/lib/prisma";

export default async function companyLastestPrice(companyId : number){
    const companies = await prisma.company.findMany({
        where : { id : companyId },
        select : {
            stockPrices: {
                orderBy: {
                    datetime: "desc"
                },
                take : 1,
                select: {
                    closePrice: true
                }
            }
        }

    })
    return companies[0].stockPrices[0].closePrice;
}
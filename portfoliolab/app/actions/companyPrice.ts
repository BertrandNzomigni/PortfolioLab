import { prisma } from "@/lib/prisma";

async function companyLatestPrice(companyId : number){
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

async function companyPrices(quantity : number, firstPricePos : number, companyId : number){
    return await prisma.stockPrice.findMany({
        where : { companyId : companyId },
        select : {
            id : true,
            datetime: true,
            closePrice: true,
            highPrice: true,
            lowPrice: true,
            openPrice: true
        },
        skip: firstPricePos,
        take: quantity,
        orderBy: {
            datetime: 'desc'
        }
    })

}

async function weeklyCompanyPrices(quantity : number, firstPricePos : number, companyId : number){
    let counter = quantity;
    let result_prices = [];
    let pos = firstPricePos;
    while (counter > 0){
        let visible_prices = await companyPrices(20,pos,companyId);
        result_prices.push(visible_prices[0]);
        let current_day = visible_prices[0].datetime.getDate() + visible_prices[0].datetime.getMonth() * 31
        let i = 1;
        while (i < 10){
            if ((visible_prices[i].datetime.getDate() + visible_prices[i].datetime.getMonth() * 31) <= current_day - 7 ){
                pos = pos + i
                i = 10
            }
            i = i + 1
        }
        counter = counter - 1;
    }
    return result_prices;
}

export { companyLatestPrice as companyLastestPrice, companyPrices, weeklyCompanyPrices }
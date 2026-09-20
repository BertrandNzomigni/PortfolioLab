import { companyPrices, weeklyCompanyPrices } from "../actions/companyPrice";

export default async function PriceHistory({companyId} : {companyId : number}){
    const prices = await weeklyCompanyPrices(20,0,companyId);
    console.log(prices);

    return (
        <tbody>
            {prices.map((price) => {
                let date = price.datetime.toDateString();
                return(
                    <tr key={price.id}>
                        <th>{date}</th><th>{price.closePrice.toNumber()}$</th><th>{price.highPrice.toNumber()}$</th><th>{price.lowPrice.toNumber()}$</th><th>{price.openPrice.toNumber()}$</th>
                    </tr>
                )
            })}
        </tbody>
    );


}
import { Company_data } from "../components/company_data";

export default async function Home(){

    return(
        <div>
            <h1>Stocks tab</h1>
            <table>
                <thead>
                    <tr>
                        <th>Company</th><th>Close price</th>
                    </tr>
                </thead>
                <Company_data/>
            </table>
        </div>
    )
}


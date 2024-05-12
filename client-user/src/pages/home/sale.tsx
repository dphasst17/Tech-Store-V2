import Product_Layout_01 from "../../pages/product/layout/product_layout_01"
import { StateContext } from "../../context/stateContext"
import { useContext } from "react"
import { formatDate } from "../../utils/utils"

const SaleEvent = () => {
    const { sale } = useContext(StateContext)
    return sale && sale.length && <div className="w-full h-auto min-h-[300px] flex flex-col justify-around items-center">
        {sale?.map((s:any) =>
            <>
                <h1 className="font-honk text-[50px]">{s.title}</h1>
                <span className="font-medium text-[40px] text-center font-honk text-zinc-900">{formatDate(s.start_date)} - {formatDate(s.end_date)}</span>
                <div className="saleDetail w-full lg:w-[95%] h-auto flex flex-wrap justify-around items-center px-8">
                    {
                        s.detail.map((d:any) => <Product_Layout_01 data={d} name="sale"/>)
                    }
                </div>
            </>
        )}
    </div>
}

export default SaleEvent
import { Card, Button, CardBody, Code } from "@nextui-org/react"
import { StateContext } from "../../../context/stateContext"
import { useContext } from "react"
import { Fade } from "react-awesome-reveal"
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ProductType } from "types/type";
const Product_Layout_01 = ({ data,name }: { data: ProductType,name:string }) => {
    const { type } = useContext(StateContext)
    const navigate = useNavigate()
    const navigateDetail = () => {
        navigate(`/product/detail/${data.nameType}/${data.idProduct}`)
    }
    return <Fade triggerOnce fraction={0.6} className="w-[20%] min-w-[200px] m-1 "  delay={1}>
        <Card className="w-full h-auto min-h-[150px] rounded-md border border-solid border-zinc-700">
            <CardBody className="relative w-full h-auto flex flex-col items-center justify-center cursor-pointer">
                <div className="absolute top-0 right-1 w-auto min-w-[80px] text-center font-bold my-1 z-10 bg-zinc-700 rounded-md text-white">
                    ${data.discount !== 0 ? data.price : data.price}
                </div>
                {data.discount !== 0 && <div className="absolute top-0 left-1 w-auto min-w-[80px] text-center font-bold my-1 z-10 bg-red-600 rounded-md text-white">
                    -{data?.discount}%
                </div>}
                <div className="w-full h-[150px]" onClick={navigateDetail}>
                    <img className="w-3/5 h-full mx-auto object-contain" src={`${data.imgProduct}`} alt={`images-${data?.nameProduct}`}/>
                </div>
                <div className="product-info flex flex-wrap justify-center overflow-hidden py-1 rounded-lg w-[calc(100%_-_8px)]">
                    <Code radius="sm" 
                    onClick={navigateDetail}
                    className="w-[90%] h-[25px] flex items-center justify-center bg-zinc-700 text-white text-[18px] truncate cursor-pointer"
                    >
                        <span className="truncate">{data?.nameProduct}</span>
                    </Code>
                    <div className="product-type w-[90%] flex flex-wrap justify-between items-center my-1">
                        <Button size="sm" className="w-[45%] bg-zinc-600 text-white">{data?.brand.toUpperCase()}</Button>
                        <Button size="sm" className="w-[45%] bg-zinc-600 text-white">{data?.nameType.toUpperCase()}</Button>
                    </div>
                    {data?.detail && <div className="info w-[90%] h-auto flex flex-col justify-center my-1">
                        {type?.filter((f: any) => f.nameType === data?.nameType)[0].detail.map((d: any) => d.name).map((k: string) =>
                            <div className="w-full truncate" key={`${name}-${k}-${data.idProduct}`}>
                                <span className="truncate font-semibold">{data?.detail?.map((d: any) => `${[k.toUpperCase()]}:${d[k]}`)}</span>
                            </div>
                        )}
                    </div>}
                    <div className="product-btn w-[90%] flex flex-wrap justify-around">
                        <Button size="sm" className="w-3/4 font-semibold" color="primary">Add to cart</Button>
                        <Button size="sm" className="w-1/5" isIconOnly onClick={navigateDetail}>
                            <TbListDetails className="text-[20px]" />
                        </Button>
                    </div>
                    
                </div>
            </CardBody>
        </Card>
    </Fade>
}

export default Product_Layout_01
import { Card, Button, CardBody, Code } from "@nextui-org/react"
import { StateContext } from "../../context/stateContext"
import { useContext} from "react"
import { Fade } from "react-awesome-reveal"
import { TbListDetails } from "react-icons/tb";
const Product_Layout_01 = ({data}:{data:any}) => {
    const {type} = useContext(StateContext)

    return <Fade triggerOnce fraction={0.6} className="w-[20%] m-1 " direction="up" delay={1}>
             <Card className="w-full h-auto min-h-[150px] border border-solid border-zinc-700">
            <CardBody className="w-full h-auto flex flex-col items-center justify-center">
                <img className="w-3/5 h-full mx-auto object-cover" src="https://atlas-content-cdn.pixelsquid.com/stock-images/gaming-laptop-Q9Bw1n2-600.jpg"/>
                <div className="product-info flex flex-wrap justify-center overflow-hidden py-1 rounded-lg w-[calc(100%_-_8px)]">
                    <Code radius="sm" className="w-[90%] h-[25px] flex items-center justify-center bg-zinc-700 text-white text-[18px] truncate cursor-pointer">
                        <span className="truncate">{data?.nameProduct}</span>
                    </Code>
                    <div className="product-type w-[90%] flex flex-wrap justify-between items-center my-1">
                        <Button size="sm" className="w-[45%] bg-zinc-600 text-white">{data?.brand.toUpperCase()}</Button>
                        <Button size="sm" className="w-[45%] bg-zinc-600 text-white">{data?.nameType.toUpperCase()}</Button>
                    </div>
                    {data?.detail && <div className="info w-[90%] h-auto flex flex-col justify-center">
                        {type?.filter((f:any) => f.nameType === data?.nameType)[0].detail.map((d:any) => d.name).map((k:string) => 
                            <div><span className="truncate font-semibold">{data.detail.map((d:any) => `${[k.toUpperCase()]}:${d[k]}`)}</span></div>
                        )}
                    </div>}
                    <div className="product-btn w-[90%] flex flex-wrap justify-around">
                        <Button size="sm" className="w-3/4 font-semibold" color="primary">Add to cart</Button>
                        <Button size="sm" className="w-1/5" isIconOnly>
                            <TbListDetails className="text-[20px]" />
                        </Button>
                    </div>
                </div>
            </CardBody>
            </Card>
        </Fade>
}

export default Product_Layout_01
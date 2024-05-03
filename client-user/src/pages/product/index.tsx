import { ProductType } from 'types/type';
import { StateContext } from '../../context/stateContext'
import { useContext, useEffect, useState } from 'react'
import Product_Layout_01 from './layout/product_layout_01';
import { Pagination } from '@nextui-org/react';
import { pagination } from '../../utils/utils';
import FilterType from './layout/filterType';

const Product = () => {
    const { product } = useContext(StateContext)
    const [currentType, setCurrentType] = useState<string>("laptop");
    const [currentData, setCurrentData] = useState<ProductType[] | null>(null);
    const [activePage, setActivePage] = useState<number>(1)
    useEffect(() => {
        setActivePage(1)
        product && setCurrentData(product.filter((f: { type: string, data: any[] }) => f.type === currentType)[0].data)
    }, [product, currentType])
    return <div className='product w-full h-auto flex flex-col items-center justify-center'>
        <div className='filter w-[90%] flex flex-wrap my-4 text-zinc-900'>
            {product && <FilterType type={product.map((f: any) => f.type)} currentType={currentType} setCurrentType={setCurrentType} />}
        </div>
        <div className='product-layout w-[90%] h-auto min-h-[760px] flex flex-wrap justify-around content-around'>
            {currentData?.slice((8 * activePage) - 8, 8 * activePage).map((d: ProductType) => <Product_Layout_01 data={d} />)}
        </div>
        {currentData && <Pagination isCompact size="lg" showControls page={activePage} total={pagination(8, currentData.length)} initialPage={1} onChange={(e) => { setActivePage(e) }} />}
    </div>
}

export default Product
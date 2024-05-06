import { PopoverContent } from '@nextui-org/react'
import { CartContext } from '../../context/cartContext'
import { useContext } from 'react'
import { CartType } from 'types/type'
import Product_layout_02 from '../../pages/product/layout/product_layout_02'

const CartDemo = () => {
    const { cart } = useContext(CartContext)
    return <PopoverContent className='bg-zinc-700 text-white'>
        {cart?.slice(0,4).map((c:CartType) => <Product_layout_02 data={c}/>)}
    </PopoverContent>
}

export default CartDemo
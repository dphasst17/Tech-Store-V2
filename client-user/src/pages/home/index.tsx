import { useEffect } from 'react'
import Laptop from './laptop'
import NewProduct from './newProduct'
import Post from './post'
import Slideshow from './slide'

const Home = () => {
  useEffect(() => {
    document.title = "Tech Store"
  },[])
  return <div className='w-full h-auto flex flex-col items-center pt-2'>
    <Slideshow />
    <NewProduct />
    <Laptop/>
    <Post />
  </div>
  
}

export default Home
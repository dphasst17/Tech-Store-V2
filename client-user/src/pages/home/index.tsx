import Laptop from './laptop'
import NewProduct from './newProduct'
import Post from './post'
import Slideshow from './slide'

const Home = () => {
  return <div className='w-full h-auto min-h-screen flex flex-col items-center pt-2'>
    <Slideshow />
    <NewProduct />
    <Laptop/>
    <Post />
  </div>
  
}

export default Home
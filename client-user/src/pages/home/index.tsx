import Laptop from './laptop'
import Slideshow from './slide'

const Home = () => {
  return <div className='w-full h-auto min-h-screen flex flex-col items-center pt-2'>
    <Slideshow />
    <Laptop/>
  </div>
  
}

export default Home
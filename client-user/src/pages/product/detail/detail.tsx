import UiDetail from './ui'
import CommentProduct from './comment'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const DetailProduct = () => {
  const params = useParams()
  useEffect(() => {console.log(params)},[params])
  return <div className="font-[sans-serif] bg-white">
    <UiDetail nameType={params.nameType!} idProduct={Number(params.idProduct)}/>
    <CommentProduct />
  </div>
}

export default DetailProduct
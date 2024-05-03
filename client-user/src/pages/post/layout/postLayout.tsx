import { useNavigate } from 'react-router-dom'
import { PostType } from 'types/type'

const PostLayout = ({data}:{data:PostType}) => {
    const navigate = useNavigate()
  return <div onClick={() => {navigate(`/post/detail/${data.idPost}/${data.title}`)}}
  className="flex flex-col flex-wrap mb-0 overflow-hidden rounded lg:flex-row dark:bg-gray-700 cursor-pointer" key={data.idPost}>
      <div className="relative w-full overflow-hidden lg:w-2/4 h-80">
          <img className="object-cover w-full h-full transition-all hover:scale-110"
              src={data.thumbnails} alt="" />
      </div>
      <div
          className="relative w-full flex self-center flex-1 p-8 ml-0  border rounded shadow border-zinc-700 bg-zinc-800 lg:items-center lg:-ml-12">
          <div>
              <span className="block mb-2 text-xs font-semibold text-blue-700 uppercase dark:text-blue-300">
                  {data.dateAdded.split("T")[0].split("-").reverse().join("/")}
              </span>
              <h2 className="mb-3 text-2xl font-bold leading-9 text-black dark:text-white">
                  {data.title}
              </h2>
              <span className="px-4 py-2 text-xs text-white bg-blue-500 rounded top-4 left-4">
                  {data.poster}
              </span>
              <span className="px-4 py-2  mx-2 text-xs text-white bg-blue-500 rounded top-4 left-4">
                  {data.nameType}
              </span>
          </div>
      </div>
  </div>
}

export default PostLayout
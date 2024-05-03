import { useParams } from "react-router-dom"
import 'react-quill/dist/quill.snow.css';// import styles
import "highlight.js/styles/monokai-sublime.min.css"; 
import { useFetchDataByKey } from "../../hooks/useFetchData";
/* import { useEffect } from "react"; */
const PostsDetail = () => {
    const param = useParams()
    const {data} = useFetchDataByKey('posts','postGetDetail',Number(param.idPost))

    return <div className="PostsDetail w-4/5 h-auto min-h-[90vh] mx-auto my-10">
        {data !== null && data.data.map((e:any) => <div className="ql-snow" key={e.idPost}>
            <div className={`ql-editor text-slate-700 bg-transparent`} dangerouslySetInnerHTML={{ __html: e.valuesPosts }} />
        </div>)}
    </div>

}
export default PostsDetail
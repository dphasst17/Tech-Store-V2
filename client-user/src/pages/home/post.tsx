import { Fade } from 'react-awesome-reveal'
import { StateContext } from '../../context/stateContext'
import { useContext } from 'react'
import PostLayout from '../post/layout/postLayout'
import { PostType } from '../../types/type'

const Post = () => {
    const { post } = useContext(StateContext)
    return <section className="flex items-center w-full h-auto min-h-[80vh]">
        <div className="p-4 mx-auto w-[90%] h-auto">
            <div className="w-full flex flex-wrap justify-around content-around">
                {post?.slice(0, 4).map((e: PostType) => <Fade 
                className='w-full sm:w-4/5 xl:w-[45%] my-1'
                triggerOnce direction='up' fraction={0.7}>
                    <PostLayout data={e} />
                </Fade>)}
            </div>
        </div>
    </section>
}

export default Post
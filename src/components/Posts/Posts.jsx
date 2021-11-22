import Post from "./Post/Post";
import { useContext } from "react";
import { PostsContext } from "../../contexts/PostsContext";
import { useHistory } from "react-router-dom";

export default function Posts() {
    
    const {postsRef} =  useContext(PostsContext)
    const history = useHistory();


    return (  
        <div className="Posts">
            <button className="Add-Post-Button" type="button" onClick={() => { history.push('/posts/new') } }>Add new post</button>
        
            {postsRef.current.map(post=> {
                return(
                        <Post {...post} key={post.id}/>
                )
            })}
        </div>
        
    )

}
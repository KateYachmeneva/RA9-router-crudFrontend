import {useEffect, useState, useRef} from 'react';
import createRequest from '../api/createRequest';
import { PostsContext } from './PostsContext';

export default function PostsProvider(props) {
    const postsRef = useRef();
    const [loading, setLoading] = useState(true);

    const updatePosts = () => {
        setLoading(true);
        createRequest('/')().then(result=> {
            postsRef.current = result;
            setLoading(false);
        });
    }

    useEffect(() => {
        updatePosts();
    },[])

    const getPost = (id) => {
        const post = postsRef.current.find(p => (p.id === Number(id)));
        return post;
    }

    const handleDelete = (id) => {
        setLoading(true)
        const deletePost = createRequest(`/${id}`,'DELETE');
        deletePost().then(() => updatePosts())
    }

    const handleEdit = (post) => {
        setLoading(true)
        const editPost = createRequest(`/`, 'POST', post);
        editPost().then(() => updatePosts())
    }
    if (!loading) return ( <PostsContext.Provider value={{postsRef, loading, getPost, handleDelete, handleEdit}}>
        {props.children}
    </PostsContext.Provider>
    ) 

    else return (
        <div className="Loading">Loading...</div>
    )
}
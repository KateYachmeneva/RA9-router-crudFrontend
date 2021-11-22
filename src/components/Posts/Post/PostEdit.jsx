import useStorage from "../../../hooks/useStorage";
import { PostsContext } from "../../../contexts/PostsContext";
import React, { createRef, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function PostEdit(props) {
    const {getPost, handleEdit} = useContext(PostsContext);
    const inputRef = createRef();
    const location = useLocation();
    const history = useHistory();
    const isNew = location.pathname.match(/.*\/new/) ? true : false
    const [currentPost, setCurrentPost] = useStorage(localStorage, 'post', true);

    useEffect(()=> {
        if (!isNew) {
            inputRef.current.value = getPost(props.match.params.id).content
        } else {     
            inputRef.current.value = currentPost
        } 
    },[props.match.params.id, isNew, inputRef, currentPost, getPost])

    const handleChange = (e) => {
        e.preventDefault();
        if (isNew) setCurrentPost(inputRef.current.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = (isNew) ? 0 : props.match.params.id
        handleEdit({id, content: inputRef.current.value});
        setCurrentPost(null)
        history.push(`/posts/`);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        if (isNew) history.push('/posts/')
        else history.goBack()
    }

    return (
        <React.Fragment>
            <form className="Post-Edit" onSubmit={handleSubmit} >
                <h1 className="Post-Edit-Name">{isNew ? `Create post` : `Edit post`}</h1>
                <textarea className="Post-Content" required id="postContent" onChange={handleChange} ref={inputRef}>
                </textarea>
                <button className="Save-Post-Button" type="submit">{isNew ? `Create` : `Save`}</button>
                <button className="Cancel-Button" type="button" onClick={handleCancel}>✖</button>
            </form>
        </React.Fragment>
    )






}
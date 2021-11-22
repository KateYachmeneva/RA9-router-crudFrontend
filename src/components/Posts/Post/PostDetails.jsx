import React, { useContext } from "react";
import Post from './Post'
import { PostsContext } from "../../../contexts/PostsContext";
import { useHistory } from "react-router-dom";

export default function PostDetails({match}) {
    const {getPost, handleDelete } = useContext(PostsContext)
    const post = getPost(match.params.id)
    const history = useHistory();
    const onDelete = (e) => {
        e.preventDefault();
        handleDelete(post.id)
        history.push(`/posts/`)
    }

    const onEdit = (e) => {
        e.preventDefault();
        history.push(`${post.id}/edit`)
    }
        return (
        <div className="Post-Details">
            <Post {...post}/>
            <div className="Post-controls">
                <button className="Post-delete" onClick={onDelete}>Delete</button>
                <button className="Post-edit" onClick={onEdit}>Edit</button>
            </div>
        </div>
    )}
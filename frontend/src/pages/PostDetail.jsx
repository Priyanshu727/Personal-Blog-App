import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    // useCallback ensures that fetchPost function reference stays the same unless dependencies change
    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/posts/${id}`);
            setPost(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }, [id]); // Dependency array includes id

    useEffect(() => {
        fetchPost();
    }, [fetchPost]); // Dependency array now includes fetchPost

    if (!post) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="card post-card">
                <div className="card-body">
                    <h1 className="card-title display-4 mb-4">{post.title}</h1>
                    <p className="card-text lead">{post.content}</p>
                    <p className="card-text text-muted">
                        Posted on: {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;

import { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from './PostForm'; 
import { Link } from 'react-router-dom';
import styles from './post.module.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/posts');
            setPosts(response.data.data); 
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/posts/${id}`);
            fetchPosts(); 
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    useEffect(() => {
        fetchPosts(); 
    }, []);

    return (
        <div className="container mt-5">
            <img src="../../DEO.gif" alt="DEO>gif" width="80px" />
            <PostForm fetchPosts={fetchPosts} />
            <div className="row">
                {posts.map(post => (
                    <div key={post._id} className="col-md-4 mb-4"> 
                        <div className="border p-3 rounded shadow-sm h-100">
                            <h2 className="h5">
                                <Link
                                    to={`/posts/${post._id}`}
                                    className={`${styles['post-title']} text-decoration-none text-dark`} 
                                >
                                    {post.title}
                                </Link>
                            </h2>
                            <p>{post.content}</p>
                            <button
                                onClick={() => deletePost(post._id)}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;

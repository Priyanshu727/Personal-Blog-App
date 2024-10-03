import { useState } from 'react';
import axios from 'axios';

const PostForm = ({ fetchPosts }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/api/posts', { title, content });
            fetchPosts(); 
            setTitle(''); 
            setContent(''); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded border shadow mb-5">
            <h2 className="h4 mb-4">Create a New Post</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Create Post
            </button>
        </form>
    );
};

export default PostForm;

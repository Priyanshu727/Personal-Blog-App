import PostList from '../components/PostList';
// import PostForm from '../components/PostForm';

const Home = () => {
    return (
        <div className="container my-4">
            <h1 className="text-danger"> My Blog
            </h1>
            {/* <PostForm /> */}
            <PostList />
        </div>
    );
};

export default Home;

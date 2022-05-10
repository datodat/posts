import Post from '../post/Post';
// Css
import './home.css';

const Home = ({ user, posts, editPostHandler, deleteHandler, refForPost }) => {

  return (
    <div className='home'>
      {posts.length > 0 ?
        posts.map(i => {
          return (
            <Post 
              key={i.id} 
              data={i} 
              user={user} 
              editPostHandler={editPostHandler} 
              deleteHandler={deleteHandler}
              ref={refForPost}
            />
          );
        }) :
        <p>No posts</p>
      }
    </div>
  );
}

export default Home;
import { useState } from 'react';
import LoadingSpinner from '../../component/common/LoadingSpinner';
import Post from '../../component/common/Post';
import MainSort from '../../component/main/MainSort';
import useIntersect from '../../hooks/useIntersect';

function AllThemePage() {
  const [isPending, setIsPending] = useState(true);
  const [posts, setPosts] = useState([]);
  const target = useIntersect('/boards?', 20, setPosts, setIsPending, 1);

  return (
    <>
      <MainSort />
      <div className="main__container">
        {posts.map(post => {
          return <Post key={post.boardId} post={post} />;
        })}
        <div ref={target} className="target">
          {isPending && <LoadingSpinner />}
        </div>
      </div>
    </>
  );
}

export default AllThemePage;

import { useState } from 'react';
import Post from '../../component/common/Post';
import MainSort from '../../component/main/MainSort';
import useIntersect from '../../hooks/useIntersect';

function StayPage() {
  const [isPending, setIsPending] = useState(true);
  const [posts, setPosts] = useState([]);
  const target = useIntersect(
    '/boards?category=STAY&',
    20,
    setPosts,
    setIsPending,
    1,
  );
  console.log(isPending);

  return (
    <>
      <MainSort />
      <div className="main__container">
        {posts.map(post => {
          return <Post key={post.boardId} post={post} />;
        })}
        <div ref={target} className="target" />
      </div>
    </>
  );
}

export default StayPage;

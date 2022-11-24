import { useState } from 'react';
import Post from '../../component/common/Post';
import MainSort from '../../component/main/MainSort';
import useIntersect from '../../hooks/useIntersect';

function RestaurantPage() {
  const [isPending, setIsPending] = useState(true);
  const [posts, setPosts] = useState([]);
  const target = useIntersect(
    '/boards?category=RESTAURANT&',
    20,
    setPosts,
    setIsPending,
    1,
  );

  return (
    <>
      <MainSort />
      <div className="main__container">
        {posts.map(post => {
          return <Post key={post.boardId} post={post} />;
        })}
        <div ref={target} className="target">
          {isPending && <div>로딩중..</div>}
        </div>
      </div>
    </>
  );
}

export default RestaurantPage;

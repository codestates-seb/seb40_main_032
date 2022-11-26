import { useEffect, useState } from 'react';
import LoadingSpinner from '../../component/common/LoadingSpinner';
import Post from '../../component/common/Post';
import MainSort from '../../component/main/MainSort';
import useIntersect from '../../hooks/useIntersect';

function RestaurantPage() {
  const [isPending, setIsPending] = useState(true);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('createdAt,desc');
  const [target, page, hasNext] = useIntersect(
    '/boards?category=RESTAURANT&',
    20,
    setPosts,
    setIsPending,
    0.7,
    sort,
  );

  const sortHandler = sorted => {
    console.log(sorted);
    setSort(sorted);
    target.current.style.display = 'flex';
    page.current = 1;
    setPosts([]);
  };

  useEffect(() => {
    hasNext(true);
  }, [sort]);
  return (
    <>
      <MainSort sortHandler={sortHandler} />
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

export default RestaurantPage;

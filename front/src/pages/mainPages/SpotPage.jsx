import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../component/common/LoadingSpinner';
import Post from '../../component/common/Post';
import MainSort from '../../component/main/MainSort';
import useIntersect from '../../hooks/useIntersect';

function SpotPage() {
  const [isPending, setIsPending] = useState(true);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('createdAt,desc');
  const search = useSelector(state => state.search.search);

  console.log(`search ${search} SPOT! 변경 감지!!`);
  const [target, page, hasNext] = useIntersect(
    '/boards?category=SPOT&',
    search,
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
  }, [sort, search]);

  useEffect(() => {
    if (search) {
      sortHandler('createdAt,desc');
    }
  }, [search]);

  return (
    <>
      <MainSort sort={sort} sortHandler={sortHandler} />
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

export default SpotPage;

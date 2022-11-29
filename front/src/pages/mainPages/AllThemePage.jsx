import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../../component/common/LoadingSpinner';
import Post from '../../component/common/Post';
import MainSort from '../../component/main/MainSort';
import useIntersect from '../../hooks/useIntersect';
import { searchActions } from '../../redux/searchSlice';

function AllThemePage() {
  const { pathname } = useLocation();
  const { search, path, memorySort } = useSelector(state => state.search);
  const dispatch = useDispatch();
  console.log(`ALL pathname : ${pathname} path : ${path}`);

  const [isPending, setIsPending] = useState(true);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState(
    pathname === path ? memorySort : 'createdAt,desc',
  );

  const [target, hasNext, setLastData] = useIntersect(
    '/boards?',
    search,
    20,
    setPosts,
    setIsPending,
    0.7,
    sort,
  );

  const sortHandler = sorted => {
    console.log(sorted);
    if (sort !== sorted) {
      setSort(sorted);
    }
    if (posts.length !== 0) {
      setPosts([]);
    }
    setLastData('');
    target.current.style.display = 'flex';
  };

  useEffect(() => {
    hasNext(true);
  }, [sort, search]);

  useEffect(() => {
    sortHandler(sort);
  }, [search]);

  useEffect(() => {
    return () => {
      dispatch(searchActions.setSort(sort));
      dispatch(searchActions.setPath(pathname));
    };
  }, [sort]);

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

export default AllThemePage;

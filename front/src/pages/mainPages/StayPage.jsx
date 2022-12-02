import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../../component/common/LoadingSpinner';
import Post from '../../component/common/Post';
import MainSort from '../../component/main/MainSort';
import useIntersect from '../../hooks/useIntersect';
import { searchActions } from '../../redux/searchSlice';

function StayPage() {
  const { pathname } = useLocation();
  const { search, path, memorySort } = useSelector(state => state.search);
  const dispatch = useDispatch();

  const [isPending, setIsPending] = useState(true);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState(
    pathname === path ? memorySort : 'createdAt,desc',
  );

  console.log(`search ${search} STAY  변경 감지!!`);
  const [target, hasNext, setLastData] = useIntersect(
    '/boards?category=STAY&',
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
      <div className="search__sort">
        {search && (
          <div className="search__result">
            검색결과 : {search === '' ? '없음' : `"${search}"의 검색`}
          </div>
        )}
        <MainSort sort={sort} sortHandler={sortHandler} />
      </div>
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

export default StayPage;

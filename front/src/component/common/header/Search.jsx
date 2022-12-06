import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { searchActions } from '../../../redux/searchSlice';

const SearchWrapper = styled.div`
  width: 100%;
  max-width: 70rem;
  .search__container {
    position: relative;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  height: 4.3rem;
  width: 100%;
  border-radius: var(--radius-50);
  border: 1px solid var(--font-base-grey);
  padding-left: 2rem;
  padding-right: 5rem;
  outline: none;
  @media screen and (max-width: 549px) {
    height: 3.5rem;
  }
  :focus {
    box-shadow: 0px 0px 2px 2px rgb(64 191 119 / 25%);
    border: 1px solid var(--button-theme);
    transition: all 0.2s;
  }
`;

const SearchIcon = styled(BiSearchAlt)`
  position: absolute;
  top: 1rem;
  right: 2rem;
  cursor: pointer;
  @media screen and (max-width: 549px) {
    width: 2.2rem;
    height: 2.2rem;
    top: 0.7rem;
    right: 1.5rem;
  }
`;

function Search() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sliceSearch = useSelector(state => state.search.search);
  const [search, setSearch] = useInput(sliceSearch);
  const dispatch = useDispatch();
  const searchDispatchHandler = () => {
    dispatch(searchActions.setSearch(search));
    if (
      pathname !== '/' &&
      pathname !== '/restaurant' &&
      pathname !== '/stay' &&
      pathname !== '/spot'
    ) {
      dispatch(searchActions.setPath('/'));
      dispatch(searchActions.setSort('createdAt,desc'));
      navigate('/');
    }
  };

  return (
    <SearchWrapper>
      <div className="search__container">
        <SearchInput
          value={search}
          onChange={setSearch}
          onKeyUp={e => {
            if (e.code === 'Enter') {
              searchDispatchHandler();
            }
          }}
        />
        <SearchIcon
          size="2.5rem"
          color="hsl(146, 50%, 50%)"
          onClick={searchDispatchHandler}
        />
      </div>
    </SearchWrapper>
  );
}

export default Search;

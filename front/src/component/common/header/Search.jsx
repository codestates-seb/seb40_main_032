import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';

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
  @media screen and (max-width: 549px) {
    height: 3.5rem;
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
  return (
    <SearchWrapper>
      <div className="search__container">
        <SearchInput />
        <SearchIcon size="2.5rem" color="hsl(146, 50%, 50%)" />
      </div>
    </SearchWrapper>
  );
}

export default Search;

import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';

const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 3;
  max-width: 70rem;
  margin: 0 auto;
  .search__container {
    position: relative;
    top: 1.5rem;
    left: 5px;
  }
  @media screen and (max-width: 549px) {
    max-width: 25rem;
    .search__container {
      left: 0;
    }
  }
`;

const SearchInput = styled.input`
  height: 5rem;
  width: 100%;
  margin: auto;
  border-radius: var(--radius-50);
  border: 1px solid var(--font-base-grey);
  padding-left: 2rem;
  padding-right: 5rem;
`;

const SearchIcon = styled(BiSearchAlt)`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  cursor: pointer;
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

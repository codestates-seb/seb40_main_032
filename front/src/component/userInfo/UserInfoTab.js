import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';

const Container = styled.div`
  color: var(--font-base-black);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Tab = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 10px;
  &.isActive,
  &:hover {
    transition: 0.3s linear;
    border-bottom: 2px solid var(--font-base-grey);
  }
`;

const CircleIcon = styled.div`
  background-color: var(--font-tag-color);
  color: var(--base-white-color);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const HeartIcon = styled(AiFillHeart)`
  color: var(--font-tag-color);
  width: 3rem;
  height: 3rem;
`;

function UserInfoTab() {
  const [isActive, setIsActive] = useState(false);

  // 임시 데이터
  const [posts] = useState(['내글1', '내글2']);
  const [followers] = useState(['사람1', '사람2']);
  const [following] = useState(['사람3', '사람4', '사람5']);

  const tabItems = [
    {
      title: '게시글',
      link: '/',
      icon: <CircleIcon>{posts.length}</CircleIcon>,
    },
    { title: '좋아요', link: '/', icon: <HeartIcon /> },
    {
      title: '팔로워',
      link: '/',
      icon: <CircleIcon>{followers.length}</CircleIcon>,
    },
    {
      title: '팔로잉',
      link: '/',
      icon: <CircleIcon>{following.length}</CircleIcon>,
    },
  ];

  const clickHandler = index => {
    setIsActive(index);
  };

  return (
    <Container>
      {tabItems.map((el, index) => {
        return (
          <Tab
            to={el.link}
            key={el.title}
            className={isActive === index ? 'isActive' : null}
            onClick={() => clickHandler(index)}
          >
            {el.icon}
            {el.title}
          </Tab>
        );
      })}
    </Container>
  );
}

export default UserInfoTab;

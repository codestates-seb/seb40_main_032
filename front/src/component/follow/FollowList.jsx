import styled from 'styled-components';
import { DefaultButton } from '../common/button/ButtonStyle';
import UserInfoAvatar from '../userInfo/UserInfoAvatar';
import FollowPost from './FollowPost';

const FollowListContainer = styled.div`
  display: flex;

  .followList__leftside {
  }

  .followList__rightside {
    > ul {
      display: flex;
    }
  }
`;

function FollowList() {
  return (
    <FollowListContainer>
      <div className="followList__leftside">
        <ul className="followList__userinfo">
          <li className="followList__avatar">
            <UserInfoAvatar />
          </li>
          <li className="followList__username">UserName</li>
          <li className="followList__button">
            <DefaultButton>팔로우</DefaultButton>
          </li>
        </ul>
      </div>
      <div className="followList__rightside">
        <ul className="followList__posts">
          <FollowPost />
          <FollowPost />
          <FollowPost />
          <FollowPost />
          <FollowPost />
        </ul>
      </div>
    </FollowListContainer>
  );
}

export default FollowList;

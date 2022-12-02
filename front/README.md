## `HP Front Team`

팀원 : 신경호, 정규식, 유승목, 이승민

### `Front Design`

- 화면 Figma & 유저 플로우 : https://www.figma.com/file/ZLtS8TKRJeKtvpv9FQ4Too/%EB%A9%94%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0%3A1&t=etWL7NhnHgdX8Gn1-0

- color Table
  | Code | Color |
  |----------|:----------:|
  | #3FBF77 | green |
  | #F2A444 | orange |
  | #F2F0EB | light gray |
  | #D9D9D9 | bold-gray |
  | #969696 | dark-gray |
  | #333333 | dark |

- 폰트 스타일 : Roboto, Noto Sans Korean

- CSS Style 규칙</br>
  1. BEM 사용
  2. Element는 2개 이상 ClaasName으로 사용하지 않는다.
  3. 전부다 소문자로 작성한다.<br/>
  - Example
  ```javascript
    <div class="user">
        <img class="user__image" src="" alt="">
        <div class="user__info">
            <button class="user__btn user__btn--red" ></button>
        </div>
    </div>
    .user { ... }
    .user__img { ... }
    .user__info { ... }
    .user__btn { ... }
    .user__btn--red { ... }
  ```

### `Front Code Convention`

- Airbnb : https://github.com/airbnb/javascript

- 작성중

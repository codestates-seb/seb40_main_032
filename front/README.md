## 🦛HIPO 프론트 팀 소개

### 👬👫 팀원
| 신경호(👑프론트 팀장) | 정규식  | 유승목 | 이승민 |
|----|----|----|----|

### 🎨 디자인

- 화면 Figma & 유저 플로우 : https://www.figma.com/file/ZLtS8TKRJeKtvpv9FQ4Too/%EB%A9%94%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0%3A1&t=etWL7NhnHgdX8Gn1-0

- Color Table
  | Color |
  |:----------:|
  | ![#3fbf77](https://placehold.co/15x15/3fbf77/3fbf77.png) `#3FBF77` |
  | ![#F2A444](https://placehold.co/15x15/F2A444/F2A444.png) `#F2A444` |
  | ![#F2F0EB](https://placehold.co/15x15/F2F0EB/F2F0EB.png) `#F2F0EB` |
  | ![#D9D9D9](https://placehold.co/15x15/D9D9D9/D9D9D9.png) `#F2F0EB` |
  | ![#D9D9D9](https://placehold.co/15x15/969696/969696.png) `#969696` |
  | ![#333333](https://placehold.co/15x15/33333/33333.png) `#333333` |

- 폰트 스타일
  | 영문 | 한글 |
  | :---: | :---: |
  | Raleway, Roboto | Pretendard, Noto Sans KR |

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

### ✍️ 코드 컨벤션

- Airbnb : https://github.com/airbnb/javascript

### ✨ 기술 스택
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Axios-181717?style=for-the-badge&logo=Axios&logoColor=white"> ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white"> <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=Sentry&logoColor=white"> <img src="https://img.shields.io/badge/Google Analytics-E37400?style=for-the-badge&logo=Google Analytics&logoColor=white">

### 👀 주요 기능
- 무한스크롤
- 사진 업로드
- 회원가입, 로그인, 로그아웃
- 검색(제목, 본문)
- 게시글, 댓글, 태그, 사진 CRUD
- 타회원 팔로우, 게시글 좋아요
- 게시글 정렬(최신순, 조회순, 추천순)
- 마이페이지, 내 정보 수정

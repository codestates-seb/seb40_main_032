import { createGlobalStyle } from 'styled-components';

const global = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0px;
        margin: 0px;
        font-family: 'Raleway', 'Pretendard', 'Roboto', 'Noto Sans KR', sans-serif;

    }
    html, body {
        width: 100%;
        height: 100%;
        font-size: 10px;
    }
    :root {
        --button-theme : hsl(146, 50%, 50%);
        --button-theme-hv : hsl(153, 100%, 30%);
        --button-font-color : hsl(43, 21%, 94%);
        --font-base-black : hsl(0, 0%, 20%);
        --font-base-grey : hsl(0, 0%, 59%);
        --font-tag-color : hsl(33, 87%, 61%);
        --font-tag-color-hv : hsl(33, 71%, 56%);
        --font-regular : 400;
        --font-medium : 500;
        --font-semi-bold : 600;
        --font-bold : 700;
        --holder-base-color : hsl(0, 0%, 85%);
        --base-white-color : hsl(0, 0%, 100%);
        --radius-50 : 50px;
        --radius-15 : 15px;
        --radius-10 : 10px;
        --font-20 : 20px;
        --font-15 : 15px;
        --font-10 : 10px;
        --bx-sh-two : rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        --bx-sh-four : rgba(0, 0, 0, 0.16) 0px 1px 4px;
        --bx-sh-twt : rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
    ul, ol {
        list-style: none;
    }
    a {
        text-decoration: none;
    }
`;

export default global;

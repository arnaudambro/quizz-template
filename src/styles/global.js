import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html, body, #root, #root > div {
    margin: 0;
    padding: 0;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Open Sans, sans-serif;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  *, *:before, *:after {
    box-sizing: inherit;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-overflow-scrolling: touch;
    position: relative;
    font-family: inherit;
    margin: 0;
    padding: 0;
    position: relative;
  }

  button, a {
    font-size: 1em;
    font-family: inherit;
    color: inherit;
    letter-spacing: normal;
    background: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  a {
    text-decoration: underline;
  }
`
export default GlobalStyle;

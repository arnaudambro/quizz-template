import { css } from 'styled-components';

const sizes = {
  huge: 1440,
  desktop: 1050,
  mobile: 550,
};

// Iterate through the sizes and create a media template
const media = (minOrMax = 'min') =>
  Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
    @media (${minOrMax}-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
    return acc;
  }, {});

export default media;

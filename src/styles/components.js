import styled, { css } from 'styled-components';

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 50px;
`;

export const Description = styled.p`
  font-size: 1.5em;
  text-align: center;
  color: #707070;
`;

export const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: min(600px, 80vw);
  `;


const color = '#812e16'
const selectedCss = css`
  border-color: ${color};
  background-color: ${color}66;
`;

export const AnswerSubContainer = styled.button`
  border-radius: 4px;
  border: 1px solid ${color};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px 0px;
  color: ${color};
  flex-shrink: 0;
  margin-bottom: 20px;
  :hover {
    & > div {
      ${selectedCss}
    }
  }
  * {
    pointer-events: none;
  }
`;


export const AnswerContainer = styled.div`
  width: 100%;
  background-color: ${color}33;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 1em;
  color: ${color};
  display: flex;
  padding: 8px 18px;
  &:hover {
    ${selectedCss}
  }
  ${props => props.selected && selectedCss}
`;

export const AnswerKey = styled.span`
  border-radius: 4px;
  background-color: #FFFFFF33;
  border: 1px solid ${color};
  color: ${color};
  padding: 0px 6px;
  margin-right: 10px;
  font-weight: 600;
  font-size: 0.8em;
  height: 100%;
`;

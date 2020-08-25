import styled, { css } from 'styled-components';
import resetSvg from '../assets/pictures/Reset.svg';
import media from '../styles/media';

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 50px;
  ${media('max').mobile`font-size: 1.3em;`}
`;

export const Multiple = styled.p`
  margin-top: -50px;
  margin-bottom: 50px;
  font-size: 0.75em;
  text-align: center;
  color: #707070;
`;

const descriptionMobile = css`
  font-size: 1em;
  margin-top: -35px;
  margin-bottom: 35px;
`;
export const Description = styled.p`
  font-size: ${(props) => (props.small ? 1 : 1.2)}em;
  text-align: center;
  color: #707070;
  ${media('max').mobile`${descriptionMobile}`}
`;

export const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${media('max').mobile`justify-content: flex-start;`}
  justify-content: center;
  max-width: min(600px, 80vw);
  height: 100%;
`;

const color = '#812e16';
const selectedCss = css`
  border-color: ${color};
  background-color: ${color}66;
`;

export const AnswerSubContainer = styled.button`
  ${(props) => (!props.noBorder ? 'border' : 'border-bottom')}: 1px solid ${color};
  ${(props) => !props.noBorder && 'border-radius: 4px;'}
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px 0px;
  color: ${color};
  flex-shrink: 0;
  margin-bottom: 20px;
  display: inline-flex;
  :hover {
    & > div {
      ${selectedCss}
    }
  }
  * {
    pointer-events: none;
  }
`;

const answerCss = css`
  width: 100%;
  border: 1px solid transparent;
  font-size: 1em;
  color: ${color};
  display: flex;
  align-items: center;
  ${(props) => props.selected && selectedCss}
`;
export const AnswerContainer = styled.div`
  ${answerCss}
  background-color: ${color}33;
  border-radius: 4px;
  padding: 8px 18px;
  text-align: left;
  &:hover {
    ${selectedCss}
  }
`;

export const Autre = styled.span`
  background-color: ${color}33;
  padding: 0 18px;
  border-top-left-radius: 4px;
  display: inline-flex;
  align-items: center;
`;

const inputAloneCss = css`
  background-color: ${color}33;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 8px 18px;
`;
export const Input = styled.input`
  ${answerCss}
  pointer-events: auto;
  background-color: transparent;
  padding-left: 18px;
  ::placeholder {
    color: ${color}66;
  }
  ${(props) => props.isAlone && inputAloneCss}
`;

export const Reset = styled.div`
  background: url(${resetSvg});
  height: 15px;
  width: 15px;
  position: absolute;
  right: 15px;
  margin-top: auto;
  margin-bottom: auto;
  pointer-events: auto;
`;

export const AnswerKey = styled.span`
  border-radius: 4px;
  background-color: #ffffff33;
  border: 1px solid ${color};
  color: ${color};
  padding: 0px 6px;
  margin-right: 10px;
  font-weight: 600;
  font-size: 0.8em;
  height: 100%;
  text-align: left;
`;

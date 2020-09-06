import React from 'react';
import styled, { css } from 'styled-components';
import media from '../styles/media';

const ContainerContent = ({ onClick, fullHeight, children, cta, tip, debug, visible }) => {
  if (!Boolean(cta)) {
    return (
      <Container debug={debug} visible={visible}>
        <Content fullHeight={fullHeight} debug={debug}>
          {children}
        </Content>
      </Container>
    );
  }
  console.log('visible', visible);
  return (
    <>
      <Container debug={debug} visible={visible}>
        <Content debug={debug}>{children}</Content>
      </Container>
      <CTAContainer visible={visible}>
        <CTA type="button" onClick={onClick}>
          {cta}
        </CTA>
        {tip && <Tip>{tip}</Tip>}
      </CTAContainer>
    </>
  );
};

const color = '#c87517';
const background = '#efcab0';
const visibleCss = css`
  transition: opacity 250ms ease-in-out 250ms;
  opacity: 1;
`;
const Container = styled.section`
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  ${(props) => props.debug && 'border: 4px solid red;'}
  ${(props) => props.visible && visibleCss}
`;

const ctaHeight = 100;
const Content = styled.div`
  width: 100%;
  height: 100%;
  height: calc(100% - ${ctaHeight}px);
  ${(props) => props.fullHeight && 'height: 100%;'}
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${media('max').mobile`justify-content: flex-start;`}
  align-items: center;
  padding: 5%;
  ${(props) => props.debug && 'border: 2px solid blue;'}
`;

const CTAContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${ctaHeight}px;
  background: ${background};
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: opacity 125ms ease-in-out;
  opacity: 0;
  ${media('min').mobile`justify-content: center;`}
  ${(props) => props.visible && visibleCss}
`;

export const CTA = styled.button`
  border-radius: 4px;
  background-color: ${color};
  font-weight: bold;
  font-size: 1.5em;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px 0px;
  color: white;
  padding: 8px 18px;
  width: auto;
  min-width: 150px;
  margin-right: 15px;
  ${(props) => props.center && `margin-left: auto; margin-right: auto;`}
  ${(props) => props.cursorDefault && 'cursor: default;'}
  display: block;
  min-height: 45px;
  /* ${media('min').mobile`margin-right: 15px;`} */
`;

const Tip = styled.span`
  color: ${color};
  font-size: 0.75em;
  ${media('max').mobile`display: none;`}
`;

export default ContainerContent;

import React from 'react';
import styled, { css } from 'styled-components';
import media from '../styles/media';

const ContainerContent = ({ onClick, onNext, onPrev, children, cta, tip, debug }) => {
  if (!Boolean(cta)) {
    return (
      <Container debug={debug}>
        <Content debug={debug}>
          {children}
        </Content>
      </Container>
    )
  }
  return (
    <>
      <Container debug={debug}>
        <Content debug={debug}>
          {children}
          <CTAContainerDesktop>
            <CTA type="button" onClick={onClick}>{cta}</CTA>
            {tip && <Tip>{tip}</Tip>}
          </CTAContainerDesktop>
        </Content>
      </Container>
      <CTAContainerMobile>
        <CTA type="button" onClick={onClick}>{cta}</CTA>
        {tip && <Tip>{tip}</Tip>}
      </CTAContainerMobile>
    </>
  )
}

const color = '#c87517';
const Container = styled.section`
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  ${props => props.debug && 'border: 4px solid red;'}
`;

const ctaHeight = 100;
const Content = styled.div`
  width: 100%;
  height: 100%;
  ${media('max').mobile`height: calc(100% - ${ctaHeight}px);`}
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${media('max').mobile`justify-content: flex-start;`}
  align-items: center;
  padding: 10%;
  ${props => props.debug && 'border: 2px solid blue;'}
`;

const CTAContainerDesktop = styled.div`
  ${media('max').mobile`display: none;`}
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
`;

const CTAContainerMobile = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${ctaHeight}px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${media('min').mobile`display: none;`}
`;

const CTA = styled.button`
  border-radius: 4px;
  background-color: ${color};
  font-weight: bold;
  font-size: 1.5em;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px 0px;
  color: white;
  padding: 8px 18px;
  ${media('min').mobile`margin-right: 15px;`}
`;

const Tip = styled.span`
  color: ${color};
  font-size: 0.75em;
  ${media('max').mobile`display: none;`}
`;

export default ContainerContent;

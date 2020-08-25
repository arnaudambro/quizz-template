import React from 'react';
import styled from 'styled-components';
import media from '../styles/media';
import ContainerContent from '../components/ContainerContent';
import { Title, Description } from '../styles/components';

class WelcomeScreen extends React.Component {
  componentDidMount() {
    if (this.props.visible) this.addKeyListener();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible && !this.props.visible) this.removeKeyListener();
    if (!prevProps.visible && this.props.visible) this.addKeyListener();
  }

  componentWillUnmount() {
    this.removeKeyListener();
  }

  addKeyListener = () => {
    window.addEventListener('keyup', this.handleShortcuts);
  };

  removeKeyListener = () => {
    window.removeEventListener('keyup', this.handleShortcuts);
  };

  handleShortcuts = (e) => {
    const key = e.key.toLowerCase();
    if (key === 'enter') this.props.onStart();
  };

  render() {
    const { onStart, visible } = this.props;
    return (
      <ContainerContent
        onClick={onStart}
        cta="J'ai faim !"
        tip="Appuyez sur Entrée ↵"
        visible={visible}>
        <Iframe
          src="https://www.youtube.com/embed/ThViR9uVVts"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="youpi"
        />
        <Title>
          Des viennoiseries faites{'\u00A0'}maison{'\u00A0'}!?
        </Title>
        <Description>
          Des pains au chocolat, j'en mange presque tous les jours, et c'est avec tristesse que j'ai
          appris en regardant cette vidéo que 80% des viennoiseries seraient d'origine industrielle.
          <br />
          <br />
          Artisans et/ou gourmands, qu'en pensez-vous ? Que pensez-vous d'un label certifiant les
          viennoiseries faites maison, quitte à ce qu'elles soient alors vendues plus chères ?
          <br />
          <br />
          Dites-moi tout dans ce questionnaire anonyme !
        </Description>
      </ContainerContent>
    );
  }
}

const maxIframeWidth = 560;
const Iframe = styled.iframe`
  width: min(80vw, ${maxIframeWidth}px);
  height: min(45vw, ${(maxIframeWidth * 9) / 16}px);
  flex-shrink: 0;
  ${media('min').mobile`margin-top: 50px;`}
  margin-bottom: 50px;
  border: none;
`;

export default WelcomeScreen;

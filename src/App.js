import React from 'react';
import styled, { css } from 'styled-components';
import WelcomeScreen from './screens/WelcomeScreen';
import GlobalStyle from './styles/global';
import bg from './assets/pictures/viennoiseries.jpg'
import QCM from './screens/QCM';
import media from './styles/media';

class App extends React.Component {
  state = {
    screen: 0,
  }

  componentDidMount() {
    this.scrollToScreen(this.state.screen, 'auto');
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.screen !== this.state.screen) this.scrollToScreen(this.state.screen)
  }

  goToScreen1 = () => this.setState({ screen: 1 })
  goToScreen2 = () => this.setState({ screen: 2 })
  goToScreen3 = () => this.setState({ screen: 3 })

  onPrev = () => this.setState(({ screen }) => ({ screen: screen - 1 }))
  onNext = () => this.setState(({ screen }) => ({ screen: screen + 1 }))

  scrollToScreen = (screen, behavior = 'smooth') => {
    const screenHeight = window.innerHeight;
    this.screener.scrollTo({ top: screenHeight * screen, behavior });
  }


  render() {
    const { screen } = this.state;
    return (
      <>
        <GlobalStyle />
        <Background />
        <Screener ref={r => this.screener = r}>
          <WelcomeScreen onStart={this.goToScreen1} />
          <QCM
            visible={screen === 0}
            questionNumber="1"
            multipleSelect={false}
            question={`Êtes-vous un boulanger/pâtissier ou un consommateur\u00A0?`}
            answers={[
              "Un boulanger/pâtissier",
              "Un consommateur",
            ]}
            onPrev={() => console.log('youlou')}
            onNext={() => console.log('youlou')}
          />
          <QCM
            visible={screen === 0}
            questionNumber="2"
            multipleSelect={true}
            question={`Êtes-vous un boulanger/pâtissier ou un consommateur\u00A0?`}
            answers={[
              "Oui, ça ne serait que justice pour les boulangers/patissiers",
              "Oui, ça motiverait les boulangers qui vendent des viennoiseries industrielles à les faire maison",
              "Oui ! Et même 5€ j'irai quand même !",
              "Non, je pense que c'est trop cher par rapport à ce que ça coûte, ça serait malhonnête",
              "Non, je n'achèterais plus parce que c'est trop cher",
              "Non ! Et vous pensez aux pauvres gens qui n'auraient pas les moyens ? Non mais alors !",
              "Non, j'irais dans la boulangerie d'à côté",
              "Autre",
            ]}
          />
        </Screener>
        {screen > 0 && (
          <CTAContainerPrevNext>
            <Ad>Design inspiré par <a href="https://www.typeform.com">TypeForm</a></Ad>
            <Prev type="button" onClick={this.onPrev}>↑</Prev>
            <Next type="button" onClick={this.onNext}>↓</Next>
          </CTAContainerPrevNext>
        )}
      </>
    );
  }
}


const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${bg});
  filter: blur(8px);
  ::before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(252,252,252,0.65);
    z-index: 1;
  }
`;

const Screener = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  > * {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 100%;
  }
`;

const color = '#c87517';

const ctaHeight = 100;
const CTAContainerPrevNext = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;
  height: 30px !important;
  width: auto !important;
  display: flex;
  flex-direction: space-between;
`;

const prevNextCss = css`
  border: 1px solid #FFFFFF55;
  padding: 0px 20px;
  color: white;
  flex-grow: 1;
  font-weight: 700;
  overflow: hidden;
  background-color: ${color};
`;

const Prev = styled.button`
  ${prevNextCss}
  border-left: none;
`;

const Next = styled.button`
  ${prevNextCss}
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: none;
`;

const Ad = styled.span`
  ${prevNextCss}
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: normal;
  font-size: 10px;
  line-height: 30px;
  text-decoration: none;
`;

export default App;

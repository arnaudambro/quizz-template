import React from 'react';
import styled from 'styled-components';
import WelcomeScreen from './screens/WelcomeScreen';
import GlobalStyle from './styles/global';
import bg from './assets/pictures/viennoiseries.jpg'
import QCM from './screens/QCM';

class App extends React.Component {
  state = {
    screen: 0,
  }

  componentDidMount() {
    this.scrollToScreen(this.state.screen, 'auto');
  }

  componentDidUpdate(_, prevState) {
    if (prevState.screen !== this.state.screen) this.scrollToScreen(this.state.screen)
  }

  goToScreen1 = () => this.setState({ screen: 1 })

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
          <QCM
            visible={screen === 0}
            questionNumber="1"
            question="Êtes-vous un boulanger/pâtissier ou un consommateur ?"
            answers={["Un boulanger/pâtissier", "Un consommateur"]}
          />
          <WelcomeScreen onStart={this.goToScreen1} />
        </Screener>
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
  border: 4px solid #000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  > * {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 100%;
  }
`;

export default App;

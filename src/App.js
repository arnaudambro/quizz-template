import React from 'react';
import styled, { css } from 'styled-components';
import * as Sentry from '@sentry/react';
import WelcomeScreen from './screens/WelcomeScreen';
import GlobalStyle from './styles/global';
import bg from './assets/pictures/viennoiseries.jpg';
import QCM from './screens/QCM';
import quizzJson from './quizz.json';
import ThanksScreen from './screens/ThanksScreen';

const initPath = quizzJson[0].path;
const initQuizz = quizzJson.filter((q) => initPath.startsWith(q.path));
const initScreen = 0;
// const initPath = quizzJson[quizzJson.length - 1].path;
// const initQuizz = quizzJson.filter((q) => initPath.startsWith(q.path));
// const initScreen = initQuizz.length + 1;

class App extends React.Component {
  state = {
    // screen: 0,
    screen: initScreen,
    path: initPath,
    quizz: initQuizz,
  };
  answers = {};

  componentDidMount() {
    this.scrollToScreen(this.state.screen, 'auto');
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.screen !== this.state.screen) this.scrollToScreen(this.state.screen);
  }

  onStart = () => this.setState(({ screen }) => ({ screen: 1 }));
  onPrev = () => this.setState(({ screen }) => ({ screen: screen - 1 }));
  onNext = () => {
    const { quizz, screen } = this.state;
    if (quizz.length === screen - 1) return;
    this.setState(({ screen }) => ({ screen: screen + 1 }));
  };
  handleAnswer = (answer) => {
    this.answers = Object.assign({}, this.answers, answer);
  };
  setNewPath = (path) =>
    this.setState({ path, quizz: quizzJson.filter((q) => path.startsWith(q.path)) });

  scrollToScreen = (screen, behavior = 'smooth') => {
    const screenHeight = window.innerHeight;
    this.screener.scrollTo({ top: screenHeight * screen, behavior });
  };

  onSend = async (person) => {
    const response = await fetch(process.env.REACT_APP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(Object.assign({}, person, { quizz: this.answers })),
    });
    if (response.ok) {
      alert('Merci !');
      return true;
    }
    if (!response.ok) {
      alert("Erreur lors de l'envoi. Pouvez-vous réessayer ultérieurement ?");
      Sentry.captureMessage(JSON.stringify(await response.json()));
      return false;
    }
  };

  render() {
    const { screen, quizz } = this.state;
    return (
      <>
        <GlobalStyle />
        <Background />
        <Screener ref={(r) => (this.screener = r)} screen={screen}>
          <WelcomeScreen onStart={this.onStart} visible={screen === 0} />
          {quizz.map((question, index) => (
            <QCM
              key={`${question.title}${index}`}
              description={question.description}
              visible={screen === index + 1}
              questionNumber={index + 1}
              multipleSelect={question.multipleSelect}
              question={question.title}
              answers={question.answers}
              setNewPath={this.setNewPath}
              sendAnswer={this.handleAnswer}
              onNext={this.onNext}
              onPrev={this.onPrev}
            />
          ))}
          <ThanksScreen onSend={this.onSend} visible={screen === quizz.length + 1} />
        </Screener>
        <CTAContainerPrevNext visible={screen > 0}>
          <Ad>
            Design inspiré par <a href="https://www.typeform.com">TypeForm</a>
          </Ad>
          <Prev type="button" onClick={this.onPrev}>
            ↑
          </Prev>
          <Next type="button" onClick={this.onNext}>
            ↓
          </Next>
        </CTAContainerPrevNext>
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
    background-color: rgba(252, 252, 252, 0.65);
    z-index: 1;
  }
`;

const Screener = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 250ms ease-in-out;
  > * {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 100%;
  }
`;

const color = '#c87517';

const visibleCss = css`
  visibility: visible;
  opacity: 1;
`;
const CTAContainerPrevNext = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;
  height: 30px !important;
  width: auto !important;
  display: flex;
  flex-direction: space-between;
  opacity: 0;
  visibility: hidden;
  transition: all 250ms ease-in-out 750ms;
  ${(props) => props.visible && visibleCss}
`;

const prevNextCss = css`
  border: 1px solid #ffffff55;
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

import React from 'react';
import ContainerContent from '../components/ContainerContent';
import { Title, Description, AnswerContainer, AnswersContainer, AnswerKey, AnswerSubContainer } from '../styles/components';

const completeAlphabet = 'abcdefghijklmnopqrstuvwxyz'

class QCM extends React.Component {

  state = {
    selected: '',
    selecteds: [''],
  }

  alphabet = completeAlphabet.substring(0, this.props.answers.length)

  componentDidMount() {
    if (this.props.visible) this.addKeyListener();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible && !this.props.visible) this.removeKeyListener()
    if (!prevProps.visible && this.props.visible) this.addKeyListener()
  }

  componentWillUnmount() {
    this.removeKeyListener()
  }

  addKeyListener = () => {
    window.addEventListener('keydown', this.handleShortcuts);
  }

  removeKeyListener = () => {
    window.removeEventListener('keydown', this.handleShortcuts);
  }

  handleShortcuts = e => {
    const key = e.key.toLowerCase();
    if (this.alphabet.indexOf(key) !== -1) {
      if (this.props.multipleSelect) {
        // TODO
      } else {
        this.setState({ selected: key })
      }
    }
  };

  handleSelect = e => {
    this.setState({ selected: e.target.value })
  }


  render() {
    const { question, questionNumber, description, answers, onNext } = this.props;
    const { selected } = this.state;
    return (
      <ContainerContent onClick={onNext} cta="Suivant">
        <Title>{questionNumber}. {question}</Title>
        {description && <Description>{description}</Description>}
        <AnswersContainer>
          {answers.map((answer, index) => {
            const value = this.alphabet[index];
            return (
              <AnswerSubContainer onClick={this.handleSelect} key={answer} value={value}>
                <AnswerContainer selected={selected === value}>
                  <AnswerKey>{value.toUpperCase()}</AnswerKey>
                  {answer}
                </AnswerContainer>
              </AnswerSubContainer>
            )
          })}
        </AnswersContainer>
      </ContainerContent>
    )
  }
}

export default QCM;

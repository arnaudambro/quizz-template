import React from 'react';
import ContainerContent from '../components/ContainerContent';
import { Title, Description, AnswerContainer, AnswersContainer, AnswerKey, AnswerSubContainer } from '../styles/components';

const completeAlphabet = 'abcdefghijklmnopqrstuvwxyz'

class QCM extends React.Component {

  state = {
    selected: [],
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

  handleShortcuts = e => this.handleToggle(e.key.toLowerCase());
  handleSelect = e => this.handleToggle(e.target.value);

  handleToggle = key => {
    if (this.alphabet.indexOf(key) !== -1) {
      this.setState(({ selected }) => {
        if (selected.includes(key)) {
          return {
            selected: selected.filter(k => k !== key)
          }
        }
        return {
          selected: this.props.multipleSelect ? [...selected,  key] : [key]
        }
      })
    }
  }


  render() {
    const { question, questionNumber, description, answers } = this.props;
    const { selected } = this.state;
    return (
      <ContainerContent>
        <Title>{questionNumber}. {question}</Title>
        {description && <Description>{description}</Description>}
        <AnswersContainer>
          {answers.map((answer, index) => {
            const value = this.alphabet[index];
            return (
              <AnswerSubContainer onClick={this.handleSelect} key={answer} value={value}>
                <AnswerContainer selected={selected.includes(value)}>
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

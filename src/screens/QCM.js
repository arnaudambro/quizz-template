import React from 'react';
import ContainerContent from '../components/ContainerContent';
import {
  Title,
  Description,
  AnswerContainer,
  AnswersContainer,
  AnswerKey,
  AnswerSubContainer,
} from '../styles/components';

class QCM extends React.Component {
  state = {
    selected: [],
  };

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
    window.addEventListener('keydown', this.handleShortcuts);
  };

  removeKeyListener = () => {
    window.removeEventListener('keydown', this.handleShortcuts);
  };

  handleShortcuts = (e) => this.handleToggle(e.key.toLowerCase());
  handleSelect = (e) => this.handleToggle(e.target.value);

  handleToggle = (key) => {
    key = key.toLowerCase();
    const { answers } = this.props;
    const alphabet = answers.map(({ key }) => key.toLowerCase());
    if (alphabet.indexOf(key) !== -1) {
      this.setState(({ selected }) => {
        if (selected.includes(key)) {
          return {
            selected: selected.filter((k) => k !== key),
          };
        }
        return {
          selected: this.props.multipleSelect ? [...selected, key] : [key],
        };
      }, this.autoNext);
    }
  };

  autoNext = () => {
    const { answers, multipleSelect, setNewPath, onNext } = this.props;
    const { selected } = this.state;
    if (multipleSelect) return;
    const answer = answers.find((a) => a.key.toLowerCase() === selected[0]);
    if (answer.path) setNewPath(answer.path);
    setTimeout(() => {
      onNext();
    }, 750);
  };

  render() {
    const { question, questionNumber, description, answers } = this.props;
    const { selected } = this.state;
    return (
      <ContainerContent>
        <Title>
          {questionNumber}. {question}
        </Title>
        {description && <Description>{description}</Description>}
        <AnswersContainer>
          {answers.map(({ key, label, path }, index) => {
            return (
              <AnswerSubContainer onClick={this.handleSelect} key={label} value={key}>
                <AnswerContainer selected={selected.includes(key.toLowerCase())}>
                  <AnswerKey>{key.toUpperCase()}</AnswerKey>
                  {label}
                </AnswerContainer>
              </AnswerSubContainer>
            );
          })}
        </AnswersContainer>
      </ContainerContent>
    );
  }
}

export default QCM;

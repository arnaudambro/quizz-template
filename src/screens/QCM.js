import React from 'react';
import ContainerContent from '../components/ContainerContent';
import {
  Title,
  Description,
  Multiple,
  AnswerContainer,
  AnswersContainer,
  AnswerKey,
  AnswerSubContainer,
  Input,
  Reset,
} from '../styles/components';

const Autre = 'Autre:';
class QCM extends React.Component {
  state = {
    selected: [],
    inputValue: '',
    inputFocus: false,
  };

  autreQuestion = (this.props.answers && this.props.answers.find((q) => q.label === Autre)) || {
    key: 'A',
    label: Autre,
  };

  componentDidMount() {
    if (this.props.visible) this.addKeyListener();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible && !this.props.visible) {
      this.removeKeyListener();
    }
    if (!prevProps.visible && this.props.visible) {
      this.addKeyListener();
    }
    if (this.state.inputValue.length && !this.state.selected.includes(this.autreQuestion.key)) {
      this.handleToggle(this.autreQuestion.key);
    }
    if (!this.state.inputValue.length && this.state.selected.includes(this.autreQuestion.key)) {
      this.handleToggle(this.autreQuestion.key);
    }
  }

  componentWillUnmount() {
    this.removeKeyListener();
  }

  addKeyListener = () => {
    if (!this.props.answers) this.input.focus();
    window.addEventListener('keyup', this.handleShortcuts);
  };

  removeKeyListener = () => {
    window.removeEventListener('keyup', this.handleShortcuts);
  };

  handleShortcuts = (e) => this.handleToggle(e.key);

  handleSelect = (e) => this.handleToggle(e.target.value);

  handleToggle = (key) => {
    key = key.toLowerCase();
    const { answers, onPrev } = this.props;
    if (key === 'arrowdown') return this.onNext('arrow down');
    if (key === 'arrowup') return onPrev();
    if (key === 'enter') return this.onNext('enter');
    if (this.state.inputFocus) return;
    if (!answers) return;
    const alphabet = answers.map(({ key }) => key);
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
    const { answers, multipleSelect, setNewPath } = this.props;
    const { selected } = this.state;
    if (multipleSelect) return;
    const answer = answers.find((a) => a.key === selected[0]);
    if (answer.path) setNewPath(answer.path);
    setTimeout(() => {
      this.onNext('auto');
    }, 750);
  };

  sendAnswer = () => {
    const {
      sendAnswer,
      setNewPath,
      answers,
      question,
      questionNumber,
      multipleSelect,
    } = this.props;
    const { selected, inputValue } = this.state;
    sendAnswer({
      [`${questionNumber}. ${question}`]: Boolean(selected.length)
        ? selected.map((key) => {
            if (Boolean(answers)) {
              const answer = answers.find((a) => a.key === key);
              if (answer.label === Autre) return `Autre: ${inputValue}`;
              return answer.label;
            }
            return inputValue;
          })
        : inputValue,
    });
    if (multipleSelect) return;
    if (!answers) return;
    const answer = answers.find((a) => a.key === selected[0]);
    if (answer && answer.path) setNewPath(answer.path);
  };

  onNext = (from) => {
    console.log('on next', from);
    if (this.state.inputFocus) this.input.blur();
    this.sendAnswer();
    this.props.onNext();
  };

  setInputValue = (e) => {
    this.setState({ inputValue: e.target.value }, this.sendAnswer);
  };

  resetInput = (e) => {
    e.stopPropagation();
    this.setState(
      ({ selected }) => ({
        inputValue: '',
        selected: selected.filter((key) => key !== this.autreQuestion.key),
      }),
      this.sendAnswer
    );
  };

  render() {
    const { question, questionNumber, description, answers, visible, multipleSelect } = this.props;
    const { selected, inputValue } = this.state;
    return (
      <ContainerContent visible={visible}>
        <Title>
          {questionNumber}. {question}
        </Title>
        {multipleSelect && <Multiple>Vous pouvez sélectionner plusieurs réponses</Multiple>}
        {description && <Description small>{description}</Description>}
        <AnswersContainer>
          {answers ? (
            answers.map(({ key, label, path }, index) => {
              return (
                <AnswerSubContainer onClick={this.handleSelect} key={label} value={key}>
                  <AnswerContainer selected={selected.includes(key)}>
                    <AnswerKey>{key.toUpperCase()}</AnswerKey>
                    {label}
                    {label === Autre && (
                      <>
                        <Input
                          as="input"
                          ref={(r) => (this.input = r)}
                          type="text"
                          placeholder="Cliquez ici pour répondre"
                          value={inputValue}
                          onChange={this.setInputValue}
                          onFocus={() => this.setState({ inputFocus: true })}
                          onBlur={() => this.setState({ inputFocus: false })}
                        />
                        {Boolean(inputValue.length) && <Reset onClick={this.resetInput} />}
                      </>
                    )}
                  </AnswerContainer>
                </AnswerSubContainer>
              );
            })
          ) : (
            <AnswerSubContainer as="div" noBorder>
              <Input
                as="input"
                isAlone
                ref={(r) => (this.input = r)}
                type="text"
                placeholder="Répondez ici"
                value={inputValue}
                onChange={this.setInputValue}
                onFocus={() => this.setState({ inputFocus: true })}
                onBlur={() => this.setState({ inputFocus: false })}
              />
            </AnswerSubContainer>
          )}
        </AnswersContainer>
      </ContainerContent>
    );
  }
}

export default QCM;

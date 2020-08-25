import React from 'react';
import ContainerContent, { CTA } from '../components/ContainerContent';
import {
  Title,
  Description,
  AnswerSubContainer,
  Input,
  AnswersContainer,
} from '../styles/components';

class ThanksScreen extends React.Component {
  state = {
    name: '',
    email: '',
    zip: '',
    comment: '',
    disabled: false,
  };

  setInputValue = (e) => this.setState({ [e.target.name]: e.target.value });
  onSendRequest = () => {
    this.props.onSend(this.state);
    // this.setState({ disabled: true });
  };
  render() {
    const { visible } = this.props;
    const { name, email, zip, comment, disabled } = this.state;
    return (
      <ContainerContent fullHeight visible={visible}>
        <Title>Merci !</Title>
        <Description small>
          Ce questionnaire est anonyme, néanmoins si vous ne voyez pas d'inconvénient à ce qu'on
          vous contacte pour avoir plus de renseignements, ou pour avoir votre avis sur le label que
          nous souhaitons créer, ou même si vous avez des remarques, veuillez remplir le formulaire
          suivant <b>(facultatif)</b>
          <br />
          <br />
          <br />
        </Description>
        <AnswersContainer>
          <AnswerSubContainer as="div" noBorder>
            <Input
              as="input"
              isAlone
              ref={(r) => (this.name = r)}
              type="text"
              placeholder="Nom"
              autoComplete="name"
              value={name}
              name="name"
              onChange={this.setInputValue}
            />
          </AnswerSubContainer>
          <AnswerSubContainer as="div" noBorder>
            <Input
              as="input"
              isAlone
              ref={(r) => (this.email = r)}
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              name="email"
              onChange={this.setInputValue}
            />
          </AnswerSubContainer>
          <AnswerSubContainer as="div" noBorder>
            <Input
              as="input"
              isAlone
              ref={(r) => (this.input = r)}
              type="text"
              placeholder="Code postal"
              autoComplete="postal-code"
              value={zip}
              name="zip"
              onChange={this.setInputValue}
            />
          </AnswerSubContainer>
          <AnswerSubContainer as="div" noBorder>
            <Input
              as="input"
              isAlone
              ref={(r) => (this.input = r)}
              type="text"
              placeholder="Une remarque ?"
              value={comment}
              name="comment"
              onChange={this.setInputValue}
            />
          </AnswerSubContainer>
          <div style={{ height: 30, flexShrink: 0 }} />
          <CTA type="button" disabled={disabled} onClick={this.onSendRequest} center>
            {disabled ? 'Envoyé !' : 'Envoyer'}
          </CTA>
          <div style={{ height: 60, flexShrink: 0 }} />
        </AnswersContainer>
      </ContainerContent>
    );
  }
}

export default ThanksScreen;

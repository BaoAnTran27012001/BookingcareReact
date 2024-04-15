import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import axios from 'axios';
import './ChatUI.css';


class ChatUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
    }
  }
  handleOnChangeChatInput = (event) => {
    this.setState({
      chatInput: event.target.value,
    });

  }
  handleClickSend = async () => {
    console.log("Clicked");
    let res = await axios.get(`localhost:8080/question?message=${this.state.chatInput}`);
    console.log(res.data);
  }
  componentDidMount() {

  }



  render() {
    return (
      <div class="center">
        <div class="contacts">
          <i class="fas fa-bars fa-2x"></i>
          <h2>
            Contacts
          </h2>
          <div class="contact">
            <div class="pic rogers"></div>
            <div class="badge">
              14
            </div>
            <div class="name">
              Steve Rogers
            </div>
            <div class="message">
              That is America's ass 🇺🇸🍑
            </div>
          </div>
          <div class="contact">
            <div class="pic stark"></div>
            <div class="name">
              Tony Stark
            </div>
            <div class="message">
              Uh, he's from space, he came here to steal a necklace from a wizard.
            </div>
          </div>
          <div class="contact">
            <div class="pic banner"></div>
            <div class="badge">
              1
            </div>
            <div class="name">
              Bruce Banner
            </div>
            <div class="message">
              There's an Ant-Man *and* a Spider-Man?
            </div>
          </div>
          <div class="contact">
            <div class="pic thor"></div>
            <div class="name">
              Thor Odinson
            </div>
            <div class="badge">
              3
            </div>
            <div class="message">
              I like this one
            </div>
          </div>
          <div class="contact">
            <div class="pic danvers"></div>
            <div class="badge">
              2
            </div>
            <div class="name">
              Carol Danvers
            </div>
            <div class="message">
              Hey Peter Parker, you got something for me?
            </div>
          </div>
        </div>
        <div class="chat">
          <div class="contact bar">
            <div class="pic stark"></div>
            <div class="name">
              Tony Stark
            </div>
            <div class="seen">
              Today at 12:56
            </div>
          </div>
          <div class="messages" id="chat">
            {/* <div class="message stark">
              <div class="typing typing-1"></div>
              <div class="typing typing-2"></div>
              <div class="typing typing-3"></div>
            </div> */}
          </div>
          <div class="input">
            <i class="fas fa-camera"></i><i class="far fa-laugh-beam"></i><input placeholder="Type your message here!" type="text" onChange={(event) => this.handleOnChangeChatInput(event)} /><i class="fas fa-microphone" onClick={()=>this.handleClickSend()}></i>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    lang: state.app.language,
    contentOfConfirmModal: state.app.contentOfConfirmModal
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatUI);

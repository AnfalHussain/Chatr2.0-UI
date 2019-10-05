import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChannelDetail, sendMessage, setLoading } from "../redux/actions";
import Messages from "./Messages";
import SearchChannelBar from "./SearchChannelBar";
import "../assets/css/main.css";
import sendSound from "./sendSound.mp3";
// import AddMessage from "./AddMessage";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

class SendMessageForm extends Component {
  state = {
    filteredMessages: [],
    searchIsUsed: false,
    message: ""
  };

  //used to reset the form
  resetForm = () =>
    this.setState({
      message: ""
    });
  filterMessages = query => {
    const channel = this.props.channel;
    query = query.toLowerCase();

    let filteredMessages = channel.filter(messageItem =>
      `${messageItem.message} ${messageItem.username} `
        .toLowerCase()
        .includes(query)
    );
    this.setState({
      filteredMessages: filteredMessages,
      searchIsUsed: true
    });
  };

  componentDidMount() {
    // const timeStamp = this.props.match.params.channelID.latest;
    this.props.changeLoading();

    this.interval = setInterval(
      () => {
        if (this.props.match.params.channelID !== undefined) {
          this.props.fetchChannelDetail(this.props.match.params.channelID);
        }
      },
      1000
      // timeStamp
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.channelID !== undefined) {
      if (
        this.props.match.params.channelID !== prevProps.match.params.channelID
      ) {
        //Clearing the interval should happen in this part of the if statement when the id changes
        //not when the id remains the same
        this.props.changeLoading();
        this.props.fetchChannelDetail(this.props.match.params.channelID);
      } else {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.props.fetchChannelDetail(this.props.match.params.channelID);
        }, 1000);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.sendMessage(
      this.props.match.params.channelID,
      this.state,
      this.props.user,
      this.resetForm
    );
    let sound = new Audio(sendSound);
    sound.play();

    this.setState({
      message: ""
    });
    let text = document.messageForm.message;
    text.value = "";
  };

  myView = () => {
    const channel = this.props.channel;

    if (!!channel) {
      const ChannelIDfromURL = this.props.match.params.channelID;
      console.log("ChannelIDfromURL", ChannelIDfromURL);

      //get the background
      // console.log("this.state.filteredChannels", this.state.filteredChannels)

      let findChannel = this.props.channels.find(
        channel => channel.id === +ChannelIDfromURL
      );

      let background = "";
      console.log("findChannel", findChannel);

      if (findChannel) {
        background = findChannel.image_url;
        console.log("findChannel.image_url", findChannel.image_url);
      }

      // set the background of the channel to be the "image_url" of the channel
      if (this.state.searchIsUsed) {
        const resultedMessages = this.state.filteredMessages.map(message => (
          <Messages
            key={message.id}
            messages={message}
            background={background}
          />
        ));
        return (
          <div
            id="bgIMG"
            style={{
              backgroundImage: `url(${background})`
            }}
          >
            {resultedMessages}
          </div>
        );
        {
          /* <div style={{
          
          backgroundImage: `url(${background})`
        }}>
          {resultedMessages}
        </div> */
        }
      } //search is not used
      else {
        const messages = channel.map(message => (
          <Messages
            key={message.id}
            messages={message}
            background={background}
          />
        ));
        return (
          <div
            id="bgIMG"
            style={{
              backgroundImage: `url(${background})`
            }}
          >
            {/* style={{
          backgroundImage: `url(${background})`
        }}> */}
            {messages}
          </div>
        );
      }
    }
  };

  render() {
    if (this.props.loading) return <Loading />;
    if (!this.props.user) return <Redirect to="/login" />;

    return (
      <>
        <div
          style={{
            backgroundImage: `url(${this.props.channel.image_url})`
          }}
        >
          <SearchChannelBar onChange={this.filterMessages} />
          <div id="bubble" className=" ml-5 content col-10">
            {this.myView()}
          </div>

          <div style={{ textAlign: "center" }} className="mt-5 p-2">
            <form name="messageForm" onSubmit={this.submitHandler}>
              <div className="row" id="scroller">
                <div className="col-12">
                  <input
                    style={{
                      borderColor: "#e30090",
                      borderWidth: "0px",
                      hight: "100px"
                    }}
                    name="message"
                    value={this.state.message}
                    placeholder="Write your message..."
                    onChange={this.changeHandler}
                    className="input"
                  ></input>
                </div>

                <button id="send" type="submit" value="Send">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    channel: state.channel.channel,
    channels: state.rootChannels.channels,
    filteredChannels: state.rootChannels.filteredChannels,
    currentChannel: state.channel.currentChannel,
    loading: state.channel.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (channelID, message, user, resetForm) =>
      dispatch(sendMessage(channelID, message, user, resetForm)),

    fetchChannelDetail: channelID => dispatch(fetchChannelDetail(channelID)),
    changeLoading: () => dispatch(setLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMessageForm);

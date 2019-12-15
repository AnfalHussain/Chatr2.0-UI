import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  state = {
    collapsed: false,
    query: ""
  };

  setQuery = query => this.setState({ query });

  filterChannels = () => {
    const query = this.state.query.toLowerCase();

    return this.props.channels.filter(channel => {
      return `${channel.name}`.toLowerCase().includes(query);
    });
  };

  render() {
    const channelLinks = this.props.filteredChannels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    {
      if (this.props.user) {
        return (
          <div>
            <ul
              style={{ postion: "relative", top: "30px" }}
              className="navbar-nav navbar-sidenav bgside"
              id="exampleAccordion"
            >
              <SearchBar />

              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
              >
                <Link className="nav-link heading" to="/createChannel">
                  <span className="nav-link-text mr-2 sidelink">Channels</span>
                  <FontAwesomeIcon id="iconcolor" icon={faPlusCircle} />
                </Link>
              </li>
              {channelLinks}
            </ul>
            <ul className="navbar-nav sidenav-toggler">
              <li className="nav-item">
                <span
                  className="nav-link text-center"
                  id="sidenavToggler"
                  onClick={() =>
                    this.setState(prevState => ({
                      collapsed: !prevState.collapsed
                    }))
                  }
                >
                  <FontAwesomeIcon
                    icon={this.state.collapsed ? faAngleRight : faAngleLeft}
                  />
                </span>
              </li>
            </ul>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.rootChannels.channels,
    filteredChannels: state.rootChannels.filteredChannels
  };
};

export default connect(mapStateToProps)(SideNav);

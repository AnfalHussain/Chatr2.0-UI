import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as actionCreators from "../redux/actions";
import { connect } from "react-redux";

class LoginForm extends Component {
    state = {
        username: "",
        password: ""
    };


    componentWillUnmount() {
        if (this.props.errors.length) this.props.resetErrors();
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = e => {
        e.preventDefault();

        this.props.login(this.state, this.props.history);

    };

    render() {
        const type = this.props.match.url.substring(1);


        if (this.props.user) return <Redirect to="/" />

        const errors = this.props.errors;

        return (
            <div id="loginForm" className="card col-6 mx-auto p-0 mt-5  ">
                <div className="card-body">
                    <h5 className="card-title mb-4 textlog reg">
                        Login
          </h5>
                    <form onSubmit={this.submitHandler}>


                        {!!errors.length && (
                            <div className="alert alert-danger" role="alert">
                                {errors.map(error => (
                                    <p key={error}>{error}</p>
                                ))}
                            </div>
                        )}

                        <div className="form-group">
                            <input
                                className="form-control"
                                id="btnin"
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                id="btnin"
                                placeholder="Password"
                                name="password"
                                onChange={this.changeHandler}
                            />

                        </div>
                        <input
                            className="btn btn-primary btn-block btn-rounded"
                            id="btnlog"
                            type="submit"
                            value={type.replace(/^\w/, c => c.toUpperCase())}
                        />
                    </form>
                </div>
                <div>
                    <Link
                        to="/signup"
                        id="textlog"
                        className="btn btn-small btn-link">


                        Create an account
                    </Link>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors.errors,
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (userData, history) => dispatch(actionCreators.login(userData, history)),
        resetErrors: () => dispatch(actionCreators.resetErrors())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
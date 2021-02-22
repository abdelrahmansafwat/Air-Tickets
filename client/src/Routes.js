import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Login from "./Login";
import history from './history';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/login" component={Login} />
                </Switch>
            </Router>
        )
    }
}
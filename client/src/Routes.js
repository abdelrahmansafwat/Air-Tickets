import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Search from "./Search";
import Reserve from './Reserve';
import history from './history';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Search} />
                    <Route path="/reserve" component={Reserve} />
                </Switch>
            </Router>
        )
    }
}
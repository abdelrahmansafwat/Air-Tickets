import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Search from "./Search";
import Reserve from './Reserve';
import Success from './components/Success';
import Privacy from './components/Privacy';
import history from './history';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Search} />
                    <Route path="/applive" component={Search} />
                    <Route path="/reserve" component={Reserve} />
                    <Route path="/success" component={Success} />
                    <Route path="/privacy-policy" component={Privacy} />
                </Switch>
            </Router>
        )
    }
}
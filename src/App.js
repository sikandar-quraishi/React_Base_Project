import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import About from "./components/pages/About";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);

  // state = {
  //   users: [],
  //   repos: [],
  //   user: {},
  //   loading: false,
  //   alert: null
  // };

  // Search Github Users --->  Passing Prop Up   =====child to parent props=====
  const searchUsers = async (text) => {
    setLoading(true);
    // this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
    // this.setState({ users: res.data.items, loading: false });
  };

  // Get Singel User --->  Passing Prop Up   =====child to parent props=====
  const getUser = async (username) => {
    setLoading(true);
    // this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
    // this.setState({ user: res.data, loading: false });
  };

  // Get Singel User Repos--->  Passing Prop Up   =====child to parent props=====
  const getUserRepos = async (username) => {
    setLoading(true);

    // this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort_created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
    // this.setState({ repos: res.data, loading: false });
  };

  // Clear Users from state             =====child to parent props=====
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
    // this.setState({ users: [], loading: false });
  };

  // setAlert                           =====child to parent props=====
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    // this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => setAlert(null), 3000);

    // setTimeout(() => this.setState({ alert: null }), 3000);
  };

  // render() {
  // const { users, user, loading, repos } = this.state;
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <Alert alert={alert} />
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
// }

export default App;

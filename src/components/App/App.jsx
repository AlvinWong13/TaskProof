import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import Profile from '../Profile/Profile'
import Home from '../Home/Home';
import Team from '../Team/Team';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/landing" />

        <ProtectedRoute
            // logged in shows UserPage else shows LandingPage
            exact
            path="/team"
          >
              <Team />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LandingPage
            exact
            path="/home"
          >
              <Home />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Calendar else shows LandingPage
            exact
            path="/profile"
          >
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/landing"
            // - else shows LandingPage at "/home"
            exact
            path="/landing"
            authRedirect="/home"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

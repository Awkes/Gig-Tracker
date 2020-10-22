import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';

import theme from './theme';
import { AuthContextProvider } from './contexts/AuthContext';
import GuardedRoute from './components/GuardedRoute';
import Layout from './components/Layout';
import Home from './views/Home';
import GigEditor from './views/GigEditor';
import GigInfo from './views/GigInfo';
import Gigs from './views/Gigs';
import NotFound from './views/NotFound';
import Stats from './views/Stats';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router>    
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <GuardedRoute path="/gigs">
                <Gigs />
              </GuardedRoute>
              <GuardedRoute path="/gig/:id">
                <GigInfo />
              </GuardedRoute>
              <GuardedRoute path="/add-gig" key="add-gig">
                <GigEditor />
              </GuardedRoute>
              <GuardedRoute  path="/edit-gig/:id" key="edit-gig">
                <GigEditor />
              </GuardedRoute>
              <GuardedRoute path="/stats">
                <Stats />
              </GuardedRoute>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;

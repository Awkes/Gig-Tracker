import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';

import theme from './config/theme';
import routes from './config/routes';

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
  const { homePath, gigsPath, gigPath, addGigPath, editGigPath, statsPath } = routes;
  return (
    <ThemeProvider theme={theme}>
      <Router>    
        <AuthContextProvider>
          <Layout>
            <Switch>
              <Route exact path={homePath}>
                <Home />
              </Route>
              <GuardedRoute path={gigsPath}>
                <Gigs />
              </GuardedRoute>
              <GuardedRoute path={gigPath+'/:id'}>
                <GigInfo />
              </GuardedRoute>
              <GuardedRoute path={addGigPath} key={addGigPath}>
                <GigEditor />
              </GuardedRoute>
              <GuardedRoute  path={editGigPath+'/:id'} key={editGigPath}>
                <GigEditor />
              </GuardedRoute>
              <GuardedRoute path={statsPath}>
                <Stats />
              </GuardedRoute>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Layout>
        </AuthContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

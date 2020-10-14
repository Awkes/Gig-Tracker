import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';

import theme from './theme';
import { AuthContextProvider } from './contexts/AuthContext';
import AuthRequired from './components/AuthRequired';
import Layout from './components/Layout';
import GigEditor from './views/GigEditor';
import Gigs from './views/Gigs';
import NotFound from './views/NotFound';
import Stats from './views/Stats';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router>    
          <Layout>
            <AuthRequired>
              <Switch>
                <Route exact path="/">
                  <Gigs />
                </Route>
                <Route path="/add-gig">
                  <GigEditor />
                </Route>
                <Route  path="/edit-gig">
                  <GigEditor />
                </Route>
                <Route path="/stats">
                  <Stats />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </AuthRequired>
          </Layout>
        </Router>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;

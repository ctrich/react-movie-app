import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Home from '../screens/Home';
import Details from '../screens/Details';
import SearchResults from '../screens/SearchResults';

const App = () => (
  <div>
    <BrowserRouter>
      <Route component={Header} />
      <Route exact path="/" component={Home} />
      <Route path="/search" component={SearchResults} />
      <Route path="/details/" component={Details} />
    </BrowserRouter>
  </div>
);

export default App;

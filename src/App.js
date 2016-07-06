import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NewsFeed from './NewsFeed';

injectTapEventPlugin();

const feedUrl = "http://thenextweb.com/feed/";

class App extends React.Component {
  render() {
    return (
      <NewsFeed url={feedUrl} />
    );
  }
}

export default App;

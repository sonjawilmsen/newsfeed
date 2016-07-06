import React from 'react';
import $ from 'jquery';
import NewsItem from './NewsItem';

import { containerStyle } from './styles/containers';
import { row } from './styles/grid';

class NewsFeed extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "Loading...",
      newsItems: []
    };
  }

  componentDidMount() {
    this.loadNews();
  }

  loadNews() {
    let url = this.props.url;
    let component = this;

    $.ajax({
       type: "GET",
       url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
       dataType: 'json',
       error: function(){
         console.log('Unable to load feed, Incorrect path or invalid feed');
       },
       success: function(xml){
         component.setState({
           title: xml.responseData.feed.title,
           newsItems: xml.responseData.feed.entries
         });
       }
     });
  }

  renderNewsItem(item, index) {
    console.log(item);

    // Get the image from the HTML content snippet
    var content = $("<div/>").html(item.content);
    var image = $("img", content).attr("src");

    return (
      <NewsItem
        key={index}
        title={item.title}
        image={image}
        description={item.contentSnippet}
        link={item.link} />
    );
  }

  render() {
    let title = this.state.title;
    let newsItems = this.state.newsItems;

    return (
      <div style={containerStyle}>
        <h1>{title}</h1>

        <div style={row}>
          {newsItems.map(this.renderNewsItem.bind(this))}
        </div>
      </div>
    );
  }
}

export default NewsFeed;

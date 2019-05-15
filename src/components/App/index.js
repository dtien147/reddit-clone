import React, { Component } from 'react';
import moment from 'moment';
import Topic from '../Topic';
import './styles.scss';

class Index extends Component {
  constructor(props) {
    super(props);

    this.onUpvote = this.onUpvote.bind(this);
    this.onDownvote = this.onDownvote.bind(this);
  }

  onUpvote() {
  }

  onDownvote() {

  }

  render() {
    const topics = [
      {
        id: '1234',
        author: 'test 1',
        content: 'test a',
        votes: 1,
      },
      {
        id: '12345',
        author: 'test 2',
        content: 'test b',
        votes: 2,
      },
      {
        id: '12346',
        author: 'test 3',
        content: 'test c',
        votes: 3,
      },
      {
        id: '12347',
        author: 'test 4',
        content: 'test d',
        votes: 4,
      }
    ];
    return (
      <div className="app">
        <div className="topics">
          {topics.map(topic =>
            <Topic
              key={topic.id}
              content={topic.content}
              author={topic.author}
              createdAt={topic.createdAt}
              votes={topic.votes}
              upvote={this.onUpvote}
              downvote={this.onDownvote}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Index;

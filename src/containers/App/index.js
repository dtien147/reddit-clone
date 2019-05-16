import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTopics } from './actions';
import Topic from '../../components/Topic';
import Spinner from '../../components/Spinner';
import './styles.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.onUpvote = this.onUpvote.bind(this);
    this.onDownvote = this.onDownvote.bind(this);
  }

  componentDidMount() {
    this.props.actions.getTopics();
  }

  onUpvote() {

  }

  onDownvote() {

  }

  render() {
    const { isGettingTopics, topics } = this.props;
    if (isGettingTopics) {
      return <Spinner />
    }

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

const mapStateToProps = state => ({
  topics: state.AppReducer.get('topics'),
  isGettingTopics: state.AppReducer.get('isGettingTopics'),
});

const mapDispathToProps = dispatch => ({
  actions: bindActionCreators({
    getTopics,
  }, dispatch),
});

App.propTypes = {
  actions: PropTypes.shape({
    getTopics: PropTypes.func.isRequired,
  }).isRequired,
  isGettingTopics: PropTypes.bool,
};

App.defaultProps = {
  isGettingTopics: false,
};

export default connect(mapStateToProps, mapDispathToProps)(App);

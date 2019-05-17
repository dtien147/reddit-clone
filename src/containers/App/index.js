import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  createTopic,
  getTopics,
  downvoteTopic,
  upvoteTopic,
} from './actions';
import Topic from '../../components/Topic';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import './styles.scss';

const MAX_LENGTH = 255;
const ERROR_MESSAGE = {
  EMPTY: 'Content must not be empty.',
  EXCEED_MAX_LENGTH: 'Content must not exceed 255 characters.',
};

class App extends Component {
  constructor(props) {
    super(props);

    this.onUpvote = this.onUpvote.bind(this);
    this.onDownvote = this.onDownvote.bind(this);
    this.onCreateTopic = this.onCreateTopic.bind(this);
    this.onShowCreateTopicModal = this.onShowCreateTopicModal.bind(this);
    this.onCloseCreateTopicModal = this.onCloseCreateTopicModal.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      showCreateTopicModal: false,
      error: null,
    };
  }

  /**
   * Get topics after component mount
   */
  componentDidMount() {
    this.props.actions.getTopics();
  }

  /**
   * Upvote a topic
   * @param {Event} e
   */
  onUpvote(e) {
    const topicId = e.target.id;
    this.props.actions.upvoteTopic(topicId);
  }

  /**
   * Downvote a topic
   * @param e
   */
  onDownvote(e) {
    const topicId = e.target.id;
    this.props.actions.downvoteTopic(topicId);
  }

  onCloseCreateTopicModal() {
    this.setState({ showCreateTopicModal: false });
  }

  onShowCreateTopicModal() {
    this.newTopic = {}
    this.setState({ showCreateTopicModal: true });
  }

  /**
   * Check if topic's content is valid
   * If it's valid then calling api to create topic
   * Otherwise show error message
   */
  onCreateTopic() {
    if (!this.newTopic.content) {
      this.setState({ error: ERROR_MESSAGE.EMPTY });
    } else if (this.newTopic.content.length > MAX_LENGTH) {
      this.setState({ error: ERROR_MESSAGE.EXCEED_MAX_LENGTH });
    } else {
      this.props.actions.createTopic(this.newTopic);
      this.onCloseCreateTopicModal();
      this.setState({ error: null });
    }
  }

  /**
   * Update topic's content in component's property
   * We don't need to re-render component
   * So we store it in component's property instead of component's state
   * @param {Event} e
   */
  onChange(e) {
    this.newTopic.content = e.target.value;
  }

  renderModalContent() {
    const { error } = this.state;

    return (
      <div>
        <textarea className="new-post-content" onChange={this.onChange}/>
        <span className="error-message">{error}</span>
      </div>
    );
  }

  render() {
    const { isGettingTopics, isCreatingTopics, topics } = this.props;
    const { showCreateTopicModal } = this.state;
    if (isGettingTopics || isCreatingTopics) {
      return <Spinner />
    }

    return (
      <div className="app">
        <div className="container">
          <div className="topics">
            {topics.map(topic =>
              <Topic
                key={topic.id}
                id={topic.id}
                content={topic.content}
                author={topic.author}
                createdAt={topic.createdAt}
                votes={topic.votes}
                upvote={this.onUpvote}
                downvote={this.onDownvote}
              />
            )}
          </div>
          <div className="home">
            <div className="address-wrapper">
              <div className="robot" />
              <div className="address">Home</div>
            </div>
            <Button
              className="create-post-btn"
              onClick={this.onShowCreateTopicModal}
              text="CREATE POST"
            />
          </div>
          <Modal
            className="create-topic-modal"
            show={showCreateTopicModal}
            header="New Topic"
            content={this.renderModalContent()}
            footer={<Button onClick={this.onCreateTopic} text="Post" />}
            onCloseModal={this.onCloseCreateTopicModal}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.AppReducer.get('topics'),
  isGettingTopics: state.AppReducer.get('isGettingTopics'),
  isCreatingTopics: state.AppReducer.get('isCreatingTopics'),
});

const mapDispathToProps = dispatch => ({
  actions: bindActionCreators({
    getTopics,
    createTopic,
    downvoteTopic,
    upvoteTopic,
  }, dispatch),
});

App.propTypes = {
  actions: PropTypes.shape({
    getTopics: PropTypes.func.isRequired,
    createTopic: PropTypes.func.isRequired,
    downvoteTopic: PropTypes.func.isRequired,
    upvoteTopic: PropTypes.func.isRequired,
  }).isRequired,
  isGettingTopics: PropTypes.bool,
};

App.defaultProps = {
  isGettingTopics: false,
};

export default connect(mapStateToProps, mapDispathToProps)(App);

import React  from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Topic = React.memo(function Topic({
  content,
  votes,
  author,
  createdAt,
  upvote,
  downvote
}) {
  return (
    <div className="topic">
      <div className="vote-wrapper">
        <button onClick={upvote} className="upvote-btn">
          <i className="fas fa-arrow-up" />
        </button>
        <div className="votes">{votes}</div>
        <button onClick={downvote} className="downvote-btn">
          <i className="fas fa-arrow-down" />
        </button>
      </div>
      <div className="content-wrapper">
        <div className="header">Posted by {author} {createdAt}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  );
});

Topic.propTypes = {
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default Topic;

import React  from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Topic = React.memo(function Topic({
  id,
  content,
  votes,
  upvote,
  downvote
}) {
  return (
    <div className="topic">
      <div className="vote-wrapper">
        <button onClick={upvote} className="upvote-btn" id={id}>
          <i className="fas fa-arrow-up" id={id}/>
        </button>
        <div className="votes">{votes}</div>
        <button onClick={downvote} className="downvote-btn" id={id}>
          <i className="fas fa-arrow-down" id={id} />
        </button>
      </div>
      <div className="content-wrapper">
        <div className="content">{content}</div>
      </div>
    </div>
  );
});

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default Topic;

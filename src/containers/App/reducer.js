import { Map as MapImmutable } from 'immutable';
import orderBy from 'lodash/orderBy';
import {
  GET_TOPICS_EVENT,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILED,
  CREATE_TOPIC_EVENT,
  CREATE_TOPIC_SUCCESS,
  CREATE_TOPIC_FAILED,
  UPVOTE_TOPIC_EVENT,
  UPVOTE_TOPIC_SUCCESS,
  UPVOTE_TOPIC_FAILED,
  DOWNVOTE_TOPIC_EVENT,
  DOWNVOTE_TOPIC_SUCCESS,
  DOWNVOTE_TOPIC_FAILED,
} from './events';

const initialState = new MapImmutable({
  isGettingTopics: false,
  isCreatingTopics: false,
  topics: [],
  getTopicsError: null,
});

const actionHandlers = {};

const sortTopicsByVotesDescending = topics => orderBy(topics, ['votes'], ['desc']);

const updateTopicInState = (topic, state) => {
  const topics = state.get('topics');
  const topicIndex = topics.findIndex(item => item.id === topic.id);

  topics[topicIndex] = { ...topic };

  return sortTopicsByVotesDescending([...topics]);
};

actionHandlers[GET_TOPICS_EVENT] = state => state
  .set('isGettingTopics', true);

actionHandlers[GET_TOPICS_SUCCESS] = (state, action) => state
  .set('topics', action.payload)
  .set('isGettingTopics', false);

actionHandlers[GET_TOPICS_FAILED] = (state, action) => state
  .set('getTopicsError', action.error)
  .set('isGettingTopics', false);

actionHandlers[CREATE_TOPIC_EVENT] = state => state
  .set('isCreatingTopics', true);

actionHandlers[CREATE_TOPIC_SUCCESS] = (state, action) => {
  const newTopic = action.payload;
  const topics = sortTopicsByVotesDescending([ newTopic, ...state.get('topics')]);

  return state
    .set('topics', topics)
    .set('isCreatingTopics', false);
};

/**
 * CREATE_TOPIC_FAILURE
 * @param {Object} state Current state
 * @param {Object} action
 * @return {Object} Next state
 */
actionHandlers[CREATE_TOPIC_FAILED] = (state, action) => state
  .set('getTopicsError', action.error)
  .set('isCreatingTopics', false);

/**
 * UPVOTE_TOPIC_START
 * @param {Object} state Current state
 * @return {Object} Next state
 */
actionHandlers[UPVOTE_TOPIC_EVENT] = state => state
  .set('isChangingVotes', true);

/**
 * UPVOTE_TOPIC_SUCCESS
 * @param {Object} state Current state
 * @param {Object} action
 * @return {Object} Next state
 */
actionHandlers[UPVOTE_TOPIC_SUCCESS] = (state, action) => state
  .set('topics', updateTopicInState(action.payload, state))
  .set('isChangingVotes', false);

/**
 * UPVOTE_TOPIC_FAILURE
 * @param {Object} state Current state
 * @param {Object} action
 * @return {Object} Next state
 */
actionHandlers[UPVOTE_TOPIC_FAILED] = (state, action) => state
  .set('getTopicsError', action.error)
  .set('isChangingVotes', false);

/**
 * DOWNVOTE_TOPIC_START
 * @param {Object} state Current state
 * @return {Object} Next state
 */
actionHandlers[DOWNVOTE_TOPIC_EVENT] = state => state
  .set('isChangingVotes', true);

/**
 * DOWNVOTE_TOPIC_SUCCESS
 * @param {Object} state Current state
 * @param {Object} action
 * @return {Object} Next state
 */
actionHandlers[DOWNVOTE_TOPIC_SUCCESS] = (state, action) => state
  .set('topics', updateTopicInState(action.payload, state))
  .set('isChangingVotes', false);

/**
 * DOWNVOTE_TOPIC_FAILURE
 * @param {Object} state Current state
 * @param {Object} action
 * @return {Object} Next state
 */
actionHandlers[DOWNVOTE_TOPIC_FAILED] = (state, action) => state
  .set('getTopicsError', action.error)
  .set('isChangingVotes', false);


/**
 * Action Handlers
 * @param {Object} state Current state
 * @param {Object} action
 * @return {Object} Next state
 */
export default (state = initialState, action) => {
  const fn = actionHandlers[action.type];
  return fn ? fn(state, action) : state;
};

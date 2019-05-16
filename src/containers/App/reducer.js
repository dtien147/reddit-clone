import { Map as MapImmutable } from 'immutable';
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
  topics: [],
  getTopicsError: null,
});

const actionHandlers = {};

/**
 * GET_TOPICS_START
 * @param {Object} state Current state
 * @return {Object} Next state
 */
actionHandlers[GET_TOPICS_EVENT] = state => state
  .set('isGettingTopics', true);

/**
 * GET_TOPICS_SUCCESS
 * @param {Object} state Current state
 * @param {Object} action
 * @return {Object} Next state
 */
actionHandlers[GET_TOPICS_SUCCESS] = (state, action) => state
  .set('topics', action.payload)
  .set('isGettingTopics', false);

/**
 * GET_TOPICS_FAILURE
 * @param {Object} state Current state
 * @param {Object} action
 * @return {Object} Next state
 */
actionHandlers[GET_TOPICS_FAILED] = (state, action) => state
  .set('getTopicsError', action.error)
  .set('isGettingTopics', false);

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

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
import {
  API_GET_TOPICS,
  API_CREATE_TOPIC,
  API_UPVOTE_TOPIC,
  API_DOWNVOTE_TOPIC,
} from './constants';
import { getRequest, postRequest } from '../../utils/api';

export const getTopicsEvent = () => ({
  type: GET_TOPICS_EVENT,
});

export const getTopicsSuccess = payload => ({
  type: GET_TOPICS_SUCCESS,
  payload,
});

export const getTopicsFailed = error => ({
  type: GET_TOPICS_FAILED,
  error,
});

/**
 * Get topics action
 */
export const getTopics = () =>
  async (dispatch) => {
    try {
      const url = API_GET_TOPICS;
      dispatch(getTopicsEvent());
      const response = await getRequest(url);
      const { data } = response;
      dispatch(getTopicsSuccess(data));
    } catch (error) {
      dispatch(getTopicsFailed(error));
    }
  };

export const createTopicEvent = () => ({
  type: CREATE_TOPIC_EVENT,
});

export const createTopicSuccess = payload => ({
  type: CREATE_TOPIC_SUCCESS,
  payload,
});

export const createTopicFailed = error => ({
  type: CREATE_TOPIC_FAILED,
  error,
});

/**
 * Create topic action
 * @param {Object} newTopic
 */
export const createTopic = (newTopic) =>
  async (dispatch) => {
    try {
      const url = API_CREATE_TOPIC;
      dispatch(createTopicEvent());
      const response = await postRequest(url, newTopic);
      const { data } = response;
      dispatch(createTopicSuccess(data));
    } catch (error) {
      dispatch(createTopicFailed(error));
    }
  };

export const upvoteTopicEvent = () => ({
  type: UPVOTE_TOPIC_EVENT,
});

export const upvoteTopicSuccess = payload => ({
  type: UPVOTE_TOPIC_SUCCESS,
  payload,
});

export const upvoteTopicFailed = error => ({
  type: UPVOTE_TOPIC_FAILED,
  error,
});

export const upvoteTopic = (topicId) =>
  async (dispatch) => {
    try {
      const url = API_UPVOTE_TOPIC;
      dispatch(upvoteTopicEvent());
      const response = await postRequest(url, { id: topicId });
      const { data } = response;
      dispatch(upvoteTopicSuccess(data));
    } catch (error) {
      dispatch(upvoteTopicFailed(error));
    }
  };

export const downvoteTopicEvent = () => ({
  type: DOWNVOTE_TOPIC_EVENT,
});

export const downvoteTopicSuccess = payload => ({
  type: DOWNVOTE_TOPIC_SUCCESS,
  payload,
});

export const downvoteTopicFailed = error => ({
  type: DOWNVOTE_TOPIC_FAILED,
  error,
});

/**
 * Downvote topic action
 * @param {String} topicId
 */
export const downvoteTopic = (topicId) =>
  async (dispatch) => {
    try {
      const url = API_DOWNVOTE_TOPIC;
      dispatch(downvoteTopicEvent());
      const response = await postRequest(url, { id: topicId });
      const { data } = response;
      dispatch(downvoteTopicSuccess(data));
    } catch (error) {
      dispatch(downvoteTopicFailed(error));
    }
  };


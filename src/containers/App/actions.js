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
  API_CREATE_TOPICS,
  API_UPVOTE,
  API_DOWNVOTE,
} from './constants';
import {getRequest} from '../../utils/api';

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

export const getTopics = () =>
  async (dispatch) => {
    try {
      const url = API_GET_TOPICS;
      dispatch(getTopicsEvent());
      const response = await getRequest(url);;
      const { data } = response;
      dispatch(getTopicsSuccess(data));
    } catch (error) {
      console.debug(error);
      dispatch(getTopicsFailed(error));
    }
  };

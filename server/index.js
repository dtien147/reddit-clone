const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const orderBy = require('lodash/orderBy');

const port = process.env.PORT || 5000;
const app = express();
const SORT_NAME = 'votes';
const SORT_ORDER = 'desc';
const MAX_CONTENT_LENGTh = 255;

const ERROR_MESSAGE = {
  NOT_EMPTY: 'Content must not be empty.',
  EXCEED_MAX_LENGTH: 'Content must not exceed 255 characters.',
};

const topics = [
  {
    id: '1234',
    content: 'test a',
    votes: 1,
  },
  {
    id: '12345',
    content: 'test b',
    votes: 2,
  },
  {
    id: '12346',
    content: 'test c',
    votes: 3,
  },
  {
    id: '12347',
    content: 'test d',
    votes: 4,
  }
];

app.use(express.json());
app.use(cors());

app.get('/api', function(req, res) {
  res.send('API OK');
});

/**
 * API for getting topic list
 * Return a list of top 20 topics (sorted by upvotes, descending)
 */
app.get('/api/topics', function(req, res){
  res.send(orderBy(topics, [SORT_NAME], [SORT_ORDER]).slice(0, 20));
});

/**
 * API for creating topics
 * Receive topic's content from user
 * Then generate topic's id and add it to topic list
 */
app.post('/api/topics', function(req, res) {
  const newTopic = req.body;
  if (!newTopic.content) {
    res.status(400);
    res.send(ERROR_MESSAGE.NOT_EMPTY);
  } else if (newTopic.content.length > MAX_CONTENT_LENGTh) {
    res.status(400);
    res.send(ERROR_MESSAGE.EXCEED_MAX_LENGTH);
  } else {
    newTopic.id = uuid.v4();
    newTopic.votes = 0;
    topics.push(newTopic);
    res.send(newTopic);
  }
});

/**
 * API for upvoting a topic
 * Receive topic's id from user
 * Then increase its vote by 1
 */
app.post('/api/topics/upvote', function(req, res) {
  const topicId = req.body.id;
  const topic = topics.find(item => item.id === topicId);
  topic.votes += 1;
  res.send(topic);
});

/**
 * API for downvoting a topic
 * Receive topic's id from user
 * Then decrease its vote by 1
 */
app.post('/api/topics/downvote', function(req, res) {
  const topicId = req.body.id;
  const topic = topics.find(item => item.id === topicId);
  topic.votes -= 1;
  res.send(topic);
});

app.listen(port, () => {
  console.log('API Online');
});

const express = require('express');
const uuid = require('uuid');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();
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

app.use(express.json());
app.use(cors());

app.get('/api', function(req, res) {
  res.send('API OK');
});

app.get('/api/topics', function(req, res){
  res.send(topics);
});

app.post('/api/topics', function(req, res) {
  const newTopic = req.body;
  newTopic.id = uuid.v4();
  topics.push(newTopic);
  res.send(newTopic);
});

app.post('/api/topics/upvote', function(req, res) {
  const topicId = req.body.id;
  const topic = topics.find(item => item.id === topicId);
  topic.upvote += 1;
  res.send('OK');
});

app.post('/api/topics/downvote', function(req, res) {
  const topicId = req.body.id;
  const topic = topics.find(item => item.id === topicId);
  topic.upvote -= 1;
  res.send('OK');
});

app.listen(port, () => {
  console.log('API Online');
});

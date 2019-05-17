Title: Reddit clone with upvote and downvotes.

## Table of Contents

- [Test](#test)
- [Implementation](#implementation)

## Test

| Test case | Status |
| --- | --- |
| Show top votes topics on home page | Passed |
| Create topic | Passed |
| Not allow create empty topic | Passed |
| Not allow create topic which content exceed 255 characters | Passed
| Upvote topic one time | Passed |
| Upvote topic multiple times | Passed |
| Downvote topic one time | Passed |
| Downvote topic multiple time | Passed |

## Implementation
### Server
#### Get topics
Getting top 20 votes topic (sorted by upvotes, descending)
url: /api/topics
method: GET
status: 200
response:
```sh
[
  {
    "id": "12347",
    "content": "test d",
    "votes": 4
  }
]
```
#### Create topic
Create topic if its content is valid. Otherwise throw error
url: /api/topics
method: POST

status: 200
body
```sh
{
    "content": "test d",
}
```
response:
```sh
{
    "id": "12347",
    "content": "test d",
    "votes": 4
}
```

status: 400
response:
```sh
Content must not be empty.
```
#### Upvote topic
Find user's topic by id then upvote it
url: /api/topics/upvote
method: POST
status: 200
body:
```sh
{
    "id": "12347"
}
```
response:
```sh
{
    "id": "12347",
    "content": "test d",
    "votes": 4
}
```
#### Downvote topic
Find user's topic by id then downvote it
url: /api/topics/downvote
method: POST
status: 200
body:
```sh
{
    "id": "12347"
}
```
response:
```sh
{
    "id": "12347",
    "content": "test d",
    "votes": 4
}
```
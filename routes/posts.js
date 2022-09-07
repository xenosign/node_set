// @ts-check

const express = require('express');

const postRouter = express.Router();

const POST = [
  { title: 'first', content: '😆' },
  { title: 'second', content: '😁😀' },
];

postRouter.get('/', (req, res) => {
  const postLen = POST.length;
  res.render('posts', { POST, postCounts: postLen });
});

postRouter.get('/:title', (req, res) => {
  const postData = POST.find((post) => post.title === req.params.title);
  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('title not found');
    err.statusCode = 404;
    throw err;
  }
});

postRouter.post('/', (req, res) => {
  if (req.query.title && req.query.content) {
    const newPost = {
      title: req.query.title,
      content: req.query.content,
    };

    POST.push(newPost);
    res.send('글 등록완료!');
  } else {
    const err = new Error('Unexpected Query');
    err.statusCode = 404;
    throw err;
  }
});

postRouter.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const postData = POST.find((post) => post.title === req.params.title);
    if (postData) {
      const arrIndex = POST.findIndex(
        (post) => post.title === req.params.title
      );
      const modifyPost = {
        title: req.query.title,
        content: req.query.content,
      };
      POST[arrIndex] = modifyPost;
      res.send('글내용 수정 완료');
    } else {
      const err = new Error('title not found');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('Unexpected Query');
    err.statusCode = 404;
    throw err;
  }
});

postRouter.delete('/:title', (req, res) => {
  const arrIndex = POST.findIndex((post) => post.title === req.params.title);
  if (arrIndex !== -1) {
    POST.splice(arrIndex, 1);
    res.send('글 삭제 완료');
  } else {
    const err = new Error('title not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = postRouter;

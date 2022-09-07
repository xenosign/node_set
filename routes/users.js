// @ts-check
const express = require('express');

const router = express.Router();
const USER = [
  {
    id: 'tetz',
    name: '이효석',
    email: 'xenosign@naver.com',
  },
  {
    id: 'test',
    name: '테스트',
    email: 'test@test',
  },
];

// 회원 목록
router.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('users', { USER, userCounts: userLen });
});

// 회원 정보(id)
router.get('/:userID', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.userID);
  if (userData) res.send(userData);
  else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 등록
router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.send('회원 등록 완료');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.redirect('/users');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 정보 수정
router.put('/:userID', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const arrIndex = USER.findIndex((user) => user.id === req.params.userID);
    if (arrIndex !== -1) {
      USER[arrIndex].id = req.query.id;
      USER[arrIndex].name = req.query.name;
      USER[arrIndex].email = req.query.email;
      res.send('회원정보 수정 완료');
    } else {
      const err = new Error('ID not found');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('Unexpected query');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 삭제
router.delete('/:userID', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.userID);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;

// @ts-check
const express = require('express');

const router = express.Router();
const ARTICLE = [
  {
    title: 'title',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia delectus iusto fugiat autem cupiditate adipisci quas, in consectetur repudiandae, soluta, suscipit debitis veniam nobis aspernatur blanditiis ex ipsum tempore impedit.',
  },
  {
    title: 'title',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia delectus iusto fugiat autem cupiditate adipisci quas, in consectetur repudiandae, soluta, suscipit debitis veniam nobis aspernatur blanditiis ex ipsum tempore impedit.',
  },
];

router.get('/', (req, res) => {
  const articleLen = ARTICLE.length;
  res.render('board', { ARTICLE, articleCounts: articleLen });
});

router.get('/title/:title', (req, res) => {
  const article = ARTICLE.find(
    (_article) => _article.title === req.params.title
  );
  if (article) {
    res.send(article);
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newArticle = {
        title: req.query.title,
        content: req.query.content,
      };
      ARTICLE.push(newArticle);
      res.send('새로운 글 등록 완료');
    } else {
      const err = new Error('요청 쿼리 이상');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newArticle = {
        id: req.body.title,
        name: req.body.content,
      };
      ARTICLE.push(newArticle);
      res.redirect('/board');
    } else {
      const err = new Error('요청 이상');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('요청에 데이터가 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

router.put('/title/:title', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const arrIndex = ARTICLE.findIndex(
        (_article) => _article.title === req.params.title
      );
      if (arrIndex !== -1) {
        ARTICLE[arrIndex].id = req.query.id;
        ARTICLE[arrIndex].name = req.query.name;
        ARTICLE[arrIndex].email = req.query.email;
        res.send('글 수정 완료');
      } else {
        const err = new Error('해당 제목의 글이 없습니다.');
        err.statusCode = 404;
        throw err;
      }
    } else {
      const err = new Error('요청 쿼리 이상');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const arrIndex = ARTICLE.findIndex(
        (_article) => _article.title === req.params.title
      );
      if (arrIndex !== -1) {
        ARTICLE[arrIndex].id = req.body.id;
        ARTICLE[arrIndex].name = req.body.name;
        ARTICLE[arrIndex].email = req.body.email;
        res.send('글 수정 완료');
      } else {
        const err = new Error('해당 제목의 글이 없습니다.');
        err.statusCode = 404;
        throw err;
      }
    } else {
      const err = new Error('요청 쿼리 이상');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('요청에 데이터가 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 삭제
router.delete('/title/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (_article) => _article.title === req.params.title
  );
  if (arrIndex !== -1) {
    ARTICLE.splice(arrIndex, 1);
    res.send('글 삭제 완료');
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/write', (req, res) => {
  const articleLen = ARTICLE.length;
  res.render('board_write', { ARTICLE, articleCounts: articleLen });
});

module.exports = router;

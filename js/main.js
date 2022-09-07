// @ts-check

const http = require('http');
const { routes } = require('./route');

/**
 * 블로그용 서버 API 구성
 *
 * GET /posts          목록 가져오기
 * GET /posts/:id      글 내용 가져오기
 * POST /posts         새로운 글 올리기
 * PUT /posts/:id      기존 글 수정하기
 * DELETE /posts/:id   기존 글 삭제하기
 */

const server = http.createServer((req, res) => {
  const urlArr = req.url ? req.url.split('/') : [];

  console.log(urlArr);

  let id;

  if (urlArr.length > 2) {
    id = parseInt(urlArr[2], 10);
  } else {
    id = undefined;
  }

  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        req.url.search(_route.url) !== -1 &&
        _route.method === req.method &&
        _route.id === typeof id
    );

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (!route) {
      console.log('해당 API를 찾을 수 없습니다.');

      res.statusCode = 404;
      res.end('Not Found');
    } else {
      let newPost;

      if (req.method === 'POST' || req.method === 'PUT') {
        newPost = await new Promise((resolve) => {
          req.setEncoding('utf-8');
          req.on('data', (data) => {
            resolve(JSON.parse(data));
          });
        });
      }

      const result = await route.callback(id, newPost);

      res.statusCode = result.statusCode;
      res.end(JSON.stringify(result.body));
    }
  }

  main();

  // if (urlArr.length > 2) {
  //   id = parseInt(urlArr[2], 10);
  // }

  // if (req.url === '/posts' && req.method === 'GET') {
  //   const result = {
  //     posts: posts.map((post) => ({
  //       id: post.id,
  //       title: post.title,
  //     })),
  //     totalCount: posts.length,
  //   };

  //   res.setHeader('Content-Type', 'application/json; charset=utf-8');

  //   console.log('블로그의 글 목록을 가져오는 API 입니다');

  //   res.statusCode = 200;
  //   res.end(JSON.stringify(result));
  // } else if (urlArr[1] === 'posts' && req.method === 'GET') {
  //   const result = posts.find((post) => post.id === id);

  //   res.setHeader('Content-Type', 'application/json; charset=utf-8');

  //   if (result) {
  //     console.log('블로그의 특정 글 내용을 보여줄 API  입니다');
  //     console.log(`Post ID 값은 ${id} 입니다`);

  //     res.statusCode = 200;
  //     res.end(JSON.stringify(result));
  //   } else {
  //     console.log('포스트를 찾을 수 없습니다.');

  //     res.statusCode = 404;
  //     res.end('포스트를 찾을 수 없습니다.');
  //   }
  // } else if (req.url === '/posts' && req.method === 'POST') {
  //   req.setEncoding('utf-8');
  //   req.on('data', (data) => {
  //     const newPost = JSON.parse(data);
  //     console.log(data);
  //     posts.push({
  //       id: posts[posts.length - 1].id + 1,
  //       title: newPost.title,
  //       content: newPost.content,
  //     });
  //   });

  //   console.log('블로그의 글을 올릴 때 호출할 API 입니다');

  //   res.statusCode = 200;
  //   res.end('새로운 글 등록!');
  // } else if (urlArr[1] === 'posts' && req.method === 'PUT') {
  //   req.setEncoding('utf-8');
  //   req.on('data', (data) => {
  //     const modifyPost = JSON.parse(data);
  //     modifyPost.id = id;
  //     posts[id - 1] = modifyPost;

  //     res.statusCode = 200;
  //     res.end(`수정 된 포스트의 id 번호는 ${id} 입니다.`);
  //   });

  //   console.log('블로그의 글을 수정 때 호출할 API 입니다');
  //   console.log(`Post ID 값은 ${id} 입니다`);
  // } else if (urlArr[1] === 'posts' && req.method === 'DELETE') {
  //   posts.splice(id - 1, 1);

  //   console.log('블로그의 글을 삭제 때 호출할 API 입니다');
  //   console.log(`Post ID 값은 ${id} 입니다`);

  //   res.statusCode = 200;
  //   res.end(`Delete Post, id is ${id}`);
  // } else {
  //   res.statusCode = 400;
  //   res.end('Not Found');
  //   console.log('해당 API를 찾을 수 없습니다.');
  // }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`해당 서버는 ${PORT}에서 작동 중입니다.`);
});

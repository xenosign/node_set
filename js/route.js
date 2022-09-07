// @ts-check

/**
 * @typedef Post
 * @property {number} id
 * @property {string} title
 * @property {string} content
 */

// /** @type {Post[]} */
// const posts = [
//   {
//     id: 1,
//     title: '첫번째 블로그 글',
//     content: '첫번째 내용입니다.',
//   },
//   {
//     id: 2,
//     title: '두번째 블로그 글',
//     content: '두번째 내용입니다',
//   },
// ];

const fs = require('fs');

async function getPosts() {
  const jsonPosts = await fs.promises.readFile('database.json', 'utf-8');
  return JSON.parse(jsonPosts).posts;
}

async function savePosts(posts) {
  const content = {
    posts,
  };

  return fs.promises.writeFile(
    'database.json',
    JSON.stringify(content),
    'utf-8'
  );
}

const routes = [
  // 목록 가져오기 API
  {
    url: '/posts',
    method: 'GET',
    id: 'undefined',
    callback: async () => ({
      statusCode: 200,
      body: {
        posts: await getPosts(),
        totalCount: posts.length,
      },
    }),
  },

  // 특정 id 의 글을 가져오는 API
  {
    url: '/posts',
    id: 'number',
    method: 'GET',
    callback: async (postId) => {
      const posts = await getPosts();

      const id = postId;
      if (!id) {
        return {
          statusCode: 404,
          body: 'Not found',
        };
      }

      const result = posts.find((post) => post.id === id);

      if (!result) {
        return {
          statusCode: 404,
          body: 'Not found',
        };
      }

      return {
        statusCode: 200,
        body: result,
      };
    },
  },

  // 새로운 글을 쓰는 API
  {
    url: '/posts',
    method: 'POST',
    id: 'undefined',
    callback: async (id, newPost) => {
      const posts = await getPosts();

      posts.push({
        id: posts[posts.length - 1].id + 1,
        title: newPost.title,
        content: newPost.content,
      });

      savePosts(posts);

      return {
        statusCode: 200,
        body: 'posts uploaded',
      };
    },
  },

  // 포스트 수정하는 API
  {
    url: '/posts',
    method: 'PUT',
    id: 'number',
    callback: async (id, newPost) => {
      const posts = await getPosts();

      if (!id) {
        return {
          statusCode: 404,
          body: 'Not found',
        };
      }

      const result = posts.find((post) => post.id === id);

      if (!result) {
        return {
          statusCode: 404,
          body: 'ID not found',
        };
      }

      const modifyPost = newPost;
      modifyPost.id = id;
      posts[id - 1] = modifyPost;

      savePosts(posts);

      return {
        statusCode: 200,
        body: modifyPost,
      };
    },
  },

  // 포스트 삭제하는 API
  {
    url: '/posts',
    method: 'DELETE',
    id: 'number',
    callback: async (id) => {
      const posts = await getPosts();

      if (!id) {
        return {
          statusCode: 404,
          body: 'Not found',
        };
      }

      const result = posts.find((post) => post.id === id);

      if (!result) {
        return {
          statusCode: 404,
          body: 'ID not found',
        };
      }

      posts.splice(id - 1, 1);

      savePosts(posts);
      return {
        statusCode: 200,
        body: 'post deleted',
      };
    },
  },
];

module.exports = {
  routes,
};

// @ts-check

// const fs = require('fs');
// const posts = [
//   {
//     id: 1,
//     title: '첫번째 블로그 글11111',
//     content: '첫번째 내용입니다.',
//   },
//   {
//     id: 2,
//     title: '두번째 블로그 글',
//     content: '두번째 내용입니다',
//   },
// ];

// fs.writeFileSync('database.json', JSON.stringify(posts), 'utf-8');

// const fs = require('fs');

// async function readFile() {
//   const data = await fs.promises.readFile('database.json');
//   console.log(JSON.parse(data));
// }

// readFile();

const fs = require('fs').promises;

async function main() {
  let data = await fs.readFile('./readme.txt');
  console.log('1번', data.toString());
  data = await fs.readFile('./readme.txt');
  console.log('2번', data.toString());
  data = await fs.readFile('./readme.txt');
  console.log('3번', data.toString());
  data = await fs.readFile('./readme.txt');
  console.log('4번', data.toString());
}
main();

async function promise() {
  async function wait() {
    setTimeout(() => 'done', 3000);
  }

  const result = await wait();
  console.log(result);
}

promise();

// async function promise() {
//   const tetz = 'old';
//   if (tetz === 'old') {
//     return 'tetz is old';
//   } else {
//     return 'tetz is getting old';
//   }
// }

// async function test() {
//   const result = await promise();
//   console.log(result);
// }

// test();
// promise
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (data) {
//     console.log(data);
//   });

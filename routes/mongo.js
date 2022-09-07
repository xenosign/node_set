const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://tetz:qwer1234@cluster0.sdiakr0.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();

  const users = client.db('kdt1').collection('users');

  await users.deleteMany({});
  await users.insertMany([
    {
      name: 'pororo',
      age: 5,
    },
    {
      name: 'loopy',
      age: 6,
    },
    {
      name: 'crong',
      age: 4,
    },
  ]);

  await users.updateOne(
    {
      name: 'loopy',
    },
    {
      $set: {
        name: '루피',
      },
    }
  );

  const data = users.find().pretty();
  console.log(data);

  //   await data.forEach(console.log);

  await client.close();
}

main();

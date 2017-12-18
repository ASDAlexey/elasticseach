const csv = require('csv-parser');
const fs = require('fs');
const elasticsearch = require('elasticsearch');
const { promisify } = require('util');
const _ = require('highland');

const start = async () => {
  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    // log: 'trace'
  });

  await client.ping({ requestTimeout: 30000 });
  console.log('pinged server');

  try {
    await client.indices.create({ index: 'test' });
    console.log('created index');
  } catch (e) {
    if (e.status === 400) {
      console.log('Index already exist');
    } else throw e;
  }

  let body = [
    {
      id: '1',
      "firstname": "Piotr",
      "surname": "Petrov",
      "birthDate": "1981-01-01",
      "location": "Moscow, Russian Federation test_1",
      description: 'test',
      "skills": ["PHP", "HTML", "C++", ".NET", "JavaScript"]
    },
    {
      id: '2',
      "firstname": "Ivan",
      "surname": "Sidorov",
      "birthDate": "1978-12-13",
      "location": "Briansk, Russian Federation test_2",
      description: 'test',
      "skills": ["HTML", "Ruby", "Python"]
    },
    {
      id: '3',
      "firstname": "Stepan",
      "surname": "Fomenko",
      "birthDate": "1985-06-01",
      "location": "Ukraine test",
      description: 'test_1',
      "skills": ["HTML", "XML", "Java", "JavaScript"]
    },
  ].map(data => [{ index: { _index: 'test', _type: 'place', _id: data.id } }, data])
    .reduce((acc, val) => acc.concat(val), []);


  try {
    await client.bulk({ body });
    console.log(body);
    console.log('import was finished');
  } catch (e) {
    console.log(e);
  }
};

start();
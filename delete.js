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
  await client.indices.delete({ index: '*' });
  console.log('index remived')
};

start();
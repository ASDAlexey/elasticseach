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

  const query = 'test_1';

  console.time('t');

  try {
    const resp = await client.search({
      index: 'test',
      type: 'place',
      body: {
        // sort: [
        //   { place_rank_num: { order: 'desc' } },
        //   { importance_num: { order: 'desc' } }
        // ],
        // from: 0,
        // size: 1000,
        // query: {
        //   match: { description: 'description' },
        // },
        // query: {
        //   // match: { location: "test_1"}
        //   match_all: {}
        // }
        query: {
          bool: {
            should: [
              { match: { location: query } },
              { match: { description: query } },
            ]
          },
        },
        "highlight": {
          "fields": {
            "location": {},
            "description": {}
          }
        }
      }
    });
    console.log('/////');
    console.log(resp);
    const { hits } = resp.hits;
    console.log(hits);
    console.timeEnd('t');
  } catch (e) {
    console.log(e);
  }
};

start();
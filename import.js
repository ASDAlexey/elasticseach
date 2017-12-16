const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('./planet-latest-100k_geonames.tsv')
  .pipe(csv({ separator: '\t' }))
  .on('data', (data) => {
    data.alternative_names = data.alternative_names.split(',');
    data.lon_num = parseFloat(data.lon);
    data.lat_num = parseFloat(data.lat);
    data.place_rank_num = parseInt(data.place_rank, 10);
    data.importance_num = parseFloat(data.importance);
    console.log('Entry:', data);
    process.exit();
  });
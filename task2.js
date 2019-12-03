const csvPath = './example.csv';
const jsonPath = './example.txt';
const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');
const readStream = fs.createReadStream(csvPath, 'utf-8');
const writeStream = fs.createWriteStream(jsonPath);

// Fast simple solution
// readStream.pipe(csv()).pipe(writeStream);

pipeline(
    readStream,
    csv().preFileLine(
        (fileLine, idx) => idx === 0 ? fileLine.toLowerCase() : fileLine
    ),
    writeStream,
    (err) => err ? console.error('Convert file is failed', err) : console.log('File is converted')
);
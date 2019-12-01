const readline = require('readline').createInterface({input: process.stdin});

readline.on('line', line => line
    ? console.log(line.toString().split('').reverse().join(''))
    : null);
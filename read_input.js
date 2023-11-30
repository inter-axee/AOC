const fs = require('fs');
const path = require('path');

const readInFile = () => {
    const input_filename = path.resolve(process.cwd(), path.basename(process.argv[1], '.js').replace(/\D+$/, '') + '.in');
    let input = fs.readFileSync(input_filename, 'utf-8');
    return input.trim();
}

module.exports = {
    readInFile
}
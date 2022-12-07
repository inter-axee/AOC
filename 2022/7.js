const { readInFile } = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

const calculateSize = (dir, maxSize) => {
    let size = 0;
    let ans = 0;
    for (const file in dir.files)
        size += dir.files[file];

    for (const d in dir.dirs) {
        const [dirSize, dirAns] = calculateSize(dir.dirs[d], maxSize);
        size += dirSize;
        ans += dirAns;
    }
    if (size <= maxSize)
        ans += size;
    return [size, ans];
}

const buildDirectory = () => {
    let directory = { files: {}, dirs: {} };
    let pwd = directory;
    for (let i = 0; i < input.length; i++) {
        let line = input[i];
        if (line[0] === '$') {   //Command
            const [_, command, value] = line.split(' ');
            if (command === 'cd') {
                if (value === '/') {
                    pwd = directory;
                } else if (value === '..') {
                    pwd = pwd.parent;
                } else {                     //Navigate to folder
                    if (!pwd.dirs[value]) {
                        pwd.dirs[value] = { parent: pwd, files: {}, dirs: {} };
                    }
                    pwd = pwd.dirs[value];
                }
            } else if (command === 'ls') {
                i++;
                line = input[i];
                while (i < input.length && line[0] !== '$') {
                    if (line[0] !== 'd') {
                        pwd.files[line.split(' ')[1]] = parseInt(line.split(' ')[0]);
                    }
                    i++;
                    line = input[i];
                }
                i--;
            }
        }
    }
    return directory;
}

const getAllSizes = (dir) => {
    let size = 0;
    let sizes = [];
    for (const file in dir.files){
        size += dir.files[file];
    }

    for (const d in dir.dirs){
        const subSizes = getAllSizes(dir.dirs[d]);
        size += subSizes[subSizes.length-1];
        sizes = [...sizes, ...subSizes];
    }
    sizes.push(size);
    return sizes
} 

//Problem A
let result;
const directory = buildDirectory();
[_, result] = calculateSize(directory, 100000);
console.log(result); //1297683
//Problem B
const sizes = getAllSizes(directory);
sizes.sort((a,b) => a-b);
const totalSize = sizes[sizes.length-1];
const sizeLeft = 70000000 - totalSize;
const neededSize = 30000000 - sizeLeft;

for (let i = 0; i < sizes.length; i++){
    if (sizes[i] >= neededSize){
        console.log(sizes[i]);
        break;
    }
}

function parseInput(input_string) {
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim();
    });
}
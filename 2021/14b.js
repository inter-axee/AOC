const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
let original = input[0].trim();
let rules_string = input[1].split('\r\n')

function getMinAndMax(map, first, last){
    const charMap = [];
    let max = 0; min=9007199254740992;
    let maxChar = ''; minChar = '';
    for (let tuple of map.keys()){
        //console.log(tuple, charMap);
        if (charMap[tuple[0]])
            charMap[tuple[0]] += map.get(tuple) ;
        else
            charMap[tuple[0]] = map.get(tuple);

        if (charMap[tuple[1]])
            charMap[tuple[1]] += map.get(tuple);
        else
            charMap[tuple[1]] = map.get(tuple);
    }
    //First and last character is not counted twice so adding them and will later be devided by 2 if they are min or max
    charMap[first]++; charMap[last]++;
    for (let char in charMap){
        if (charMap[char] > max){
            max = charMap[char];
            maxChar = char;
        }
        if (charMap[char] < min){
            min = charMap[char];
            minChar = char;
        }
    }
    //Everyting gets counted twice with the tuples so need to devide the result by 2 to get the correct sum
    min = min / 2; max = max / 2;
    return {min,minChar,max,maxChar};
}

function calculate(iterations){
    let rules = new Map();

    for (let i = 0; i<rules_string.length;i++){
        [a,b] = rules_string[i].split('->').map(x=>x.trim());
        rules.set(a,b);
    }

    let tuples = new Map();
    for (let i = 0; i < original.length-1; i++){
        tuples.set(original[i]+original[i+1],1);
    }

    for (it = 0; it < iterations; it++){
        let newTuples = new Map();
        //console.log("****************iteration", it);
        for (let t of tuples.keys()){
            if (rules.has(t)){
                //console.log("matches rule", rules.get(t));
                let newChar = rules.get(t);
                let new1 = t[0]+newChar;
                let new2 = newChar+t[1]
                //console.log(t,tuples.get(t) , "=>",new1, new2);
                if (newTuples.has(new1)) 
                    newTuples.set(new1, newTuples.get(new1) + tuples.get(t) ); 
                else 
                    newTuples.set(new1, tuples.get(t));

                if (newTuples.has(new2)) 
                    newTuples.set(new2, newTuples.get(new2) + tuples.get(t)); 
                else 
                    newTuples.set(new2, tuples.get(t));
            }else
                console.log("Error");
        }
        //console.log(newTuples);
        tuples = newTuples;
    }
    return tuples;
}
//Problem A
let minmax = getMinAndMax(calculate(10), original[0], original[original.length-1]);
console.log(minmax.max - minmax.min);
//Problem B
minmax = getMinAndMax(calculate(40), original[0], original[original.length-1]);
console.log(minmax.max - minmax.min); //12464637559775

function parseInput(input_string){
    return input_string.split('\n\r\n').map(line => {
        return line.trim();
        //return line.trim().split('').map(x=>+x);
    });
}
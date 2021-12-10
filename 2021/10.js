const {readInFile} = require('../read_input');

const input = parseInput(readInFile());

function getAutoCompletionScore(total, chars){
    t = total;
    let c;
    while ((c = chars.pop())){
        t *= 5;
        if (c == ')') t += 1;
        if (c == ']') t += 2;
        if (c == '}') t += 3;
        if (c == '>') t += 4;
    }
    return t;
}

function calculate(problemA){
    let result = 0;
    let incorrect = [];
    let autoCompletionScore = [];
    for(let i = 0; i < input.length; i++){
        let chunk = input[i];
        //console.log(chunk);
        let array = [];
        let correct = true;
        for(let j = 0; j < chunk.length; j++){
            if (chunk[j] == '(') array.push(')');
            else if (chunk[j] == '[') array.push(']');
            else if (chunk[j] == '{') array.push('}');
            else if (chunk[j] == '<') array.push('>');
            else {
                let c = array.pop();
                if (c != chunk[j]){
                    incorrect.push(chunk[j])
                    correct = false;
                   //console.log("Expected: ",c, "Got: ", chunk[j]);
                }             
            }
        }
        if (correct)
            autoCompletionScore.push(getAutoCompletionScore(0, array));
    }
    let sum = 0;
    if (problemA)
        for (value of incorrect){
            if (value == ')') sum += 3;
            if (value == ']') sum += 57;
            if (value == '}') sum += 1197;
            if (value == '>') sum += 25137;
        }
    else 
        sum = autoCompletionScore.sort((a,b) => a-b)[(autoCompletionScore.length-1)/2];
    return sum;
}

//Problem A
console.log(calculate(true));
//Problem B
console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}
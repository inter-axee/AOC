var Graph = require("graph-data-structure");
const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);
function calculate(problemA){
    const graph = new Graph();
//console.log(graph);
    for (let i = 0; i < input.length; i++){
        //console.log(input[i].split(')'));
        let v = input[i].split(')');
        graph.addEdge(v[0],v[1]);
        if (!problemA)
            graph.addEdge(v[1],v[0]);
    }
    //console.log(graph.shortestPath('COM','L'));
    nodes = graph.nodes();
    let total = 0;
    if (problemA)
        for (n of nodes){
            if (n == 'COM')
                continue;       
            total += graph.depthFirstSearch([n]).length;
        }
    else
        total = graph.shortestPath(graph.adjacent('SAN')[0],graph.adjacent('YOU')[0]).length-1;
    return total;
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
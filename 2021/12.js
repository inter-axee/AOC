const {readInFile} = require('../read_input');
var Graph = require("graph-data-structure");

const input = parseInput(readInFile());

/**
 * Recursive function that travers the graph and 
 * checks all paths to 'end' where capital letters can be
 * visited as many times as we want but small letters can only be visited
 * once in part A and only one time twice in part B
 *  
 */
function traversToEnd(graph, currentNode, visited, problemA){
    if (currentNode === 'end'){
        //console.log([...visited,'end']);
        return 1;
    }
    const visited_next = [...visited,currentNode];
    let adj = graph.adjacent(currentNode);
    sum = 0;
    for (node of adj){
        //Used for problem B, check if any small letter nodes occur twice
        const counts = {};
        let hasFound = false;
        if (!problemA){
            for (const num of visited_next) {
                if (num === num.toLowerCase())
                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                if (counts[num] == 2){
                    hasFound = true;
                    break;
                }
            }
        }
        
        if ((node.toLowerCase() != node || !visited.includes(node)) || (!problemA && node.toLowerCase() == node && !hasFound && node != 'start' && node != 'end'))
            sum += traversToEnd(graph,node,visited_next, problemA);
    }
    return sum;
}

function calculate(problemA){
    let result = 0;
    //graph to keep track of edges from a node
    graph = new Graph();
    //build bi-directed graph from input
    for(let i = 0; i < input.length; i++){
        let edge = input[i].split('-');
        graph.addEdge(edge[0],edge[1]);
        graph.addEdge(edge[1],edge[0]);
    }
    result = traversToEnd(graph,'start',[],problemA);
    return result;
}

//Problem A
console.log(calculate(true));
//Problem B
console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
        //return line.trim().split('').map(x=>+x);
    });
}
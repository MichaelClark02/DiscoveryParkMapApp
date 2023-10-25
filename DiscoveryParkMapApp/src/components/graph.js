"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph = require('node-dijkstra');
//                 a  b  g  k  m h11   h12  h13  h21
var adjMatrix = [[0, -1, -1, -1, -1, -1, 2, -1, 2],
    [-1, 0, -1, -1, -1, 4, -1, -1, -1],
    [-1, -1, 0, -1, -1, -1, -1, 2, -1],
    [-1, -1, -1, 0, -1, -1, -1, 6, -1],
    [-1, -1, -1, -1, 0, -1, -1, -1, 2],
    [-1, 4, -1, -1, -1, 0, -1, -1, 4],
    [2, -1, -1, -1, -1, 2, 0, 6, -1],
    [-1, -1, 2, 6, -1, -1, 6, 0, -1],
    [2, -1, -1, -1, 2, 4, -1, -1, 0],
];
function addEdge(adj, u, v, wt) {
    adj[u.getIndex()][v.getIndex()] = (wt);
    return adj;
}
var GraphNode = /** @class */ (function () {
    function GraphNode(index, longitude, latitude, name, type, reachable) {
        this.index = index;
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
        this.type = type;
        this.reachable = reachable;
    }
    GraphNode.prototype.getIndex = function () {
        return this.index;
    };
    GraphNode.prototype.getName = function () {
        return this.name;
    };
    return GraphNode;
}());
var a = new GraphNode(0, 1, 1, "a", "room", true);
var b = new GraphNode(1, 2, 2, "b", "room", true);
var g = new GraphNode(2, 3, 2, "g", "room", true);
var k = new GraphNode(3, 2, 2, "k", "room", true);
var m = new GraphNode(4, 2, 2, "m", "room", true);
var h11 = new GraphNode(5, 2, 2, "h11", "room", false);
var h12 = new GraphNode(6, 2, 2, "h12", "room", false);
var h13 = new GraphNode(7, 2, 2, "h13", "room", false);
var h21 = new GraphNode(8, 2, 2, "h21", "room", false);
var nodes = [];
nodes.push(a);
nodes.push(b);
nodes.push(g);
nodes.push(k);
nodes.push(m);
nodes.push(h11);
nodes.push(h12);
nodes.push(h13);
nodes.push(h21);
var route = new Graph();
route.addNode(a.name, { h12: 2, h21: 2 });
route.addNode('b', { h11: 4 });
route.addNode('g', { h13: 2 });
route.addNode('k', { h13: 6 });
route.addNode('m', { h21: 2 });
route.addNode('h11', { b: 4, h21: 4 });
route.addNode('h12', { a: 2, h11: 2, h13: 6 });
route.addNode('h13', { g: 2, k: 6, h12: 6 });
route.addNode('h21', { a: 2, k: 2, h11: 4, m: 2 });
console.log(route.path('g', 'm'));
// for(let i=0;i<nodes.length;i++){
//     for(let j=0;i<nodes.length;i++){
//     }
// }
//console.log(adjMatrix[0][1]);
//console.log(adjMatrix);
exports.default = { adjMatrix: adjMatrix, addEdge: addEdge, GraphNode: GraphNode };

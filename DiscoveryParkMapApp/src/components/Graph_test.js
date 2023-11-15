"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph = require('node-dijkstra');


var GraphNode = /** @class */ (function () {
    function GraphNode(index, latitude,longitude, name, type, reachable) {
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

const a = new GraphNode(0, 33.25398915571883, -97.15215861797333, "a", "a", false);
const b = new GraphNode(1, 33.25423280037092, -97.15261895209551, "b", "hallway", false);
const c = new GraphNode(2, 33.253671771792895, -97.1530269831419, "c", "hallway", false);
const d = new GraphNode(3, 33.25361878090144, -97.15306252241135, "d", "room", true);
const e = new GraphNode(4, 33.25385934246797, -97.15288884937763, "e", "hallway", false)
const f = new GraphNode(5, 33.25380607131567, -97.15277720242739, "f", "hallway", false)
const g = new GraphNode(6, 33.25389691262951, -97.15270981192589, "g", "room", true)

const nodes = [a, b, c, d, e, f, g];

const route = new Graph();
route.addNode('a', { b:calculateDistance(a.latitude, a.longitude, b.latitude, b.longitude) });
route.addNode('b', { c:calculateDistance(b.latitude, b.longitude, c.latitude, c.longitude), e: calculateDistance(b.latitude, b.longitude, e.latitude, e.longitude)});
route.addNode('c', { d: calculateDistance(c.latitude, c.longitude, d.latitude, d.longitude) });
route.addNode('e', { f: calculateDistance(e.latitude, e.longitude, f.latitude, f.longitude) });
route.addNode('f', { g: calculateDistance(f.latitude, f.longitude, g.latitude, g.longitude) });

console.log(route.path('a', 'g'));


exports.default = { route, nodes };


// Function to calculate the linear distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const x1 = lon1;
    const y1 = lat1;
    const x2 = lon2;
    const y2 = lat2;

    // Euclidean distance formula
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    return distance;
}

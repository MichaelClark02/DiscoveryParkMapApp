"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph = require('node-dijkstra');


var GraphNode = /** @class */ (function () {
    function GraphNode(index, latitude,longitude, name, type, reachable, wing, dept) {
        this.index = index;
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
        this.type = type;
        this.reachable = reachable;
        this.wing = wing;
        this.dept = dept;
    }
    GraphNode.prototype.getIndex = function () {
        return this.index;
    };
    GraphNode.prototype.getName = function () {
        return this.name;
    };
    return GraphNode;
}());

const E1 = new GraphNode(0, 33.25398915571883, -97.15215861797333, "E1", "hallway", false);
const B00 = new GraphNode(1, 33.25401635199101, -97.15220320969821, "B00", "hallway", false);
const B01 = new GraphNode(2, 33.25423504335653, -97.15261425822973, "B01", "hallway", false);
const B20 = new GraphNode(3, 33.25366308016741, -97.15247679501772, "B20", "hallway", false);
const f = new GraphNode(4, 33.25380607131567, -97.15277720242739, "f", "hallway", false);
const B142 = new GraphNode(5, 33.25386074433996, -97.1526075527072, "B142", "room", true, "B-wing", "CSCE");
const B142_ac1 = new GraphNode(6, 33.253934482774895, -97.15255860239266, "B142_ac1", "hallway", false);
const B142_ac2 = new GraphNode(7, 33.2537614917475, -97.15268701314928, "B142_ac2", "hallway", false);
const B140 = new GraphNode(8, 33.25381924891953, -97.15252708643675, "B140", "room", true, "B-wing", "CSCE");
const B140_ac1 = new GraphNode(9, 33.253884856534654, -97.1524727717042, "B140_ac1", "hallway", false);
const B140_ac2 = new GraphNode(10, 33.253721678529, -97.15259548276664, "B140_ac2", "hallway", false);
const B155 = new GraphNode(11, 33.25390055749507, -97.15270008891821, "B155", "room", true);
const B155_ac1 = new GraphNode(12, 33.2539770996367, -97.15264443308115, "B155_ac1", "hallway", false);
const B55_ac2 = new GraphNode(13, 33.25380607131567, -97.15277720242739, "B155_ac2", "hallway", false);
const B187 = new GraphNode(14, 33.25367765966773, -97.1527473628521, "B187", "room", true, "B-wing", "CSCE");
const B187_ac1 = new GraphNode(15, 33.25376401511989, -97.15268466621637, "B187_ac1", "hallway", false);
const B10 = new GraphNode(16, 33.25382990315099, -97.15234570205212, "B10", "hallway", false);
const s = new GraphNode(17, 33.25381924891953, -97.15252708643675, "B140", "room", true);

const nodes = [E1, B00, B20, B187, B187_ac1, B10, B140_ac1, B140, B142_ac1, B142];

const route = new Graph();
route.addNode('E1', { B00:calculateDistance(E1.latitude, E1.longitude, B00.latitude, B00.longitude) });
route.addNode('B00', { B10:calculateDistance(B00.latitude, B00.longitude, B10.latitude, B10.longitude)});
route.addNode('B10', { B20:calculateDistance(B10.latitude, B10.longitude, B20.latitude, B20.longitude), B140_ac1:calculateDistance(B10.latitude, B10.longitude, B140_ac1.latitude, B140_ac1.longitude), B142_ac1:calculateDistance(B10.latitude, B10.longitude, B142_ac1.latitude, B142_ac1.longitude)});
route.addNode('B140_ac1', { B140: calculateDistance(B140_ac1.latitude, B140_ac1.longitude, B140.latitude, B140.longitude) });
route.addNode('B142_ac1', { B142: calculateDistance(B142_ac1.latitude, B142_ac1.longitude, B142.latitude, B142.longitude) });
route.addNode('B20', { B187_ac1: calculateDistance(B20.latitude, B20.longitude, B187_ac1.latitude, B187_ac1.longitude) });
route.addNode('B187_ac1', { B187: calculateDistance(B187_ac1.latitude, B187_ac1.longitude, B187.latitude, B187.longitude) });
//route.addNode('f', { g: calculateDistance(f.latitude, f.longitude, g.latitude, g.longitude) });

console.log(route.path('E1', 'B187'));


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

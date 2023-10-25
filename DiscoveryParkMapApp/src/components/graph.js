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
    return GraphNode;
}());
var a = new GraphNode(0, 1, 1, "asd", "room", true);
var b = new GraphNode(1, 2, 2, "bsd", "room", true);
adjMatrix = addEdge(adjMatrix, a, b, 10);
adjMatrix = addEdge(adjMatrix, b, a, 32);
//console.log(adjMatrix[0][1]);
console.log(adjMatrix[0]);

//                 a  b  g  k  m h11   h12  h13  h21
let adjMatrix = [[ 0,-1,-1,-1,-1, -1 ,  2 , -1 ,  2],
                 [-1, 0,-1,-1,-1,  4 , -1 , -1 , -1],
                 [-1,-1, 0,-1,-1, -1 , -1 ,  2 , -1],
                 [-1,-1,-1, 0,-1, -1 , -1 ,  6 , -1],
                 [-1,-1,-1,-1, 0, -1 , -1 , -1 ,  2],
                 [-1, 4,-1,-1,-1,  0 , -1 , -1 ,  4],
                 [ 2,-1,-1,-1,-1,  2 ,  0 ,  6 , -1],
                 [-1,-1, 2, 6,-1, -1 ,  6 ,  0 , -1],
                 [ 2,-1,-1,-1, 2,  4 , -1 , -1 ,  0],
                ]


function addEdge(adj: number[][], u: GraphNode, v: GraphNode, wt: number) {
    adj[u.getIndex()][v.getIndex()] = (wt);
    return adj;
}
                  
                  
                  
                  
interface Graphs {
    index: number;
    longitude: number;
    latitude: number;
    name: string;
    type: string;
    reachable: boolean;
    getIndex(): number;
}
                  
class GraphNode implements Graphs {
    index: number;
    longitude: number;
    latitude: number;
    name: string;
    type: string;
    reachable: boolean;
                  
    constructor(index: number, longitude: number, latitude: number, name: string, type: string, reachable: boolean) {
        this.index = index;
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
        this.type = type;
        this.reachable = reachable;
    }
    getIndex() {
        return this.index;
    }
}
                  
                  
let a: GraphNode = new GraphNode(0, 1, 1, "asd", "room", true);
                  
let b: GraphNode = new GraphNode(1, 2, 2, "bsd", "room", true);
adjMatrix = addEdge(adjMatrix, a, b, 10);
                  
console.log(adjMatrix[0][1]);
console.log(adjMatrix);

export default {adjMatrix, addEdge, GraphNode};
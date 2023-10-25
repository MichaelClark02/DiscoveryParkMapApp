

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
                  
                  
let a: GraphNode = new GraphNode(0, 1, 1, "a", "room", true);        
let b: GraphNode = new GraphNode(1, 2, 2, "b", "room", true);
let g: GraphNode = new GraphNode(2, 3, 2, "g", "room", true);
let k: GraphNode = new GraphNode(3, 2, 2, "k", "room", true);
let m: GraphNode = new GraphNode(4, 2, 2, "m", "room", true);
let h11: GraphNode = new GraphNode(5, 2, 2, "h11", "room", false);
let h12: GraphNode = new GraphNode(6, 2, 2, "h12", "room", false);
let h13: GraphNode = new GraphNode(7, 2, 2, "h13", "room", false);
let h21: GraphNode = new GraphNode(8, 2, 2, "h21", "room", false);





let nodes: GraphNode[]=[]

nodes.push(a);
nodes.push(b);
nodes.push(g);
nodes.push(k);
nodes.push(m);
nodes.push(h11);
nodes.push(h12);
nodes.push(h13);
nodes.push(h21);



console.log(adjMatrix[0][1]);
console.log(adjMatrix);

export default {adjMatrix, addEdge, GraphNode};
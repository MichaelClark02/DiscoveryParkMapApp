//                 a  b  g  k  m h11   h12  h13  h21
var adjMatrix = [[ 0,-1,-1,-1,-1, -1 ,  2 , -1 ,  2],
                 [-1, 0,-1,-1,-1,  4 , -1 , -1 , -1],
                 [-1,-1, 0,-1,-1, -1 , -1 ,  2 , -1],
                 [-1,-1,-1, 0,-1, -1 , -1 ,  6 , -1],
                 [-1,-1,-1,-1, 0, -1 , -1 , -1 ,  2],
                 [-1, 4,-1,-1,-1,  0 , -1 , -1 ,  4],
                 [ 2,-1,-1,-1,-1,  2 ,  0 ,  6 , -1],
                 [-1,-1, 2, 6,-1, -1 ,  6 ,  0 , -1],
                 [ 2,-1,-1,-1, 2,  4 , -1 , -1 ,  0],
                ]


function addEdge(adj, u : GraphNode,v: GraphNode,wt: number)
{
    adj[u.getIndex()][v.getIndex()].push([wt]);
    return adj;   
}




interface Graph {
    index: number;
    longitude: number;
    latitude: number;
    name: string;
    type: string;
    reachable: boolean;
    getIndex():number;
}

class GraphNode implements Graph {
    index: number;
    longitude: number;
    latitude: number;
    name: string;
    type: string;
    reachable: boolean;

    constructor(longitude: number, latitude: number, name: string, type: string, reachable: boolean) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
        this.type = type;
        this.reachable = reachable;
    }
    getIndex(){
        return this.index;
    }
}



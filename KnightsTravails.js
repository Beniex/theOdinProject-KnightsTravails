class Node {
    constructor(data, children){
        this.data = data; 
        this.children = children; 
    }

    addChild(node){
        this.children.push(node); 
    }
}

class Tree{
    constructor(){
    }


    findBestTravel(Start, End){
        let StartNode = new Node(Start, []);
        var found = false;
        const visited = new Set();
         

        function frec(node, EndData, visited) {
            const key = JSON.stringify(node.data);
            if (visited.has(key)) return null; // Already explored this position
          
            if (JSON.stringify(node.data) === JSON.stringify(EndData)) {
              found = true;
              return [node.data];
            }
          
            visited.add(key); // Mark current position as visited
          
            let possibleMoves = createPossiblePositions(node);
            if (possibleMoves.length === 0) {
              return null;
            } else if (!found) {
              for (let i = 0; i < possibleMoves.length; i++) {
                let result = frec(new Node(possibleMoves[i], []), EndData, new Set(visited)); // Create new node and new visited set for each exploration
                if (result) {
                  result.unshift(node.data);
                  return result;
                }
              }
            }
            return null; // Return null if no path is found
          }
          
    
        
        function createPossiblePositions(node){
            const TransformationVectors = [[-2, 1], [-2, -1], [2, -1], [2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]]; 
            let transformationResults = transform(node, TransformationVectors); 
            function transform(node, vectors){
                let results = []; 
                for(let i=0; i<vectors.length; i++){
                    let transformedHeight = vectors[i][0]+node.data[0]; 
                    let transformedWidth = vectors[i][1] + node.data[1]; 
    
                    if (transformedHeight >= 0 && transformedHeight <= 7) {
                        if(transformedWidth >= 0 && transformedWidth <= 7){
                            results.push([transformedHeight,transformedWidth]); 
                        }
                    }
                }
                return results; 
            }
            return transformationResults; 
    
        }
        return frec(StartNode, End, visited); 
    }

}

let testNode = new Node([0, 0], null, null); 
let testTree = new Tree(); 
console.log(testTree.findBestTravel([0, 0], [4, 4])); 


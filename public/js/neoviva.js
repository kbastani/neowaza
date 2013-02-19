var colors = [
0x1f77b4ff, 0xaec7e8ff,
0xff7f0eff, 0xffbb78ff,
0x2ca02cff, 0x98df8aff,
0xd62728ff, 0xff9896ff,
0x9467bdff, 0xc5b0d5ff,
0x8c564bff, 0xc49c94ff,
0xe377c2ff, 0xf7b6d2ff,
0x7f7f7fff, 0xc7c7c7ff,
0xbcbd22ff, 0xdbdb8dff,
0x17becfff, 0x9edae5ff];

/*                        
function beginRemoveNodesLoop(graph){
    var nodesLeft = [];
    graph.forEachNode(function(node){
        nodesLeft.push(node.id);
    });
    
    var removeInterval = setInterval(function(){
         var nodesCount = nodesLeft.length;
         
         if (nodesCount > 0){
             var nodeToRemove = Math.min((Math.random() * nodesCount) << 0, nodesCount - 1);
             
             graph.removeNode(nodesLeft[nodeToRemove]);
             nodesLeft.splice(nodeToRemove, 1);
         }
         
         if (nodesCount === 0) { 
             clearInterval(removeInterval);
             setTimeout(function(){
                 beginAddNodesLoop(graph);
             }, 100);
         }
     }, 100);
}

function beginAddNodesLoop(graph){
   var i = 0, m = 10, n = 5;
     var addInterval = setInterval(function(){
         graph.beginUpdate();
                             

         for (var j = 0; j < m; ++j){
             var node = i + j * n;
             if (i > 0) { graph.addLink(node, i - 1 + j * n); }
             if (j > 0) { graph.addLink(node, i + (j - 1) * n); }
         }
         i++;
         graph.endUpdate();
         
         if (i >= n) { 
             clearInterval(addInterval);
             setTimeout(function() {
                 beginRemoveNodesLoop(graph);
             }, 10000); 
         }
     }, 100);
}
*/           
function addNeo(graph) {
	for (n in gon.edges) {
		graph.addLink(gon.edges[n].source, gon.edges[n].target);
	  }	
}

function onLoad() {
    var graph = Viva.Graph.graph();

    var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength : 100,
        springCoeff : 0.0001,
        dragCoeff : 0.02,
        gravity : -1
    });
     
    var graphics = Viva.Graph.View.webglGraphics();
	graphics.setNodeProgram(new Viva.Graph.View.webglImageNodeProgram())
    graphics
        .node(function(node){	
           // return Viva.Graph.View.webglSquare(1 + Math.random() * 10, colors[(Math.random() * colors.length) << 0]);
           return Viva.Graph.View.webglImage(12, "/image/"+node["id"]);
        })
        .link(function(link) {
            return Viva.Graph.View.webglLine(colors[(1) << 0]);
        });
    
    var renderer = Viva.Graph.View.renderer(graph,
        {
            layout     : layout,
            graphics   : graphics,
            container  : document.getElementById('graph1'),
            renderLinks : true
        });

    renderer.run();
    addNeo(graph);
    l = layout;
}
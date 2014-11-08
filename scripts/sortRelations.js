var fs = require('fs');

var relations = JSON.parse(fs.readFileSync("relations.json", {'encoding': 'utf8'}));

relations.sort(function(a, b){return a.from - b.from});

fs.writeFileSync("sortedRelations.json", JSON.stringify(relations),{'encoding': 'utf8'});

console.log("all done");
var fs = require('fs');
     
fs.readFile('files.txt', 'utf8', function(err, contents) {
    let y=contents.split('\n');
    y.forEach(element => {
        console.log(element);
    });
});
 
console.log('after calling readFile');
 
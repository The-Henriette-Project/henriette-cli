const readline = require('node:readline');

//https://en.m.wikipedia.org/wiki/ANSI_escape_code#Colors
console.log('Hello, this is \x1b[96mHENRIETTE CLI 0.0.1\x1b[0m');

var argv = require('minimist')(process.argv.slice(2));

console.log(argv);




const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');



db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
});







const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'henriette>',
  history: ["aaa", "bbb", "ccc"],

  completer: function(line){
        const completions = 'ls new show quit help'.split(' ');
        const hits = completions.filter((c) => c.startsWith(line));
        
        // Show all completions if none found
        return [hits.length ? hits : completions, line]
  }
});

rl.prompt();


rl.on('history', (history) => {
    console.log(`Received: ${history}`);
    //--> save to file, load in rl.history
  }); 

rl.on('line', (line) => {
  switch (line.trim()) {
    
    case 'ls':
      
      db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
        });

      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }

  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
}); 


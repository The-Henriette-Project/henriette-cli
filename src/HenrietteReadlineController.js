import {colorize} from "./ConsoleHelper.js"
import readLine from "node:readline";

//readHistoryFile

function completer(line){
    const completions = Object.keys(actions);
    const hits = completions.filter((c) => c.startsWith(line));
    
    // Show all completions if none found
    return [hits.length ? hits : completions, line]
}



function splitLine(line) {
    const data = {}
    
    const dataContainer = {
        line: line
    }

    //extract and consume in line
    extractAction(dataContainer)
    extractFinishingComment(dataContainer)
    extractSource(dataContainer)

    return dataContainer;
}

function extractAction(dataContainer) {
    dataContainer.action = dataContainer.line.split(" ")[0];
    dataContainer.line = dataContainer.line.replace(dataContainer.action, "");
}

function extractFinishingComment(dataContainer) {
    const split = dataContainer.line.split("//");
    if (split.length < 2) {
        return "";
    }

    dataContainer.line = split[0]
    dataContainer.comment = split[1]
}

function extractSource(dataContainer) {
    const regex = /\[(.*)\]/gm;
    var result = regex.exec(dataContainer.line);

    if (! result) {
        return ""
    }
    
    dataContainer.line = dataContainer.line.replace(result[0], "").trim();
    dataContainer.source = result[1]
}

const actions = {
    "new": (data, henriette, callback) => {
        console.log("NEW", data);
        henriette.newEntity(data.line, data.comment, callback)
    },

    "set": (data, henriette, callback) => {
        console.log("SET", data);
        //henriette.newEntity(data.line, data.comment
    },

    "update": (data, henriette, callback) => {
        console.log("UPD", data);
    },

    "ls": (data, henriette, callback) => {
        console.log("LS", data);
        henriette.list(data.line, callback)
    },

    "show": (data, henriette, callback) => {
        console.log("SHOW", data);
        henriette.show(data.line, callback)
    },


}


export function run(henriette){
    
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'henriette>',
        history: [],
        completer: completer
    });

    rl.on('close', () => {
        process.exit(0);
    })

    rl.on('line', (line) => {
        const data = splitLine(line);
        
        if (actions[data.action]) {
            actions[data.action](data, henriette, (result) => {
                console.log("Done. ", result);    
            });
        } else {
            console.error("No action found : " + data.action);
        }

        
        rl.prompt();
    })
    
    henriette.init(ready => {
        rl.prompt();
    })
    
}



/*
















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

*/
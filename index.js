import {getMandatoryParam} from "./src/ParamHelper.js"
import {colorize} from "./src/ConsoleHelper.js"

import {HenrietteSqlite} from "./src/HenrietteSqlite.js"
import {run} from "./src/HenrietteReadlineController.js"

const dbPath = getMandatoryParam("db", colorize("Missing database parameter (--db=<path-to-file.sqlite>)", "black", "red") )

console.log(colorize("Hello, this Henriette v.0.0.1", "green"));
run(new HenrietteSqlite(dbPath))
import minimist from 'minimist'
import { exit } from 'process';

var argv = minimist(process.argv.slice(2));

export function getMandatoryParam(param, errorMessage){
    if (argv[param]) {
        return argv[param]
    }
    
    console.error(errorMessage);
    exit();
    
}



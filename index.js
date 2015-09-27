#!/usr/bin/env node

var program = require('commander'),
    child = require('child_process');

child.execSync = child.execSync || require('exec-sync');


program
    .version('0.0.1')
    .option('-f, --filesystem [type]', 'Add the specified type of cheese [marble]', 'tank/Rick')
    .option('-s, --snapshots [type]', 'Use snapshots file [marble] rather then listing them', false)
    .option('-b, --backupmode [mode]', 'Use backup mode and prepend tank/Snapshots to fs', false)
    .parse(process.argv);


console.log('backup mode', program.backupmode);




if (!program.snapshots)
    var cmd = 'zfs list -t snap -o name ';
else
    var cmd = 'cat ' + program.snapshots;


cmd = cmd + '| grep ^' + program.filesystem + '@| tail -n 1| cut -d\'@\' -f2| cut -d\'-\' -f4-7';
var out = child.execSync(cmd).toString().split('\n').filter(function(s) {
    return s;
});
out = out[0];
console.log(out);

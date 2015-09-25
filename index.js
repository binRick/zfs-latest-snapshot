#!/usr/bin/env node
var program = require('commander'),
    child = require('child_process');

program
    .version('0.0.1')
    .option('-f, --filesystem [type]', 'Add the specified type of cheese [marble]', 'tank/Rick')
    .parse(process.argv);

var cmd = 'zfs list -t snap -o name | grep ^' + program.filesystem + '@| tail -n 1| cut -d\'@\' -f2| cut -d\'-\' -f4-7';
var out = child.execSync(cmd).toString().split('\n').filter(function(s){return s;});
console.log(out);

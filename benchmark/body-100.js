'use strict';
/**
 * Module dependencies
 */

var benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var seedrandom = require('seedrandom');

/*
 * Globals for benchmark.js
 */

global.buffer = getbuffer(100);
global.hash = require('..');
global.string = getbuffer(100).toString();

var suite = new benchmark.Suite;

var encoding = [ 'hex', 'binary', 'base64' ];
var hashes = require('crypto').getHashes();
for (var i = 0, ii = hashes.length; i < ii; ++i) {
  var j = 2;
  // for (var j = 0, jj = encoding.length; j < jj; j++) {
  // suite.add({
  // name: ' string-' + encoding[j] + '-' + hashes[i],
  // minSamples: 50,
  // fn: 'var val = hash(string, "' + hashes[i] + '", "' + encoding[j]
  // + '")'
  // });
  suite.add({
    name: ' buffer-' + encoding[j] + '-' + hashes[i],
    minSamples: 50,
    fn: 'var val = hash(buffer, "' + hashes[i] + '", "' + encoding[j] + '")'
  });
  // }
}

suite.on('start', function onCycle(event) {

  process.stdout.write('  100 body\n\n');
}).on('cycle', function onCycle(event) {

  benchmarks.add(event.target);
}).on('complete', function onComplete() {

  benchmarks.log();
  console.log('Fastest is:' + this.filter('fastest').pluck('name') + '\n');
});

suite.run({
  async: false
});

function getbuffer(size) {

  var buffer = new Buffer(size);
  var rng = seedrandom('body ' + size);

  for (var l = 0, ll = buffer.length; l < ll; ++l) {
    buffer[l] = (rng() * 94 + 32) | 0;
  }

  return buffer;
}

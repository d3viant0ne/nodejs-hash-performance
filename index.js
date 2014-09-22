"use strict";
/**
 * @file hash-performance main
 * @module hash-performance
 * @package hash-performance
 * @subpackage main
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var crypto = require('crypto');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * functions
 */
module.exports = function hash(raw, hash) {

    return crypto.createHash(hash).update(raw).digest('base64');
};

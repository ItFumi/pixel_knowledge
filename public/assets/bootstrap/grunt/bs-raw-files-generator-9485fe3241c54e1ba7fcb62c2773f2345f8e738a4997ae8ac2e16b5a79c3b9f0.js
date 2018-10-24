/*!
 * Bootstrap Grunt task for generating raw-files.min.js for the Customizer
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
"use strict";function getFiles(e){var r={},t="less"===e?"/**/*":"/*";return glob.sync(e+t).filter(function(r){return"fonts"===e||new RegExp("\\."+e+"$").test(r)}).forEach(function(t){var s=t.replace(/^[^/]+\//,"");r[s]="fonts"===e?btoa(fs.readFileSync(t)):fs.readFileSync(t,"utf8")}),"var __"+e+" = "+JSON.stringify(r)+"\n"}var fs=require("fs"),btoa=require("btoa"),glob=require("glob");module.exports=function(e,r){r||(r="");var t=r+["js","less","fonts"].map(getFiles).reduce(function(e,r){return e+r},""),s="docs/assets/js/raw-files.min.js";try{fs.writeFileSync(s,t)}catch(n){e.fail.warn(n)}e.log.writeln("File "+s.cyan+" created.")};
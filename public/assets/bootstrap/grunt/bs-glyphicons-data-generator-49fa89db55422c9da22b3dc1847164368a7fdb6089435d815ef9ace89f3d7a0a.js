/*!
 * Bootstrap Grunt task for Glyphicons data generation
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
"use strict";var fs=require("fs");module.exports=function(e){for(var s=fs.readFileSync("less/glyphicons.less","utf8").split("\n"),t=/^\.(glyphicon-[a-zA-Z0-9-]+)/,i="# This file is generated via Grunt task. **Do not edit directly.**\n# See the 'build-glyphicons-data' task in Gruntfile.js.\n\n",n="docs/_data/glyphicons.yml",a=0,l=s.length;a<l;a++){var c=s[a].match(t);null!==c&&(i+="- "+c[1]+"\n")}fs.existsSync("docs/_data")||fs.mkdirSync("docs/_data");try{fs.writeFileSync(n,i)}catch(r){e.fail.warn(r)}e.log.writeln("File "+n.cyan+" created.")};
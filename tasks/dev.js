const packageJSON = require('../package.json');
const config = require('./config');

require('budo').cli(process.argv.slice(2), {
    pushstate: true,
    host: 'localhost',
    port: 3000,
    live: true,
    title: packageJSON.name,
    serve: 'bundle.js',
    dir: 'src',
    browserify: {
        transform: config.transform()
    }
});

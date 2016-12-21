const fs = require('fs');
const config = require('./config');

require('browserify')(process.argv[2], {
    transform: config.transform([], [[
        'postcss-copy', {
            src: 'src',
            dest: 'dist',
            template: 'assets/[hash].[ext][query]'
        }
    ]])
})
    .bundle()
    .pipe(fs.createWriteStream('dist/bundle.js'));

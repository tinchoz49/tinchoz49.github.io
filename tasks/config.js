module.exports = {
    postcssPlugins: [

    ],

    transform(beforePostcss = [], afterPostcss = []) {
        return [
            [
                'babelify', {
                    presets: [
                        'es2016'
                    ],
                    plugins: [
                        'transform-object-rest-spread'
                    ]
                }
            ],
            [
                'sheetify/transform', {
                    use: [
                        [
                            'sheetify-postcss',
                            {
                                plugins: beforePostcss.concat(this.postcssPlugins, afterPostcss),
                                basedir: process.cwd()
                            }
                        ]
                    ]
                }
            ]
        ];
    }
};

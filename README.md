Notes (rather, things to remember)

Mapbox doesn't configure out of the box with webpack... See:
https://github.com/mapbox/mapbox-gl-js#using-mapbox-gl-js-with-webpack for
Mapbox's instructions on setting up webpack.

To get things things going, we to add some loaders (and a postLoader) to our config file:

    loaders: [
        {
            test: /\.js$/,
            include: path.resolve('../node_modules/mapbox-gl/js/render/painter/use_program.js'),
            loader: 'transform/cacheable?brfs'
        },
        {
            test: /\.js$/,
            include: path.resolve('../node_modules/mapbox-gl/js/render/shaders.js'),
            loader: 'transform/cacheable?brfs'
        },
        {
            test: /\.js$/,
            include: path.resolve('../node_modules/webworkify/index.js'),
            loader: 'worker'
        }
    ],
    postLoaders: [{
        include: /node_modules\/mapbox-gl-shaders/,
        loader: 'transform',
        query: 'brfs'
    }]

We also need to alias webworkify-webpack

    resolve: {
        extensions: ['', '.js'],
        alias: {
            'webworkify': 'webworkify-webpack'
        }
    },

There's a strange issue where if using versions of webworkify-webpack other than 1.0.6, an error is thrown in the browser - Cannot read property "call" of undefined - which is resolved by locking in webworkify to version 1.0.6

Babel install - a few issues:
Originally I followed Babel's setup instructions, which had me installing babel
directly - i.e. npm install babel, but apparently the functionality has shifted
into babel-core.  When I attempted to push webpack to build on heroku, rather
than prior to deploy, everything worked fine, but checking heroku's logs
I found that there was an issue with teh babel library, and it suggested
switching to babel-core.  Babel-core and babel-loader were approriately set up
fixed this issue.

Note: don't track compiled files, it can mess with heroku deployment. Anything
built by webpack should be ignored in version control


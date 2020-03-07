const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        graphics: path.resolve(__dirname, 'src', 'processes', 'graphics.ts'),
        main: path.resolve(__dirname, 'src', 'processes', 'main.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'run', 'workers')
    },
    devServer: {
        contentBase: [
            path.join(__dirname, 'run')
        ],
        publicPath: '/workers/'
    },
    module: {
        rules: [
            {
                test: /\.glsl$/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            allowTsInNodeModules: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            fusion: path.resolve(__dirname, 'lib'),
            this: path.resolve(__dirname, 'src')
        },
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx'
        ]
    }
};
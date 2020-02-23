const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src', 'main.ts'),
        update: path.resolve(__dirname, 'src', 'workers', 'update.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'resources')
    },
    devServer: {
        contentBase: [
            path.join(__dirname, 'resources')
        ],
    },
    module: {
        rules: [
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
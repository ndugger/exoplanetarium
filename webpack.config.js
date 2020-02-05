const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'exe.ts'),
    output: {
        filename: 'exe.js',
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
                // exclude: /node_modules/,
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
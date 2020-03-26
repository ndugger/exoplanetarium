const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        client: path.resolve(__dirname, 'src', 'client', 'index.ts'),
        graphics: path.resolve(__dirname, 'src', 'client', 'threads', 'graphics.ts'),
        server: path.resolve(__dirname, 'src', 'server', 'index.ts')
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'run', 'systems')
    },
    devServer: {
        contentBase: [
            path.join(__dirname, 'run')
        ]
    },
    externals: {
        'worker_threads': 'commonjs2 worker_threads'
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
import path from 'path'
import URL from 'url'

// Webpack plugins
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

// Fix __filename and __dirname
const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Export configuration
export default {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    module: {
        rules: [
            { test: /\.tsx?$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] } } },
            { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' },
            { test: /\.json$/, type: 'asset/resource' },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'assets': path.resolve(__dirname, 'public'),
        }
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: '', globOptions: { ignore: ['**/index.html'] } }],
        })
    ],
}

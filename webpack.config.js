const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin=require("fork-ts-checker-webpack-plugin");
// const CopyPlugin=require("copy-webpack-plugin");
const WebpackBar=require("webpackbar");

module.exports={
    mode:"development",
    entry:{
        // add entry points here
        index:"./web/index.tsx"
    },
    output:{
        path:`${__dirname}/build/web`,
        filename:"[name]-build.js"
    },

    module:{
        rules:[
            {
                test:/\.(tsx|ts|js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-react","@babel/preset-typescript"]
                    }
                }
            },
            {
                test:/\.(less|css)$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:"css-loader",options:{url:false}},
                    {loader:"less-loader"}
                ]
            }
        ]
    },

    plugins:[
        new MiniCssExtractPlugin({
            filename:"[name]-build.css"
        }),

        new ForkTsCheckerWebpackPlugin(),
        new WebpackBar()

        // new CopyPlugin([
        //     {from:"src/index.html",to:"../"}
        // ]),
    ],

    // optimization:{
    //     splitChunks:{
    //         chunks:"all",
    //         automaticNameDelimiter:"-"
    //     }
    // },

    resolve:{
        extensions:[".tsx",".ts",".jsx",".js"],
        alias:{
            components:`${__dirname}/web/components`
        }
    },

    stats:{
        entrypoints:false,
        modules:false,
        chunks:false,
        // assets:false
    },

    devtool:"eval-source-map"
};
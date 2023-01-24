import "webpack-dev-server";
import path from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "assets/images/[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    alias: {},
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    //new BaseHrefWebpackPlugin({ baseHref: "/monitoring/app/" }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
    proxy: {
      "/": {
        changeOrigin: true,
        target:
          "http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList",
      },
      //"/monitoring/api": { changeOrigin: true, target: "https://manage-20-214-188-126.vurix.kr" },
    },
  },
};

export default config;

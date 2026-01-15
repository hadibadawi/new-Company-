import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/index.js', 
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
    clean: true, 
    publicPath: '',
  },
  // ... الكود العلوي كما هو

module: {
  rules: [
    {
      test: /\.s[ac]ss$|\.css$/i,
      use: [
          MiniCssExtractPlugin.loader,
         "css-loader", 
         "sass-loader",
      ],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/images/[name][ext]', // تنظيم الصور أيضاً
      },
    },
    // قاعدة الخطوط الموحدة والصحيحة
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/fonts/[name][ext]', 
      },
    },
    {
    test: /\.html$/i,
    loader: "html-loader",
    options: {
      sources: {
        list: [
          "...", // لمعالجة الخصائص الافتراضية مثل src و href
          {
            tag: "a",
            attribute: "data-image",
            type: "src",
          },
        ],
      },
    },
  },
  ],
},


  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: 'projects.html',
      filename: 'projects.html',
    }),

    new HtmlWebpackPlugin({
      template: 'project-details.html',
      filename: 'project-details.html',
    }),

    new HtmlWebpackPlugin({
      template: 'blog.html',
      filename: 'blog.html',
    }),

    new HtmlWebpackPlugin({
      template: 'blog-details.html',
      filename: 'blog-details.html',
    }),

    new HtmlWebpackPlugin({
      template: 'add-blog.html',
      filename: 'add-blog.html',
    }),

    new HtmlWebpackPlugin({
      template: 'about.html',
      filename: 'about.html',
    }),

    new HtmlWebpackPlugin({
      template: 'contact.html',
      filename: 'contact.html',
    }),

    new MiniCssExtractPlugin({
      filename:"style.css"
    })
  ],
  
  devServer: {
    open: {
      app: {
        name: 'chrome', 
      },
    },
  },
};
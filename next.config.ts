/** @type {import('next').NextConfig} */
const nextConfig = {
  // 添加Turbopack配置
  turbopack: {
    // Turbopack配置
    rules: {
      // 添加对字体文件的支持
      '*.woff2': { 
        loaders: ['file-loader'] 
      },
    },
  },
};

module.exports = nextConfig;

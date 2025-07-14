/** @type {import('next').NextConfig} */
const nextConfig = {
  // 使用空配置，移除不支持的选项
  eslint: {
    // 在生产构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

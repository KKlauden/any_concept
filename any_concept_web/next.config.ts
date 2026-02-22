import type { NextConfig } from 'next'

// Velite 集成（Turbopack 兼容写法）
const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  import('velite').then((m) => m.build({ watch: isDev, clean: !isDev }))
}

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig

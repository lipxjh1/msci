/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["@prisma/client", "bcryptjs"],
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "blz-contentstack-images.akamaized.net",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "i.pinimg.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "overfast-api.tekrop.fr",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "via.placeholder.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "**.supabase.co",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
          port: "",
          pathname: "/**",
        },
      ],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      domains: ['raw.githubusercontent.com'],
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    experimental: {
      optimizeCss: true,
      scrollRestoration: true,
      optimisticClientCache: true,
    },
    compress: true,
    webpack: (config, { dev, isServer }) => {
      config.module.rules.push({
        test: /\.(mp4|webm|ogg)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/media/',
            outputPath: 'static/media/',
            name: '[name].[hash].[ext]',
          },
        },
      });

      if (!dev && !isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
              priority: 40,
              chunks: 'all',
            },
            commons: {
              name: 'commons',
              test: /[\\/]node_modules[\\/]/,
              minChunks: 3,
              priority: 30,
              reuseExistingChunk: true,
            },
            lib: {
              test(module) {
                return (
                  module.size() > 80000 &&
                  /node_modules[/\\]/.test(module.identifier())
                )
              },
              name(module) {
                const match = module.identifier().match(/node_modules[/\\](.+?)(?:[/\\]|$)/);
                return match ? `npm.${match[1].replace('@', '')}` : null;
              },
              priority: 20,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        };
      }
      
      return config;
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    async rewrites() {
      return {
        beforeFiles: [
          {
            source: '/api/setup-api-keys-table',
            has: [
              {
                type: 'header',
                key: 'x-netlify-build',
                value: 'true',
              },
            ],
            destination: '/api/build-time-stub',
          },
        ],
      };
    },
    reactStrictMode: false,
    poweredByHeader: false,
  };
  
  module.exports = nextConfig;
  
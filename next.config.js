/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
    },
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
    },
    webpack: (config) => {
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
      return config;
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;
  
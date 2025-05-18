/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'www.zuzudelights.com',
                port: '',
                pathname:"/**"
            },
            {
                protocol: 'https',
                hostname: 'www.zuzudelights.com',
                port: '',
                pathname:"/**"
            },
            {
                protocol: 'https',
                hostname: 'www.zuzudelights.com',
                port: '',
                pathname: '/wp-content/uploads/**'
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
              },
              {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
              },
              {
                protocol: 'https',
                hostname: 'images.pexels.com',
                pathname: '/**',
              },
              {
                protocol: 'https',
                hostname: 'example.com',
                pathname: '/**',
              },
        ]
    }
};

export default nextConfig;

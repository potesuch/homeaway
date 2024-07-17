/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.0.18',
                port: '8000',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;

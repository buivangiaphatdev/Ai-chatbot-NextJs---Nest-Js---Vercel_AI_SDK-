/** @type {import('next').NextConfig} */
const urlApi = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${urlApi}/:path*` // Proxy to Backend
            }
        ]
    }
};

export default nextConfig;

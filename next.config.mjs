/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://todo-application-backend-sable.vercel.app/api/auth/:path*',
      },
      {
        source: '/api/todos/:path*',
        destination: 'https://todo-application-backend-sable.vercel.app/api/todos/:path*',
      },

    ];
  },

};
export default nextConfig;

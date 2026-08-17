/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://todo-application-backend-1-2xi4.onrender.com/api/auth/:path*',
      },
      {
        source: '/api/todos/:path*',
        destination: 'https://todo-application-backend-1-2xi4.onrender.com/api/todos/:path*',
      },

    ];
  },

};
export default nextConfig;

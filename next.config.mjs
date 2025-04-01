/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com' // Amazon CDN
      },
      {
        protocol: 'https',
        hostname: 'example.com'
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com' // Diğer Amazon CDN
      },
      {
        protocol: 'https',
        hostname: 'www.amazon.com.br' // Brezilya domain'i
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com' // Placeholder görsel servisi
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos' // Lorem Picsum görsel servisi
      },
      {
        protocol: 'https',
        hostname: 'placehold.co' // Placehold.co görsel servisi
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com' // Imgur görselleri
      },
      {
        protocol: 'https',
        hostname: 'ktnimg2.mncdn.com' // Koton resim servisi
      },
      {
        protocol: 'https',
        hostname: 'img-kotontr.mncdn.com' // Koton diğer resim servisi
      }
    ]
  }
};

export default nextConfig;

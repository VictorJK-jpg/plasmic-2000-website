// Pages Router version - paste this into pages/sitemap.xml.js

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://victorseda.xyz';
  
  // Static pages for now - you can make dynamic later
  const pages = [
    { path: '/', priority: '1.0' },
    // Add your other pages here manually for now
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map((page) => `
        <url>
          <loc>${baseUrl}${page.path}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {}
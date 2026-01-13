// Pages Router version - paste this into pages/sitemap.xml.js
import { PLASMIC } from '@/plasmic-init';

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://victorseda.xyz';
  
  // Fetch pages from Plasmic project
  const pageModules = await PLASMIC.fetchPages();
  
  // Convert Plasmic pages to sitemap format
  const pages = pageModules.map((page) => {
    // Assign priority based on path depth
    let priority = '0.8'; // default priority
    
    if (page.path === '/') {
      priority = '1.0'; // homepage highest priority
    } else if (page.path.split('/').length > 3) {
      priority = '0.6'; // deeper pages get lower priority
    } else if (page.path.includes('/plasmic-host')) {
      priority = '0.3'; // technical page gets lowest priority
    }
    
    return {
      path: page.path,
      priority: priority
    };
  });
  
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
import { redis } from "../index.js";
import { Product } from "../model/Product.model.js";
import { asyncHandler } from "./AsyncHandler.js";

const generateSitemapXml = asyncHandler(async (req, res) => {
  try {
    const cachedSitemap = await redis.get("cachedSitemap");
    if (cachedSitemap) {
      res.header('Content-Type', 'application/xml');
      return res.send(cachedSitemap);
    }
    let products = await Product.find({});
    const categories = ["tshirt", "shirt", "pant", "bottom", "jacket"];
    
    // Validate parsed data
    if (!products.length) {
      console.warn("No products found for sitemap.");
    }

    // Generate sitemap XML
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://sara-ecommerce.vercel.app/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/about</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/contact</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

   <!-- Auth Pages -->
  <url>
    <loc>https://sara-ecommerce.vercel.app/auth/sign-in</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/auth/sign-up</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

   <!-- User Pages -->
  <url>
    <loc>https://sara-ecommerce.vercel.app/profile</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/wishlist</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/address</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/orders</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

   <!-- Admin Pages -->
  <url>
    <loc>https://sara-ecommerce.vercel.app/admin/dashboard</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/admin/setting</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/admin/add-product</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/admin/orders</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/admin/payment-wallet</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/admin/products</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sara-ecommerce.vercel.app/admin/analytics</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Dynamic Product Pages -->
  ${products
    .map(
      ({ _id }) => `
  <url>
    <loc>https://sara-ecommerce.vercel.app/product/${_id}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('')}

  <!-- Dynamic Category Pages -->
  ${categories
    .map(
      (category) => `
  <url>
    <loc>https://sara-ecommerce.vercel.app/shopping/${category}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    // Set response headers and send the XML
    res.header('Content-Type', 'application/xml');
    await redis.set("cachedSitemap", sitemapXml, 'EX',  24 * 60 * 60);
    res.send(sitemapXml);
  } catch (error) {
    console.error("Error generating sitemap:", error.message);
    res.status(500).send("Error generating sitemap. Please try again later.");
  }
});

export { generateSitemapXml };

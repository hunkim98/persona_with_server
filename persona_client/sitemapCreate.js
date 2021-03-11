const fs = require("fs");
const prettier = require("prettier");

const SitemapGeneratedDate = new Date().toISOString();
const DOMAIN = "https://personapersonality.com";

const formatting = (target) => prettier.format(target, { parser: "html" });

let pages = [
  "/",
  "/about",
  "/masks",
  "/masks/1",
  "/masks/2",
  "/masks/3",
  "/masks/4",
  "/masks/5",
  "/masks/6",
  "/masks/7",
  "/masks/8",
  "/masks/9",
];
pages = pages.map((page) => DOMAIN + page);

// 웹의 페이지에 따라 반복적으로 넣을 loc, loastmod
const pageSitemap = pages
  .map(
    (page) => `
      <url>
        <loc>${page}</loc>
        <lastmod>${SitemapGeneratedDate}</lastmod>
      </url>
    `
  )
  .join(""); // 배열이니 join으로 전부 합쳐주자

// 생성된 pageSitemap을 그 밖의 xml 태그 내부에 넣어주자
const geneateSitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
        <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
          ${pageSitemap}
        </urlset>`;

const formattedSitemap = formatting(geneateSitemap);

fs.writeFileSync("./public/sitemap.xml", formattedSitemap, "utf8");

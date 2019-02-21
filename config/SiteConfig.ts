export default {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'SARAH ESSER', // Navigation and Site Title
  siteTitleAlt: 'SARAH ESSER - Artist and Sculptor from Berlin, Paris', // Alternative Site title for SEO
  siteUrl: 'http://sarahesser.de', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteBanner: '/assets/banner.jpg', // Your image for og:image tag. You can find it in the /static folder
  defaultBg: '/assets/bg.png', // default post background header
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteBrand: 'Sarah<br>Esser',
  siteDescription: `Sarah Esser, born 1977 in Münster, lives and works in Berlin as an artist and sculptor. As a „Meisterschülerin“ of Prof. Berndt Wilde (Kunsthochschule Berlin) she received several prizes and scholarships in Europe. Her oeuvre comprises more than 100 sculptures, drawings and watercolors.`, // Your site description
  author: 'Sarah Esser', // Author for schemaORGJSONLD
  siteLogo: '/assets/logo.png', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '', // Twitter Username - Optional
  ogSiteName: '', // Facebook Site Name - Optional
  ogLanguage: '', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  // Settings for typography.ts
  headerFontFamily: 'Roboto Mono',
  bodyFontFamily: 'Roboto',
  baseFontSize: '18px',

  // Header
  headerHeightRatio: 1.5,
  footerHeightRatio: 2,

  // Grid Gutter
  gridGutter: 1, // rem
  gridColumns: 12,

  defaultColumnsLeft: 2,
  defaultColumnsRight: 10,

  //
  POST_PER_PAGE: 4,
};

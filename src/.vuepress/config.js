// .vuepress/config.js
const extendMarkdown = require('./markdown.js').extendMarkdown;
console.log(process.env.NODE_ENV);
module.exports = {
  base:
    process.env.SEMAPHORE_GIT_BRANCH !== 'master' ? `/${process.env.SEMAPHORE_GIT_BRANCH}/` : '',
  themeConfig: {
    // nav: [
    //   { text: 'Home', link: '/bla' },
    //   { text: 'Guide', link: '/guide/' },
    //   { text: 'External', link: 'https://google.com' },
    // ],
    lastUpdated: 'Last Updated', // string | boolean
  },
  markdown: {
    extendMarkdown,
  },
  plugins: ['@vuepress/blog'],
};

import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import inline from "lume/plugins/inline.ts";
import date from "lume/plugins/date.ts";
import csvLoader from 'oi-lume-utils/loaders/csv-loader.ts';

const site = lume({
  location: new URL("https://open-innovations.github.io/leeds-digital-festival-data/"),
  src: "./src",
  components: {
    cssFile: '/style/components.css'
  },
});

site.use(base_path());
site.use(inline());
site.use(date());

// Copy HTML files
site.copy(['.html']);
site.copy('style');
site.copy('docs');
site.copy('data');

// Prevent gh-pages from using jekyll
site.copy('.nojekyll')

// Provision images
site.remoteFile('/assets/images/logo.svg', 'https://leedsdigitalfestival.org/wp-content/themes/leeds-digital-festival/assets/images/logo.svg');
site.copy('/assets/images')

// Register data loaders
site.loadData([".csv"], csvLoader);

export default site;

import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import esbuild from 'lume/plugins/esbuild.ts';
import inline from "lume/plugins/inline.ts";
import metas from "lume/plugins/metas.ts";

import oiCharts from 'oi-lume-charts/mod.ts';

import csvLoader from 'oi-lume-utils/loaders/csv-loader.ts';
import autoDependency from 'oi-lume-utils/processors/auto-dependency.ts';

const site = lume({
  location: new URL("https://data.leedsdigitalfestival.org/"),
  src: "./src",
  components: {
    cssFile: '/style/components.css'
  },
});

site.process(['.html'], autoDependency);

site.use(base_path());
site.use(inline());
site.use(date());
site.use(esbuild({
  extensions: [".ts", ".js"],
  options: {
    bundle: true,
    format: "iife",
    minify: true,
    keepNames: false,
    platform: "browser",
    target: "es6",
    incremental: true,
    treeShaking: true,
  },
}));
site.use(oiCharts({
  assetPath: 'assets/oi',
  componentNamespace: 'oi.charts',
}));
site.use(metas());

// Add filters
site.filter('localize', (num) => Number(num).toLocaleString())

// Copy HTML files
site.copy(['.html']);
site.copy('style');
site.copy('docs');
site.copy('data');

// Prevent gh-pages from using jekyll
site.copy('.nojekyll')
site.copy('CNAME')

// Provision images
site.remoteFile('/assets/images/logo.svg', 'https://leedsdigitalfestival.org/wp-content/themes/leeds-digital-festival/assets/images/logo.svg');
site.copy('/assets/images')

// Register data loaders
site.loadData([".csv"], csvLoader);


export default site;

import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";

const site = lume({
  location: new URL("https://open-innovations.github.io/leeds-digital-festival-data/"),
  src: "./src",
});

site.use(base_path());

// Copy HTML files
site.copy(['.html']);
site.copy('style');
site.copy('docs');
site.copy('data');

export default site;

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import { sv } from "npm:date-fns/locale/sv";
import feed from "lume/plugins/feed.ts";
import jsx_preact from "lume/plugins/jsx_preact.ts";
import postcss from "lume/plugins/postcss.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import basePath from "lume/plugins/base_path.ts";

const site = lume({
    location: new URL("https://johanbrook.github.io/theworldisyours"),
});

site
    //
    .copy("public", ".")
    .copy("uploads", "uploads")

    .use(
        date({
            locales: { sv },
        }),
    )
    .use(basePath()) // XXX Remove later
    .use(slugifyUrls())
    .use(
        feed({
            output: "/feed.xml",
            query: "type=post",
            info: {
                title: "=title",
                description: "=subtitle",
                lang: "sv",
                generator: false,
            },
        }),
    )
    .use(jsx_preact())
    .use(postcss())
    .data("layout", "layouts/main.vto")
    .data("type", "post", "/posts")
    .data("layout", "templates/post.vto", "/posts");

export default site;

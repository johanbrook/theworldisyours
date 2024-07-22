import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import { sv } from "npm:date-fns/locale/sv";
import feed from "lume/plugins/feed.ts";
import postcss from "lume/plugins/postcss.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import basePath from "lume/plugins/base_path.ts";
import picture from "lume/plugins/picture.ts";
import transformImages from "lume/plugins/transform_images.ts";
import metas from "lume/plugins/metas.ts";
import { slug } from "slug";
import nesting from "npm:postcss-nesting";

const site = lume({
    location: new URL("https://brook.city"),
});

site
    //
    .copy("public", ".")

    .use(picture())
    .use(transformImages())

    .use(
        date({
            locales: { sv },
        }),
    )
    .use(basePath()) // XXX Remove later
    .use(slugifyUrls())
    .use(metas())
    .use(
        feed({
            output: "/feed.xml",
            query: "type=post",
            info: {
                title: "=title",
                description: "=subtitle",
                lang: "=metas.lang",
                generator: false,
            },
        }),
    )
    .use(
        postcss({
            plugins: [nesting()],
        }),
    )
    .filter("to_slug", slug)
    .filter("split_letters", (text: string) =>
        text
            .split("")
            .map((str) => `<span>${str}</span>`)
            .join(""),
    )
    .process([".html"], (pages) => {
        for (const page of pages) {
            const document = page.document;

            document?.querySelectorAll("img").forEach((img: HTMLElement) => {
                img.setAttribute("decoding", "async");
                img.setAttribute("loading", "lazy");
                if (!img.hasAttribute("alt")) {
                    console.warn(`The image ${img.getAttribute("src")} has not alternative text`);
                }
            });
        }
    });

export default site;

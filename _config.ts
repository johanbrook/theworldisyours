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

site.copy("public", ".")
    .ignore("README.md")

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
            output: ["feed.xml", "feed.json"],
            query: "type=post",
            info: {
                title: "=title",
                description: "=subtitle",
                lang: "=metas.lang",
                generator: false,
            },
            items: {
                content(data) {
                    // Make absolute URLs in feed HTML.
                    return (data.children as string).replaceAll(
                        /\s(href|src)="([^"]+)"/g,
                        (_, attr, value) => ` ${attr}="${site.url(value, true)}"`,
                    );
                },
            },
        }),
    )
    .use(
        postcss({
            plugins: [nesting()],
        }),
    )
    .data("is_micro", (data: Record<string, unknown>) => !data.slug)
    .filter("to_slug", slug)
    .filter("split_letters", (text: string) =>
        text
            .split("")
            .map((str) => `<span>${str}</span>`)
            .join(""),
    )
    .preprocess([".md"], (pages) => {
        for (const page of pages) {
            if (!page.src.path.startsWith("/posts")) continue;

            const cover = `/uploads/${page.data.date.toISOString().split("T").at(0)}/cover.jpg`;
            // We can't check with Deno.lstat() that these files actually exists yet, but whatevs.
            page.data.cover = cover;
        }
    })
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

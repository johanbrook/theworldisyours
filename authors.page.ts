import { slug } from "slug";

export const layout = "layouts/archive.vto";

export const template = "templates/post-list.vto";

export default function* ({ search, paginate }: Lume.Data) {
    // Create the root index /by page
    yield {
        url: `/by/`,
        title: "Författare",
        template: "templates/author-list.vto", // overrides the exported var above!
        results: search.values<string>("author").sort().map((t) => ({
            title: t,
            numPosts: search.pages(`type=post author=${t}`).length,
        })),
    };

    // Generate sub pages for all /by/<author> values containing a paginated list of posts for that author
    for (const author of search.values<string>("author")) {
        const posts = search.pages(`author=${author}`, "date=desc");

        const options = {
            url: (n: number) => (n == 1 ? `/by/${slug(author)}/` : `/by/${slug(author)}/p/${n}/`),
            size: 100,
            each: (p: any) => {
                // The archive layout renders the title data variable
                p.title = `Inlägg av ${author}`;
                p.backLink = {
                    url: "/by",
                    text: "Alla författare",
                };
            },
        };

        for (const page of paginate(posts, options)) {
            yield page;
        }
    }
}

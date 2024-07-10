export const layout = "layouts/archive.vto";

export const template = "templates/post-list.vto";

export const title = "Alla inlägg";

export default function* ({ search, paginate }: Lume.Data) {
    const posts = search.pages("type=post", "date=desc");
    const options = {
        url: (n: number) => (n == 1 ? "/all/" : `/all/${n}/`),
        size: 100,
    };

    for (const page of paginate(posts, options)) {
        yield page;
    }
}

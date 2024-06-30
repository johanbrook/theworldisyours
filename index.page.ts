export const layout = "layouts/home.vto";

export default function* ({ search, paginate }: Lume.Data) {
    const posts = search.pages("type=post", "date=desc");
    const options = {
        url: (n: number) => (n == 1 ? "/" : `/posts/p/${n}/`),
        size: 5,
    };

    for (const page of paginate(posts, options)) {
        yield page;
    }
}

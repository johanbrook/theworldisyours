import { format } from "@std/datetime";

export const type = "post";

export const layout = "layouts/post.vto";

export function url(page: Lume.Page) {
    return `./${format(page.data.date, "yyyy-MM-dd")}-${page.data.slug}/`;
}

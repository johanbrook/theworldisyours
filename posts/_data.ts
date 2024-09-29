import { format } from "@std/datetime";

export const type = "post";

export const layout = "layouts/post.vto";

export function url(page: Lume.Page) {
    const datePart = format(page.data.date, "yyyy-MM-dd");

    if (!page.data.slug) return `./${datePart}/`;

    return `./${datePart}-${page.data.slug}/`;
}

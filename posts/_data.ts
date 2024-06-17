import { format } from "std/datetime/format.ts";

export function url(page) {
    return `./${format(page.data.date, "yyyy-MM-dd")}-${page.data.slug}/`;
}

import { format } from "@std/datetime";

export default function (title: string) {
    const slug = title.replace(/\s+/g, "-").toLowerCase();
    const now = new Date();
    const fileDate = format(now, "yyyy-MM-dd-HH-mm");

    return {
        path: `/posts/${fileDate}-${slug}.md`,
        content: {
            date: now,
            title,
            slug,
            content: "<!-- Content here -->",
        },
    };
}

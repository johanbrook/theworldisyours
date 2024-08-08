import { slug } from "slug";

export const layout = "layouts/archive.vto";

export const template = "templates/post-list.vto";

export default function* ({ search, paginate }: Lume.Data) {
    // Create the root index /trips page
    yield {
        url: `/trips/`,
        title: "Resor",
        template: "templates/trip-list.vto", // overrides the exported var above!
        results: search.values<string>("trip").map((t) => ({
            title: t,
            numPosts: search.pages(`type=post trip=${t}`).length,
        })),
    };

    // Generate sub pages for all /trip/<trip> values containing a paginated list of posts for that trip
    for (const trip of search.values<string>("trip")) {
        const trips = search.pages(`trip=${trip}`, "date=desc");

        const options = {
            url: (n: number) => (n == 1 ? `/trips/${slug(trip)}/` : `/trips/${slug(trip)}/p/${n}/`),
            size: 100,
            each: (p: any) => {
                // The archive layout renders the title data variable
                p.title = trip;
                p.backLink = {
                    url: "/trips",
                    text: "Resor",
                };
            },
        };

        for (const page of paginate(trips, options)) {
            yield page;
        }
    }
}

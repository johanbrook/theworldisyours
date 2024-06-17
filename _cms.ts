import lumeCMS from "lume/cms/mod.ts";
import GitHub from "lume/cms/storage/github.ts";
import { Octokit } from "npm:octokit";

const githubToken = Deno.env.get("LUME_CMS_GITHUB_TOKEN");
const adminPw = Deno.env.get("LUME_CMS_ADMIN_PASS");

if (!adminPw) {
    console.error("No LUME_CMS_ADMIN_PASS set!");
    Deno.exit(1);
}

const storageOf = (path: string) => `${!githubToken ? "src:" : "gh:src/"}${path}`;

const cms = lumeCMS({
    site: {
        name: "Familjen Brooks reseblogg",
        url: "https://johanbrook.github.io/theworldisyours", // XXX
    },
    auth: {
        method: "basic",
        users: {
            ...(adminPw ? { admin: adminPw } : {}),
        },
    },
});

if (githubToken) {
    cms.storage(
        "gh",
        new GitHub({
            client: new Octokit({ auth: githubToken }),
            owner: "johanbrook",
            repo: "theworldisyours",
        }),
    );
}

// COLLECTIONS

cms.collection("Inlägg", storageOf("posts/*.md"), [
    {
        name: "title",
        label: "Titel",
        type: "text",
        attributes: {
            required: true,
        },
    },
    {
        name: "content",
        label: "Text",
        type: "markdown",
        attributes: {
            required: true,
        },
    },
    {
        name: "author",
        label: "Författare",
        type: "select",
        options: ["Johan", "Clara"],
        attributes: {
            required: true,
        },
    },
])

    // DOCUMENTS

    .document("Om oss", storageOf("about.md"), [
        {
            name: "title",
            label: "Titel",
            type: "text",
            attributes: {
                required: true,
            },
        },
        {
            name: "content",
            label: "Text",
            type: "markdown",
            attributes: {
                required: true,
            },
        },
    ])
    .upload("uploads", storageOf("uploads"));

export default cms;

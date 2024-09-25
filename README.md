# The Brook family's travel blog

## Posting

Create a new post:

```bash
deno task lume new <post-slug>
```

## Dev

**Build**

```bash
deno task build
```

**Serve**

```bash
deno task serve
```
Visit [http://localhost:3000](http://localhost:3000).

**Serve with CMS**

```bash
deno task cms
```
Visit [http://localhost:3000/admin](http://localhost:3000/admin).

## Config

**Environment vars**

```bash
LUME_CMS_ADMIN_PASS=<password for CMS>
LUME_CMS_GITHUB_TOKEN=<github token for storage when deployed to GitHub Pages>
```

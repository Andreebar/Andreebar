# Andrée Barnier — personal website

The site is plain Markdown built with [Hugo](https://gohugo.io) (version 0.161.1, pinned in `.github/workflows/deploy.yml`). There are no Node packages, Go modules or themes to install: the layout is in `layouts/`, the styles in `static/css/site.css` and the small script in `static/js/site.js`.

Live site: https://andreebar.github.io/Andreebar/

## Repository layout

| Path | What it is |
| --- | --- |
| `hugo.yaml` | Site settings and the main menu (Bio, Papers, CV, Talks). |
| `data/authors/me.yaml` | Your profile: name, role, bio, links, education, interests, languages. Used by the home page, CV, talk pages and footer. |
| `content/` | All pages. Each folder becomes a URL, e.g. `content/events/espidam/` → `/events/espidam/`. |
| `content/publications/` | One folder per paper, containing `index.md`. |
| `content/events/` | One folder per talk or poster, containing `index.md`. |
| `content/experience.md` | The CV page (education is read from `data/authors/me.yaml`). |
| `assets/images/me.jpg` | Profile photo. |
| `static/uploads/resume.pdf` | The CV PDF linked from "Download CV". |
| `layouts/` | Templates (HTML). |
| `static/css/site.css` | All styling, including light and dark colours. |
| `static/js/site.js` | Theme toggle and search. |

## Edit your profile

Open `data/authors/me.yaml` and change the text. The bio supports Markdown links, e.g. `[Name](https://example.org)`.

Links in `links:` are icons on the home page and talk pages:
- an e-mail address (no `https://`) becomes a `mailto:` link;
- other entries are normal web links.

## Add a publication

Create a folder under `content/publications/` with an `index.md`:

```markdown
---
title: "Paper title"
authors:
  - Andrée Barnier
  - Co-author Name
date: "2026-01-15"
doi: "https://doi.org/10.xxxx/xxxxx"   # optional
pdf: "https://example.org/paper.pdf"   # optional
publication_types: ["preprint"]        # or "article-journal", "paper-conference", ...
abstract: One paragraph abstract.
---
```

The paper appears on the home page under "Recent Publications" and on `/publications/`. Its page is at `/publications/<folder-name>/`.

## Add a talk

Create a folder under `content/events/` with an `index.md`:

```markdown
---
title: "Talk title"
date: 2026-06-01T14:00:00
event_name: "Name of the conference or seminar"
event_url: "https://example.org/event"   # optional
location: "City, Country"
summary: "Short line shown in the talk list."
abstract: "Optional longer description."
tags:
  - Poster          # the first tag is shown as the label
  - SFP
---
```

The five most recent talks (by date) appear on the home page; all talks appear on `/events/`.

## Add or edit the CV

Edit the education entries and languages in `data/authors/me.yaml`. Each education entry can have a `summary`, a `date_start`, an optional `date_end` (empty means "Present") and an optional `button` with `text` and `url`.

## Add a blog post or project

Create `content/blog/<name>/index.md` or `content/projects/<name>/index.md` with a `title`, `date` and body text. These lists show each entry by title and link to it. Richer layouts can be added in `layouts/` later.

## Hide a page without deleting it

Add `draft: true` to its front matter. Drafts are not built or published.

## Preview locally

1. Install Hugo **0.161.1** (extended is not required). Download the binary from https://github.com/gohugoio/hugo/releases/tag/v0.161.1 or use a package manager that provides that version.
2. From the repository folder run:

   ```bash
   hugo server
   ```

3. Open the address Hugo prints (http://localhost:1313/…). The site is served under `/Andreebar/`, because `baseURL` in `hugo.yaml` includes that path.

To build the site without serving it:

```bash
hugo --minify          # output in public/
```

## Deploy

Deployment is automatic. Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site with Hugo and publishes `public/` to GitHub Pages.

Required setting: **Settings → Pages → Build and deployment → Source: GitHub Actions**. It should already be set, because the previous deployment also used GitHub Actions; check it if the site stops updating.

If you change the domain or the repository name, update `baseURL` in `hugo.yaml` to match.

### Deploy in host

Yes. Build and serve the site on your machine. The output is the same files GitHub Pages would deploy, so nothing needs to be pushed.

**Live preview (recommended):** from the repo folder, run:

```bash
hugo server
```

Then open the address Hugo prints, which is `http://localhost:1313/Andreebar/`. It reloads when you save a file.

**One-off static build:** if you want to see exactly what gets deployed, build and serve it:

```bash
hugo --minify
```

This writes the site to `public/`. Because the site lives under `/Andreebar/`, serve it from a parent folder:

```bash
mkdir -p /tmp/preview && ln -sfn "$PWD/public" /tmp/preview/Andreebar
cd /tmp/preview && python3 -m http.server 8000
```

Then open `http://localhost:8000/Andreebar/`.

You need Hugo installed first. Use version 0.161.1 to match the deploy workflow. The standard build is enough, so you don't need the "extended" version. A Homebrew install would likely give a newer version, so download 0.161.1 from the Hugo releases page or pin it with your package manager.

**Caveats:** a local preview can't test the GitHub Pages workflow itself, or the Pages source setting. Those are only checked by a push. If you want a preview of the real Actions build without merging, you can push a branch and run the workflow manually, but that means pushing and it deploys to the live site, so I wouldn't do it for a preview.

## Notes

- The body font is Inter (`static/fonts/Inter.var.woff2`), licensed under the SIL Open Font License.
- Search uses `index.json`, which Hugo generates at build time. No search service or package is needed.
- Old Hugo Blox URLs for demo content (`/blog/<demo post>/`, `/courses/hugo-blox/…`, `/projects/pandas/`, etc.) no longer exist because that content was removed.

import type { SearchItem } from "@components/Search";
import { getPublications } from "@content/getPublications";
import { getCollection } from "astro:content";
import { pick, identity, find, filter } from "lodash-es";
import getSortedPosts from "./getSortedPosts";
import { getPageNumberByPost } from "./getPagination";
import { slugifyStr } from "./slugify";

export async function getSearchList() {
  // Retrieve all published articles
  const posts = getSortedPosts(
    await getCollection("blog", ({ data }) => !data.draft)
  );
  const projects = await getCollection("projects");
  const people = await getCollection("team");
  const papers = await getPublications();

  // List of items to search in
  const searchList: SearchItem[] = [
    ...posts.map(({ data, slug }) => ({
      ...pick(data, [
        "title",
        "description",
        "tags",
        "pubDatetime",
        "modDatetime",
      ]),
      type: "News",
      url: `/news/${slug}`,
    })),
    ...projects.map(({ data, slug }) => ({
      ...pick(data, ["title", "description", "tags"]),
      type: "Projects",
      url: `/projects/${slug}`,
    })),
    ...papers
      .map(paper => ({
        type: "Publications",
        title: `${paper.year} / ${paper.title}`,
        tags: paper.tags,
        verbatim: paper.formatted,
        url: `/publications/${getPageNumberByPost(paper, { posts: papers })}#${slugifyStr(paper.title ?? "")}`,
        year: paper.year ?? 0,
        slug: paper.title,
      }))
      .toSorted((a, b) => b.year - a.year),
    ...people.map(({ data, id }) => ({
      ...pick(data, ["title", "tags"]),
      type: "People",
      url: `/team#${id}`,
      description: [data.role, data.qualification, data.affiliation]
        .filter(identity)
        .join(", "),
    })),
  ];
  return searchList;
}

export function getSearchResultsByTag(tag: string, searchList: SearchItem[]) {
  return filter(searchList, c => (c.tags ?? ["untagged"]).includes(tag));
}

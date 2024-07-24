import { sum } from "lodash-es";
import { slugifyStr } from "./slugify";
import {
  getCollection,
  type InferEntrySchema,
  type Render,
} from "astro:content";
import { getPublications } from "@content/getPublications";
import postFilter from "./postFilter";

export interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (...tags: string[][]) => {
  return tags
    .flat()
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
};

export const uniqueTags = async () => {
  const projects = await getCollection("projects");
  const posts = await getCollection("blog");
  const publications = await getPublications();
  const team = await getCollection("team");

  return getUniqueTags(
    ...projects.map(c => c.data.tags),
    ...publications.map(c => c.tags),
    ...posts.filter(postFilter).map(c => c.data.tags),
    ...team.map(c => c.data.tags)
  );
};

export default getUniqueTags;

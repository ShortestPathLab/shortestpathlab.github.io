import { SITE } from "@config";
import getPageNumbers from "./getPageNumbers";
import { chunk, find } from "lodash-es";

interface GetPaginationProps<T> {
  posts: T;
  page: string | number;
  isIndex?: boolean;
  postPerPage?: number;
}

const getPagination = <T>({
  posts,
  page,
  isIndex = false,
  postPerPage = SITE.postPerPage,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(posts.length, postPerPage);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0;

  const lastPost = isIndex ? postPerPage : currentPage * postPerPage;
  const startPost = isIndex ? 0 : lastPost - postPerPage;
  const paginatedPosts = posts.slice(startPost, lastPost);

  return {
    totalPages,
    currentPage,
    paginatedPosts,
  };
};

export const getPageNumberByPost = <T>(
  post: T,
  props: Partial<GetPaginationProps<T[]>>,
  compare = (a: T, b: T) => a === b
) => {
  const chunks = chunk(props.posts, props.postPerPage || SITE.postPerPage);
  for (const [chunk, i] of chunks.map((k, i) => [k, i] as const)) {
    if (find(chunk, p => compare(p, post))) return i + 1;
  }
  return 0;
};

export default getPagination;

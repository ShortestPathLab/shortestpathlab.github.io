import { SITE } from "@config";
import getPageNumbers from "./getPageNumbers";

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

export default getPagination;

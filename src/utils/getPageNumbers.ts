import { SITE } from "@config";

const getPageNumbers = (
  numberOfPosts: number,
  postPerPage = SITE.postPerPage
) => {
  const numberOfPages = numberOfPosts / Number(postPerPage);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export default getPageNumbers;

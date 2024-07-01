import { chain, entries, once, parseInt, values } from "lodash-es";
///@ts-ignore
import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";

plugins.config.get("@bibtex").constants.fieldTypes.pdf = ["field", "literal"];

export type Publication = {
  id: string;
  type?: string;
  authors?: string;
  title?: string;
  year?: number;
  month?: number;
  date?: number;
  publisher?: string;
  url?: string;
  formatted?: string;
  bibtex?: string;
  pdf?: string;
  citation?: string;
};

const YEAR = 0;
const MONTH = 1;
const DATE = 2;
export const getPublications = once(async () => {
  const publications = import.meta.glob("./publications/*.bib", {
    query: "?raw",
    import: "default",
  });
  const strings = await Promise.all(values(publications).map(f => f()));
  return chain(strings)
    .map(content => new Cite(content))
    .flatMap(c => c.data)
    .map(
      (c): Publication => ({
        citation: new Cite(c).format("citation"),
        id: c.id,
        type: c.type,
        bibtex: new Cite(c).format("bibtex"),
        formatted: new Cite(c).format("bibliography", {
          format: "html",
          template: "apa",
          lang: "en-us",
        }),
        url: c.DOI ? `https://doi.org/${c.DOI}` : c.URL,
        pdf: c.pdf,
        title: c.title,
        year: c.issued["date-parts"][0][YEAR] || 0,
        month: c.issued["date-parts"][0][MONTH] || 0,
        date: c.issued["date-parts"][0][DATE] || 0,
      })
    )
    .orderBy(["year", "title", "type"], ["desc", "asc", "asc"])
    .value();
});

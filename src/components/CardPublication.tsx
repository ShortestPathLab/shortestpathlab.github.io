import type { Publication } from "@content/getPublications";
import { CardBase } from "./Card";
import download from "downloadjs";

export function CardPublication({ pub }: { pub?: Publication }) {
  return (
    <>
      <CardBase
        slug={pub?.title}
        primary={`${pub?.year} / ${pub?.title}`}
        secondary={
          <span
            className="break-all text-sm font-medium sm:break-normal"
            dangerouslySetInnerHTML={{ __html: pub?.formatted ?? "" }}
          />
        }
        description={
          <div className="flex flex-row gap-4 pt-2">
            <button
              className="text-skin-accent"
              onClick={() =>
                download(
                  pub?.bibtex ?? "",
                  "citation.bib",
                  "application/x-bibtex"
                )
              }
            >
              Bibtex
            </button>
            <a
              className={
                pub?.doi ? "text-skin-accent" : "pointer-events-none opacity-50"
              }
              href={`https://doi.org/${pub?.doi}`}
            >
              Publisher
            </a>
            <a
              className={
                pub?.pdf ? "text-skin-accent" : "pointer-events-none opacity-50"
              }
              href={pub?.pdf}
            >
              PDF
            </a>
          </div>
        }
      />
    </>
  );
}

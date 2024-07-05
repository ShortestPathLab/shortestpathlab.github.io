import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import type { ReactNode } from "react";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export function CardBase({
  primary,
  secondary,
  description,
  secHeading,
  href,
  slug,
}: {
  primary?: string;
  secondary?: ReactNode;
  description?: ReactNode;
  href?: string;
  secHeading?: boolean;
  slug?: string;
}) {
  const headerProps = {
    style: { viewTransitionName: slugifyStr(slug ?? primary ?? "") },
    className: href ? `hover:underline` : "",
  };
  return (
    <li className="my-6 list-none">
      <a
        href={href}
        className={`mb-2 inline-block text-lg font-medium ${href ? "underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0" : ""}`}
      >
        {true ? (
          <h2 {...headerProps}>{primary}</h2>
        ) : (
          <h3 {...headerProps}>{primary}</h3>
        )}
      </a>
      {secondary}
      <div>{description}</div>
    </li>
  );
}
export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  return (
    <CardBase
      href={href}
      secHeading={secHeading}
      primary={title}
      description={<p className="mt-2">{description}</p>}
      secondary={
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      }
    />
  );
}

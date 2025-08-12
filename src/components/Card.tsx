import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";
import type { ComponentProps, ReactNode } from "react";
import Datetime from "./Datetime";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export function CardBase({
  primary,
  secondary,
  description,
  href,
  slug,
  ...props
}: {
  primary?: string;
  secondary?: ReactNode;
  description?: ReactNode;
  href?: string;
  slug?: string;
} & ComponentProps<"li">) {
  return (
    <li className="my-6 list-none" {...props}>
      <a
        href={href}
        className={`mb-2 inline-block text-lg font-medium ${href ? "underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0" : ""}`}
      >
        <h2
          style={{ viewTransitionName: slugifyStr(slug ?? primary ?? "") }}
          className={href ? `hover:underline` : ""}
        >
          {primary}
        </h2>
      </a>
      {secondary}
      <div>{description}</div>
    </li>
  );
}
export default function Card({ href, frontmatter }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  return (
    <CardBase
      href={href}
      primary={title}
      description={<p className="mt-2">{description}</p>}
      secondary={
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      }
    />
  );
}

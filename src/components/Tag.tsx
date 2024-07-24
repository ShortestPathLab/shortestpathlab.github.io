export interface Props {
  tag: string;
  size?: "sm" | "lg";
}

export default function Tag(props: Props) {
  const { tag, size = "sm" } = props;
  return (
    <li
      style={{ "--name": tag } as any}
      className={`inline-block ${size !== "sm" ? "hover:[view-transition-name:var(--name)] active:[view-transition-name:var(--name)]" : ""} ${
        size === "sm" ? "my-1 underline-offset-4" : "my-1 underline-offset-8"
      }`}
    >
      <a
        className={`relative hover:text-skin-accent focus-visible:p-1 ${size === "sm" ? "text-sm" : "text-lg"} group pr-2`}
        href={`/search/${tag}`}
      >
        #&nbsp;<span>{tag}</span>
      </a>
    </li>
  );
}

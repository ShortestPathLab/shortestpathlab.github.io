import { entries, groupBy } from "lodash-es";
import { CardBase } from "./Card";
import Datetime from "./Datetime";
import type { SearchItem } from "./Search";
import { slugifyStr } from "@utils/slugify";

interface Props {
  list: { item: SearchItem; refIndex?: number }[];
}

export default function SearchResultList({ list }: Props) {
  return (
    <ul>
      {list &&
        entries(groupBy(list, c => c.item.type)).map(([v, k]) => (
          <div key={v}>
            <h2 className="mt-8 text-2xl">{v}</h2>
            {k.map(({ item, refIndex }) => (
              <CardBase
                slug={item.slug ?? item.title}
                href={item.url}
                primary={item.title}
                description={item.description}
                secondary={
                  item.verbatim ? (
                    <span
                      className="break-all text-sm font-medium sm:break-normal"
                      dangerouslySetInnerHTML={{ __html: item.verbatim }}
                    />
                  ) : (
                    !!item.pubDatetime && (
                      <div className="pb-2">
                        <Datetime
                          pubDatetime={item.pubDatetime}
                          modDatetime={item.modDatetime}
                        />
                      </div>
                    )
                  )
                }
                key={`${refIndex}-${item.url}`}
              />
            ))}
          </div>
        ))}
    </ul>
  );
}

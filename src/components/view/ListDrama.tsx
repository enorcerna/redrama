import {appConfig} from "@/constants/app";
import {DoramaType} from "@/types/dorama";
import Link from "next/link";

interface Props {
  items: Partial<DoramaType>[];
}
function ListDrama({items}: Props) {
  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {items?.map(({slug, name, poster_path, name_es}, i) => (
          <Link
            href={`/doramas/${slug}`}
            className="text-center"
            key={i}
          >
            <img
              src={`${appConfig.imgPath}${poster_path}`}
              alt={name}
              className=" rounded-lg"
            />
            <h2 className="text-accent-foreground text-sm font-thin text-center">
              {name}
            </h2>
            <span className="text-sm">{name_es}</span>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default ListDrama;

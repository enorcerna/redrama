import {Search} from "lucide-react";
import {CommandDialog} from "../ui/command";
import {ChangeEvent, useEffect, useState} from "react";
import {DoramaApi} from "@/services/api";
import {DataSearch} from "@/types/doram";
import {appConfig} from "@/constants/app";
interface Props {
  open: boolean;
}
const Group = ({name}: {name: string}) => {
  return <span className="mb-1">{name}</span>;
};
function SearchForm({open}: Props) {
  const [data, setData] = useState<DataSearch>();
  const handleChangle = async (e: ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    if (q.length >= 3) {
      ("use server");
      const result = await fetch(`/api/search?q=${q}`);
      const values: DataSearch = await result.json();
      setData(values);
    }
  };
  useEffect(() => {}, [data]);
  return (
    <>
      <CommandDialog open={open}>
        <section className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            type="text"
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onChange={handleChangle}
          />
        </section>
        <div className="p-2 flex flex-col gap-2">
          <section className="flex gap-2 flex-col">
            <Group name="Doramas" />
            {data &&
              data.searchDorama.map(({name_es, _id, slug, poster_path}) => (
                <a
                  href={`/doramas/${slug}`}
                  className="ml-2 flex gap-2  font-thin px-1 py-1 hover:bg-accent rounded-sm h-9"
                  key={_id}
                >
                  <img
                    src={`${appConfig.imgPath}${poster_path}`}
                    alt=""
                    className="aspect-square h-full rounded-full"
                  />
                  <span>{name_es}</span>
                </a>
              ))}
          </section>
          <section>
            <Group name="Peliculas" />
            {data &&
              data.searchMovie.map(({name_es, _id, poster_path}) => (
                <a
                  href={`/doramas/${_id}`}
                  className="ml-2 flex gap-2  font-thin px-1 py-1 hover:bg-accent rounded-sm h-9"
                  key={_id}
                >
                  <img
                    src={`${appConfig.imgPath}${poster_path}`}
                    alt=""
                    className="aspect-square h-full rounded-full"
                  />
                  <span>{name_es}</span>
                </a>
              ))}
          </section>
        </div>
      </CommandDialog>
    </>
  );
}

export default SearchForm;

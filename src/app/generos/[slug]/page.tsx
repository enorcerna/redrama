import {Badge} from "@/components/ui/badge";
import {appConfig} from "@/constants/app";
import {DramaApi} from "@/services/apiOff";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}
async function PageGenre({params}: Props) {
  const genre = await new DramaApi().getDetailGenre(params.slug);
  const dramas = await new DramaApi().paginationDramasByGenreId(genre._id);
  return (
    <article className="w-full relative min-h-screen">
      <section className="flex justify-center items-center h-96 mb-8 bg-slate-950/75 flex-col">
        {genre?.images_doramas?.map((src, i) => (
          <img
            src={`${appConfig.imgPath}${src}`}
            alt=""
            key={i}
            style={{
              width: `${genre.images_doramas.length === 4 ? i * 25 : i * 20}%`,
              marginTop: `${i}rem`
            }}
            className="absolute top-0 h-80 rounded-lg  w-full aspect-video object-cover  -z-10"
          />
        ))}
        <h1 className="text-3xl font-semibold mb-3 ">{genre.name}</h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{genre.number_of_doramas} Doramas</Badge>
          <Badge variant="secondary">{genre.number_of_movies} Peliculas</Badge>
        </div>
      </section>
      <section>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {dramas?.items?.map(({slug, name, poster_path, name_es}, i) => (
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
      </section>
    </article>
  );
}

export default PageGenre;

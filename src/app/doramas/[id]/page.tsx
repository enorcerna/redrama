import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Slider from "@/components/view/Slider";
import Trailer from "@/components/view/Trailer";
import {appConfig} from "@/constants/app";
import {DramaApi} from "@/services/apiOff";
import {Icon} from "@iconify/react";
import {Metadata} from "next";
import Link from "next/link";
interface Props {
  params: {
    id: string;
  };
}
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const drama = await new DramaApi().getDetailDoramaBySlug(params.id);
  return {
    title: drama.name_es + " | Redrama"
  };
}
async function PageDorama({params}: Props) {
  const drama = await new DramaApi().getDetailDoramaBySlug(params.id);
  const episodes = await new DramaApi().getListEpisodes(drama._id);
  const similar = await new DramaApi().getSimilarDoramas(drama._id);
  return (
    <article className="w-full">
      <img
        src={`${appConfig.imgPath}${drama.backdrop_path}`}
        alt=""
        className="absolute   left-0 right-0 aspect-video object-cover -z-10  opacity-50 h-80 w-full"
      />
      <section className="flex gap-2 flex-col md:flex-row  lg:p-9 mt-6 items-center  backdrop-blur-lg  rounded-lg mb-3">
        <img
          src={`${appConfig.imgPath}${drama.poster_path}`}
          className="rounded-lg h-full w-1/2 sm:w-auto"
        />
        <div className="flex gap-2 flex-col -mt-20 md:m-auto justify-start backdrop-blur-lg z-10 p-8">
          <div className="flex gap-1 flex-col mb-3">
            <h1 className="text-4xl">{drama.name_es}</h1>
            <span className="font-light  opacity-80">{drama.name}</span>
          </div>

          <ul className="flex gap-2 flex-wrap">
            {drama.labels.map((val, i) => (
              <li key={i}>
                <Badge variant="secondary">{val.name}</Badge>
              </li>
            ))}
          </ul>
          <ul className="flex gap-2 flex-wrap mb-3">
            {drama.genres.map(({name, slug}, i) => (
              <li key={i}>
                <Link href={`/generos/${slug}`}>{name}</Link>
              </li>
            ))}
          </ul>
          <div className=" flex gap-2 ">
            <Link
              href={`/capitulo/${episodes[0].slug ?? "#"}`}
              className="flex gap-2 items-center bg-red-600 p-2 rounded-lg"
            >
              <Icon icon="solar:play-bold" />
              Ver ahora
            </Link>
            <Trailer code={drama.trailer} />
          </div>
        </div>
      </section>
      <p className="font-thin text-wrap mb-3">{drama.overview}</p>
      <section className="">
        <h3 className="text-2xl mb-3">Reparto</h3>
        <Carousel>
          <CarouselContent>
            {drama.cast.map(({profile_path, name, character}, i) => (
              <CarouselItem
                className=" basis-1/4 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 text-center object-cover"
                key={i}
              >
                <div>
                  <img
                    src={`${appConfig.imgPath}${profile_path}`}
                    className="aspect-square object-cover rounded-full shadow-lg h-full"
                  />
                  <span className="font-thin text-sm">{character}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <section>
        <h3 className="text-2xl mb-3">Lista de episodios</h3>
        <ul className="grid grid-cols-3 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {episodes.map(
            ({name, season_poster, season_number, episode_number, slug}, i) => (
              <li key={i}>
                <a
                  href={`/capitulo/${slug}`}
                  className="relative flex items-center justify-center"
                >
                  <img
                    src={`${appConfig.imgPath}${season_poster}`}
                    alt=""
                    className="aspect-[1/1] object-cover w-auto rounded-lg opacity-20"
                  />
                  <Button
                    variant="link"
                    className="absolute flex flex-wrap  gap-1 items-center"
                  >
                    <h3 className="text-center bottom-0">
                      <span className="">
                        {season_number} x {episode_number}
                      </span>
                    </h3>
                    <Icon icon="tabler:play" />
                  </Button>
                </a>
              </li>
            )
          )}
        </ul>
      </section>
      <section className="">
        <h2 className="mb-3 text-2xl">Series Similares</h2>
        <Slider data={similar} />
      </section>
    </article>
  );
}

export default PageDorama;

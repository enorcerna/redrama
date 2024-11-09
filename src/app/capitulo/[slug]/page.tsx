import {Icon} from "@iconify/react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Video from "@/components/view/Video";
import {appConfig} from "@/constants/app";
import {DoramaApi} from "@/services/api";
import {DramaApi} from "@/services/apiOff";
import ControlEpisode from "@/components/view/ControlEpisode";
import {Button} from "@/components/ui/button";
import Slider from "@/components/view/Slider";
import {Metadata} from "next";

interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const cap = await new DramaApi().getDetailEpisodeBySlug(
    params.slug as string
  );
  return {
    title: cap?.name_es + " | Redrama"
  };
}
async function PageCap({params}: Props) {
  const cap = await new DramaApi().getDetailEpisodeBySlug(
    params.slug as string
  );
  const links = await new DoramaApi().getEpisodelinks(cap?._id);
  const episodes = await new DramaApi().getListEpisodes(cap.serie_id);
  const similar = await new DramaApi().getSimilarDoramas(cap.serie_id);
  return (
    <article className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1>{cap?.name_es}</h1>
        <Video
          links={links}
          link={cap?.links_online[0]?.link ?? ""}
        />
        <ControlEpisode
          id={cap._id}
          serieSlug={cap.serie_slug}
        />
      </section>
      <Tabs
        defaultValue="detail"
        className=" w-full"
      >
        <TabsList>
          <TabsTrigger value="detail">Detalle</TabsTrigger>
          <TabsTrigger value="episodios">Episodios</TabsTrigger>
        </TabsList>
        <TabsContent
          value="detail"
          className="flex flex-wrap"
        >
          <img
            src={`${appConfig.imgPath}${cap.serie_poster}`}
            alt=""
          />
          <p>{cap.overview}</p>
        </TabsContent>
        <TabsContent value="episodios">
          {" "}
          <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {episodes.map(
              (
                {name, season_poster, season_number, episode_number, slug},
                i
              ) => (
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
        </TabsContent>
      </Tabs>
      <section>
        <h2>Series Similares</h2>
        <Slider data={similar} />
      </section>
    </article>
  );
}

export default PageCap;

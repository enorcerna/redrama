import {ListDorama} from "@/types/doram";
import {Carousel, CarouselContent, CarouselItem} from "../ui/carousel";
import Link from "next/link";
import {appConfig} from "@/constants/app";
import {DoramaType} from "@/types/dorama";

interface Props {
  data: ListDorama[] | DoramaType[];
}

function Slider({data}: Props) {
  return (
    <Carousel>
      <CarouselContent className="relative">
        {data?.map(({name, poster_path, name_es, slug}, i) => (
          <CarouselItem
            className="basis-1/2 sm:basis-1/3 md:basis-1/5  text-center"
            key={i}
          >
            <Link href={`/doramas/${slug}`}>
              <img
                src={`${appConfig.imgPath}${poster_path}`}
                alt={name}
                className="rounded-lg"
              />
              <h2 className="text-accent-foreground text-sm font-thin text-center">
                {name}
              </h2>
              <span className="text-sm">{name_es}</span>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default Slider;

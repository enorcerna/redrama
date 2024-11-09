"use client";
import {Icon} from "@iconify/react";
import {LinksOnline} from "@/types/doram";
import {Button} from "../ui/button";
import {PlayCircle} from "lucide-react";
import {useState} from "react";
import {getUrlVideo} from "@/services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {addNameServers} from "@/utils/app";

interface Props {
  links: LinksOnline[];
  link?: string;
}
function Video({links, link}: Props) {
  const server = addNameServers(links);
  const [url, setUrl] = useState(link ?? "");
  const handleSetter = (val: string) => {
    const link = getUrlVideo(val);
    if (link.length > 0) {
      setUrl(link);
    }
  };
  return (
    <div className="relative flex gap-2 h-full flex-col lg:flex-row">
      <section className="w-full h-full">
        <iframe
          src={url}
          width="100%"
          height="100%"
          className="aspect-video h-[500px] rounded-lg"
          allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
          allowFullScreen
        />
      </section>
      <section className="absolute top-1 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2 items-center backdrop-blur-lg p-2 rounded-full">
            <Icon
              icon="solar:video-library-line-duotone"
              className="h-8 w-8"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ul className="flex gap-1 flex-wrap flex-col ">
              {server?.map(({link, name, langs}, i) => (
                <Button
                  key={i}
                  onClick={() => handleSetter(link)}
                  variant="secondary"
                  className="font-light flex gap-2 items-center"
                >
                  <Icon icon="solar:play-circle-line-duotone" />
                  <span>{langs.name}</span>
                  <span className="text-xs opacity-50">{name} </span>
                </Button>
              ))}
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  );
}

export default Video;

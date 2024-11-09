import {DramaApi} from "@/services/apiOff";
import {Button} from "../ui/button";
import {Icon} from "@iconify/react";
interface Props {
  id: string;
  serieSlug?: string;
}
async function ControlEpisode({id, serieSlug}: Props) {
  const next = await new DramaApi().getNextEpisode(id);
  const prev = await new DramaApi().getPrevEpisode(id);
  return (
    <div className="w-full flex justify-between">
      {prev ? (
        <a
          href={`/capitulo/${prev.slug}`}
          title={prev.name}
        >
          <Button
            variant="outline"
            className="flex gap-1"
          >
            <Icon icon="solar:skip-previous-outline" />
            <span>Anterior</span>
          </Button>
        </a>
      ) : (
        <Button
          variant="outline"
          disabled
          className="flex  gap-2 "
        >
          <Icon icon="solar:skip-previous-outline" />
          <span>Anterior</span>
        </Button>
      )}
      <a href={`/doramas/${serieSlug}`}>
        <Button
          variant="outline"
          className="flex  gap-2 "
        >
          <Icon icon="solar:plaaylist-minimalistic-broken" />
          <span>Lista</span>
        </Button>
      </a>
      <a
        href={`/capitulo/${next.slug}`}
        title={next.name}
      >
        <Button
          variant="outline"
          className="flex gap-1"
        >
          <Icon icon="solar:skip-next-outline" />
          <span>Siquiente</span>
        </Button>
      </a>
    </div>
  );
}

export default ControlEpisode;

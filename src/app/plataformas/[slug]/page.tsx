import ListDrama from "@/components/view/ListDrama";
import {DramaApi} from "@/services/apiOff";

interface Props {
  params: {
    slug: string;
  };
}
async function PageNetworks({params}: Props) {
  const network = await new DramaApi().getNetworkBySlug(params.slug);
  const dramas = await new DramaApi().paginationDramasBynetworkId(network._id);
  return (
    <article className="flex flex-col gap-3 min-h-screen">
      <p>{params.slug}</p>
      <section>
        <ListDrama items={dramas.items} />
      </section>
    </article>
  );
}

export default PageNetworks;

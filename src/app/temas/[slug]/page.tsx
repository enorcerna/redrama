import ListDrama from "@/components/view/ListDrama";
import {DramaApi} from "@/services/apiOff";

interface Props {
  params: {
    slug: string;
  };
}
async function PageLabels({params}: Props) {
  const label = await new DramaApi().getLabelBySlug(params.slug);
  const dramas = await new DramaApi().paginationDramasByLabelId(label._id);
  return (
    <article className="flex flex-col gap-3 min-h-screen">
      <h1>{label.name}</h1>
      <section>
        <ListDrama items={dramas.items} />
      </section>
    </article>
  );
}

export default PageLabels;

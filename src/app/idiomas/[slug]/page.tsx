import ListDrama from "@/components/view/ListDrama";
import {DramaApi} from "@/services/apiOff";

interface Props {
  params: {
    slug: string;
  };
}
async function PageLangs({params}: Props) {
  const lang = await new DramaApi().getLangBySlug(params.slug);
  const dramas = await new DramaApi().paginationDramasByLangId(lang.code_flix);
  return (
    <article className="flex flex-col gap-3 min-h-screen">
      <h1>{lang.name}</h1>
      <img
        src={lang.flag}
        alt=""
      />
      <section>
        <ListDrama items={dramas.items} />
      </section>
    </article>
  );
}

export default PageLangs;

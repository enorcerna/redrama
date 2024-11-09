import Slider from "@/components/view/Slider";
import {DoramaApi} from "@/services/api";
import type {MouseEvent} from "react";

export default async function Home() {
  const newDramas = await new DoramaApi().getNewDrama();

  return (
    <main className="min-h-screen ">
      <section className="flex flex-col gap-3">
        <h2>Ultimos Doramas</h2>
        <Slider data={newDramas} />
      </section>
    </main>
  );
}

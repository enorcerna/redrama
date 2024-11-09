import {DoramaApi} from "@/services/api";
import {Icon} from "@iconify/react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from "../ui/menubar";
import langs from "@/data/langs.json";
import {DramaApi} from "@/services/apiOff";
import {ScrollArea} from "../ui/scroll-area";
async function Categories() {
  const genres = await new DoramaApi().getCategories();
  const countries = await new DramaApi().getCountries();
  const networks = await new DramaApi().getNetworks();
  const labels = await new DramaApi().getLabels();
  return (
    <div>
      <Menubar className="">
        <MenubarMenu>
          <MenubarTrigger>
            <Icon icon="tabler:menu" />
          </MenubarTrigger>
          <MenubarContent
            className=""
            align="end"
          >
            <MenubarSub>
              <MenubarSubTrigger>Generos</MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent className="grid grid-cols-3 gap-1">
                  {genres?.map(({name, slug}, i) => (
                    <MenubarItem
                      key={i}
                      className="font-thin text-sm"
                    >
                      <a
                        href={`/generos/${slug}`}
                        className="w-full h-full"
                      >
                        {name}
                      </a>
                    </MenubarItem>
                  ))}
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Paises</MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent className="grid grid-cols-3 gap-1">
                  {countries?.map(({name, slug}, i) => (
                    <MenubarItem
                      key={i}
                      className="font-thin text-sm"
                    >
                      <a
                        href={`/paises/${slug}`}
                        className="w-full h-full"
                      >
                        {name}
                      </a>
                    </MenubarItem>
                  ))}
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Platformas</MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent className="grid grid-cols-3 gap-1">
                  {networks?.map(({name, slug}, i) => (
                    <MenubarItem
                      key={i}
                      className="font-thin text-sm"
                    >
                      <a
                        href={`/plataformas/${slug}`}
                        className="w-full h-full"
                      >
                        {name}
                      </a>
                    </MenubarItem>
                  ))}
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Idiomas</MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent className="grid grid-cols-3 gap-1">
                  {langs?.map(({name, slug}, i) => (
                    <MenubarItem
                      key={i}
                      className="font-thin text-sm"
                    >
                      <a
                        href={`/idiomas/${slug}`}
                        className="w-full h-full"
                      >
                        {name}
                      </a>
                    </MenubarItem>
                  ))}
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Temas</MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent>
                  <ScrollArea className="h-64">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 h-52 ">
                      {labels?.map(({name, slug}, i) => (
                        <MenubarItem
                          key={i}
                          className="font-thin text-sm"
                        >
                          <a
                            href={`/temas/${slug}`}
                            className="w-full h-full"
                          >
                            {name}
                          </a>
                        </MenubarItem>
                      ))}
                    </div>
                  </ScrollArea>
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default Categories;

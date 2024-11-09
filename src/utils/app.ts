import {LinksOnline} from "@/types/doram";
import Names from "@/data/servers.json";
import Langs from "@/data/langs.json";
const addNameServers = (link: LinksOnline[]) => {
  return link.map((d) => {
    const lgs = Langs.find(({code_flix}) => code_flix === String(d.lang));
    return {
      ...d,
      id: lgs?._id,
      name:
        Names.find(({code_flix}) => code_flix === String(d.server))?.name ?? "",
      langs: {
        name: lgs?.name,
        code: lgs?.code,
        code_flix: lgs?.code_flix
      }
    };
  });
};
export {addNameServers};

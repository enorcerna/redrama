"use client";

import {useSearchParams} from "next/navigation";

function Filter() {
  const country = useSearchParams().get("cty");
  const page = useSearchParams().get("page");
  const lang = useSearchParams().get("lang");
  const network = useSearchParams().get("net");
  const year = useSearchParams().get("year");
  return <></>;
}

export default Filter;

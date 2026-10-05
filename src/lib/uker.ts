import { retter, fasteVarer, type Ingrediens, type Rett } from "../data/retter";
import { lagHandleliste, type Handleliste } from "./handleliste";
import { lagSunnhet, type Sunnhet } from "./sunnhet";

// Ukefilene skrives fra Claude Code, én per uke: src/data/uker/ÅÅÅÅ-UU.json

export const STEG = ["listet", "priser", "meny", "kurv", "bestilt"] as const;
export type Status = (typeof STEG)[number];

interface UkeFil {
  uke: string;
  eksempel?: boolean;
  status: Status;
  porsjoner: number;
  middager: { rettId: string; dager?: number; porsjoner?: number }[];
  faste?: string[];
  ekstra?: Ingrediens[];
  notat?: string;
}

export interface Uke {
  uke: string;
  tittel: string;
  eksempel: boolean;
  status: Status;
  porsjoner: number;
  notat?: string;
  middager: { rett: Rett; dager: number; porsjonerPerDag: number }[];
  handleliste: Handleliste;
  sunnhet: Sunnhet;
  minutter: number;
}

const filer = import.meta.glob<UkeFil>("../data/uker/*.json", { eager: true, import: "default" });

function bygg(fil: UkeFil): Uke {
  const middager = fil.middager.map(m => {
    const rett = retter.find(r => r.id === m.rettId);
    if (!rett) throw new Error(`Uke ${fil.uke}: finner ikke retten «${m.rettId}» i rettbanken`);
    return { rett, dager: m.dager ?? 1, porsjonerPerDag: m.porsjoner ?? fil.porsjoner };
  });
  const faste = fasteVarer.filter(v => fil.faste?.includes(v.navn));
  const [aar, nr] = fil.uke.split("-");

  return {
    uke: fil.uke,
    tittel: `Uke ${Number(nr)}, ${aar}`,
    eksempel: fil.eksempel ?? false,
    status: fil.status,
    porsjoner: fil.porsjoner,
    notat: fil.notat,
    middager,
    handleliste: lagHandleliste(
      middager.map(m => ({ rett: m.rett, porsjoner: m.porsjonerPerDag * m.dager })),
      [...faste, ...(fil.ekstra ?? [])],
    ),
    sunnhet: lagSunnhet(middager),
    minutter: middager.reduce((s, m) => s + m.rett.minutter, 0),
  };
}

// Nyeste uke først.
export const uker: Uke[] = Object.values(filer)
  .map(bygg)
  .sort((a, b) => b.uke.localeCompare(a.uke));

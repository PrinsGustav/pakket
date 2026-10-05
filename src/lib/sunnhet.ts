import type { Ingrediens, Rett, RettType } from "../data/retter";

// Grov sunnhetsoversikt for ukas middager. Veiledende, ikke ernæringsberegning.
// Referanser (Helsedirektoratets kostråd): fisk 2–3 ganger i uka, begrens rødt og bearbeidet kjøtt
// til ca. 500 g tilberedt (ca. 700 g rått) per person i uka, og «5 om dagen» (500 g frukt og grønt per dag).

type Gruppe = "grønt" | "fisk" | "rødt kjøtt" | "hvitt kjøtt";

// Hvilken gruppe en ingrediens hører til. Ingredienser som ikke står her, telles ikke.
const GRUPPE: Record<string, Gruppe> = {
  Laksefilet: "fisk", Torskefilet: "fisk", Fiskekaker: "fisk",
  Kjøttdeig: "rødt kjøtt", Kjøttkaker: "rødt kjøtt", Skinke: "rødt kjøtt", Hamburgere: "rødt kjøtt",
  Kyllingfilet: "hvitt kjøtt", Kyllinglår: "hvitt kjøtt",
  Brokkoli: "grønt", Gulrot: "grønt", Løk: "grønt", Rødløk: "grønt", Vårløk: "grønt", Paprika: "grønt",
  Tomater: "grønt", Agurk: "grønt", Isbergsalat: "grønt", Avokado: "grønt", Champignon: "grønt",
  Babyspinat: "grønt", Søtpotet: "grønt", Wokgrønnsaker: "grønt", Erter: "grønt", Edamamebønner: "grønt",
  Mais: "grønt", "Hakkede tomater": "grønt", Kidneybønner: "grønt", "Røde linser": "grønt",
};

// Omtrentlig vekt i gram for varer som ikke måles i gram.
const GRAM_PER: Record<string, number> = {
  Brokkoli: 400, Gulrot: 80, Løk: 100, Rødløk: 100, Vårløk: 15, Paprika: 150, Tomater: 100, Agurk: 350,
  Isbergsalat: 400, Avokado: 150, Mais: 200, "Hakkede tomater": 400, Kidneybønner: 250, Hamburgere: 150,
};

function gram(ing: Ingrediens): number {
  return ing.enhet === "g" ? ing.mengde : ing.mengde * (GRAM_PER[ing.navn] ?? 0);
}

export interface Sunnhet {
  middager: number;
  fiskemiddager: number;
  rodtKjottPerPerson: number;
  grontPerPersonPerMiddag: number;
  snittProtein: number;
  fordeling: { type: RettType; antall: number }[];
}

export function lagSunnhet(valgte: { rett: Rett; dager: number; porsjonerPerDag: number }[]): Sunnhet {
  const sum: Record<Gruppe, number> = { grønt: 0, fisk: 0, "rødt kjøtt": 0, "hvitt kjøtt": 0 };
  const fordeling = new Map<RettType, number>();
  let middager = 0, protein = 0, personer = 1;

  for (const { rett, dager, porsjonerPerDag } of valgte) {
    personer = porsjonerPerDag;
    middager += dager;
    protein += rett.proteinPerPorsjon * dager;
    fordeling.set(rett.type, (fordeling.get(rett.type) ?? 0) + dager);
    const faktor = (porsjonerPerDag * dager) / rett.porsjoner;
    for (const ing of rett.ingredienser) {
      const g = GRUPPE[ing.navn];
      if (g) sum[g] += gram(ing) * faktor;
    }
  }

  return {
    middager,
    fiskemiddager: fordeling.get("fisk") ?? 0,
    rodtKjottPerPerson: Math.round(sum["rødt kjøtt"] / personer / 10) * 10,
    grontPerPersonPerMiddag: middager ? Math.round(sum.grønt / personer / middager / 10) * 10 : 0,
    snittProtein: middager ? Math.round(protein / middager) : 0,
    fordeling: [...fordeling.entries()].map(([type, antall]) => ({ type, antall })).sort((a, b) => b.antall - a.antall),
  };
}

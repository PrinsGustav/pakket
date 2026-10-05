import { kategorier, type Enhet, type Ingrediens, type Kategori, type Rett } from "../data/retter";

export interface Linje {
  navn: string;
  mengde: number;
  enhet: Enhet;
  kategori: Kategori;
  til: string[];
}

export interface Handleliste {
  grupper: { kategori: Kategori; linjer: Linje[] }[];
  basis: { navn: string; til: string[] }[];
}

// Vekt og volum rundes opp. Stykkvarer og pakker rundes opp bare når overskuddet er mer
// enn en tredjedel, ellers blir 1 agurk til 2 når 3 porsjoner skaleres til 4.
function rund(mengde: number, enhet: Enhet): number {
  if (enhet === "g") return Math.ceil(mengde / 50 - 1e-9) * 50;
  if (enhet === "dl") return Math.ceil(mengde * 2 - 1e-9) / 2;
  return Math.max(1, Math.ceil(mengde - 0.34));
}

export function formaterMengde(mengde: number, enhet: Enhet): string {
  if (enhet === "g" && mengde >= 1000) {
    return `${(mengde / 1000).toLocaleString("nb-NO", { maximumFractionDigits: 2 })} kg`;
  }
  return `${mengde.toLocaleString("nb-NO")} ${enhet}`;
}

export function lagHandleliste(valgte: Rett[], porsjoner: number, fasteVarer: Ingrediens[]): Handleliste {
  const linjer = new Map<string, Linje>();
  const basis = new Map<string, Set<string>>();

  const leggTil = (ing: Ingrediens, faktor: number, til: string) => {
    if (ing.basis) {
      if (!basis.has(ing.navn)) basis.set(ing.navn, new Set());
      basis.get(ing.navn)!.add(til);
      return;
    }
    const nokkel = `${ing.navn}|${ing.enhet}`;
    const linje = linjer.get(nokkel) ?? { navn: ing.navn, mengde: 0, enhet: ing.enhet, kategori: ing.kategori, til: [] };
    linje.mengde += ing.mengde * faktor;
    if (!linje.til.includes(til)) linje.til.push(til);
    linjer.set(nokkel, linje);
  };

  for (const rett of valgte) {
    const faktor = porsjoner / rett.porsjoner;
    for (const ing of rett.ingredienser) leggTil(ing, faktor, rett.navn);
  }
  for (const vare of fasteVarer) leggTil({ ...vare, basis: false }, 1, "Faste varer");

  const iLista = new Set([...linjer.values()].map(l => l.navn));

  return {
    grupper: kategorier
      .map(kategori => ({
        kategori,
        linjer: [...linjer.values()]
          .filter(l => l.kategori === kategori)
          .map(l => ({ ...l, mengde: rund(l.mengde, l.enhet) }))
          .sort((a, b) => a.navn.localeCompare(b.navn, "nb")),
      }))
      .filter(g => g.linjer.length > 0),
    basis: [...basis.entries()]
      .filter(([navn]) => !iLista.has(navn))
      .map(([navn, til]) => ({ navn, til: [...til] }))
      .sort((a, b) => a.navn.localeCompare(b.navn, "nb")),
  };
}

export function somTekst(liste: Handleliste): string {
  const deler = liste.grupper.map(
    g => `${g.kategori}\n${g.linjer.map(l => `- ${l.navn}, ${formaterMengde(l.mengde, l.enhet)}`).join("\n")}`,
  );
  if (liste.basis.length) {
    deler.push(`Sjekk at du har\n${liste.basis.map(b => `- ${b.navn}`).join("\n")}`);
  }
  return deler.join("\n\n");
}

// Rettbanken. Mengdene gjelder for `porsjoner`, og skaleres på /meny.
// Protein er grove anslag per porsjon.
// basis: true = varer man ofte har hjemme (olje, krydder, ris). Vises som «Har du dette hjemme?».

export type Kategori =
  | "Frukt og grønt"
  | "Kjøtt og fisk"
  | "Meieri og egg"
  | "Brød og bakst"
  | "Tørrvarer og hermetikk"
  | "Frys"
  | "Annet";

export type Enhet = "g" | "stk" | "pk" | "boks" | "dl" | "pose";

export interface Ingrediens {
  navn: string;
  mengde: number;
  enhet: Enhet;
  kategori: Kategori;
  basis?: boolean;
}

export type RettType = "fisk" | "kylling" | "kjøtt" | "egg" | "vegetar";

export interface Rett {
  id: string;
  navn: string;
  type: RettType;
  beskrivelse: string;
  kilde?: string;
  bilde?: string;
  minutter: number;
  proteinPerPorsjon: number;
  porsjoner: number;
  merker: string[];
  ingredienser: Ingrediens[];
}

export const kategorier: Kategori[] = [
  "Frukt og grønt",
  "Kjøtt og fisk",
  "Meieri og egg",
  "Brød og bakst",
  "Tørrvarer og hermetikk",
  "Frys",
  "Annet",
];

export const retter: Rett[] = [
  {
    id: "laks-i-ovn",
    navn: "Laks i ovn med poteter og brokkoli",
    type: "fisk",
    beskrivelse: "Ovnsbakt laks med sitron, kokte poteter og dampet brokkoli.",
    minutter: 30,
    proteinPerPorsjon: 35,
    porsjoner: 3,
    merker: ["fisk"],
    ingredienser: [
      { navn: "Laksefilet", mengde: 450, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Poteter", mengde: 750, enhet: "g", kategori: "Frukt og grønt" },
      { navn: "Brokkoli", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Sitron", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Smør", mengde: 1, enhet: "pk", kategori: "Meieri og egg", basis: true },
    ],
  },
  {
    id: "kyllingwok",
    navn: "Kyllingwok med nudler",
    type: "kylling",
    beskrivelse: "Rask wok med kylling, grønnsaker og eggnudler i soyasaus.",
    minutter: 20,
    proteinPerPorsjon: 40,
    porsjoner: 3,
    merker: ["kylling", "rask"],
    ingredienser: [
      { navn: "Kyllingfilet", mengde: 500, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Eggnudler", mengde: 250, enhet: "g", kategori: "Tørrvarer og hermetikk" },
      { navn: "Wokgrønnsaker", mengde: 600, enhet: "g", kategori: "Frys" },
      { navn: "Soyasaus", mengde: 1, enhet: "stk", kategori: "Tørrvarer og hermetikk", basis: true },
      { navn: "Nøytral olje", mengde: 1, enhet: "stk", kategori: "Tørrvarer og hermetikk", basis: true },
    ],
  },
  {
    id: "taco",
    navn: "Taco",
    type: "kjøtt",
    beskrivelse: "Fredagsklassikeren med kjøttdeig, grønnsaker, ost og rømme.",
    minutter: 25,
    proteinPerPorsjon: 32,
    porsjoner: 3,
    merker: ["kjøttdeig", "fredag"],
    ingredienser: [
      { navn: "Kjøttdeig", mengde: 400, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Tortillalefser", mengde: 1, enhet: "pk", kategori: "Brød og bakst" },
      { navn: "Tacokrydder", mengde: 1, enhet: "pose", kategori: "Tørrvarer og hermetikk" },
      { navn: "Isbergsalat", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Tomater", mengde: 3, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Agurk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Mais", mengde: 1, enhet: "boks", kategori: "Tørrvarer og hermetikk" },
      { navn: "Revet ost", mengde: 200, enhet: "g", kategori: "Meieri og egg" },
      { navn: "Rømme", mengde: 1, enhet: "stk", kategori: "Meieri og egg" },
    ],
  },
  {
    id: "bolognese",
    navn: "Spaghetti bolognese",
    type: "kjøtt",
    beskrivelse: "Kjøttsaus med tomat, løk og gulrot, servert med spaghetti og parmesan.",
    minutter: 35,
    proteinPerPorsjon: 30,
    porsjoner: 3,
    merker: ["kjøttdeig"],
    ingredienser: [
      { navn: "Kjøttdeig", mengde: 400, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Spaghetti", mengde: 350, enhet: "g", kategori: "Tørrvarer og hermetikk" },
      { navn: "Hakkede tomater", mengde: 2, enhet: "boks", kategori: "Tørrvarer og hermetikk" },
      { navn: "Løk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Gulrot", mengde: 2, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Hvitløk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt", basis: true },
      { navn: "Parmesan", mengde: 100, enhet: "g", kategori: "Meieri og egg" },
    ],
  },
  {
    id: "kyllingkarri",
    navn: "Kyllinggryte med karri og ris",
    type: "kylling",
    beskrivelse: "Mild karrigryte med kylling, kokosmelk og paprika, servert med ris.",
    minutter: 30,
    proteinPerPorsjon: 38,
    porsjoner: 3,
    merker: ["kylling", "gryte"],
    ingredienser: [
      { navn: "Kyllingfilet", mengde: 500, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Kokosmelk", mengde: 1, enhet: "boks", kategori: "Tørrvarer og hermetikk" },
      { navn: "Paprika", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Løk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Ris", mengde: 250, enhet: "g", kategori: "Tørrvarer og hermetikk", basis: true },
      { navn: "Karri", mengde: 1, enhet: "stk", kategori: "Tørrvarer og hermetikk", basis: true },
    ],
  },
  {
    id: "torsk",
    navn: "Torsk med poteter og gulrøtter",
    type: "fisk",
    beskrivelse: "Torskefilet med smør, poteter og gulrøtter. Enkel og norsk.",
    minutter: 30,
    proteinPerPorsjon: 34,
    porsjoner: 3,
    merker: ["fisk"],
    ingredienser: [
      { navn: "Torskefilet", mengde: 500, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Poteter", mengde: 750, enhet: "g", kategori: "Frukt og grønt" },
      { navn: "Gulrot", mengde: 4, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Smør", mengde: 1, enhet: "pk", kategori: "Meieri og egg", basis: true },
    ],
  },
  {
    id: "kjottkaker",
    navn: "Kjøttkaker i brun saus",
    type: "kjøtt",
    beskrivelse: "Kjøttkaker i brun saus med poteter, erter og tyttebær.",
    minutter: 35,
    proteinPerPorsjon: 28,
    porsjoner: 3,
    merker: ["tradisjonell"],
    ingredienser: [
      { navn: "Kjøttkaker", mengde: 600, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Poteter", mengde: 750, enhet: "g", kategori: "Frukt og grønt" },
      { navn: "Brun saus", mengde: 1, enhet: "pose", kategori: "Tørrvarer og hermetikk" },
      { navn: "Erter", mengde: 300, enhet: "g", kategori: "Frys" },
      { navn: "Tyttebærsyltetøy", mengde: 1, enhet: "stk", kategori: "Tørrvarer og hermetikk", basis: true },
    ],
  },
  {
    id: "pizza",
    navn: "Hjemmelaget pizza",
    type: "kjøtt",
    beskrivelse: "Hjemmelaget pizza med skinke, paprika og sjampinjong.",
    minutter: 30,
    proteinPerPorsjon: 30,
    porsjoner: 3,
    merker: ["fredag"],
    ingredienser: [
      { navn: "Pizzabunn", mengde: 2, enhet: "stk", kategori: "Brød og bakst" },
      { navn: "Pizzasaus", mengde: 1, enhet: "boks", kategori: "Tørrvarer og hermetikk" },
      { navn: "Revet ost", mengde: 300, enhet: "g", kategori: "Meieri og egg" },
      { navn: "Skinke", mengde: 200, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Paprika", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Champignon", mengde: 250, enhet: "g", kategori: "Frukt og grønt" },
    ],
  },
  {
    id: "omelett",
    navn: "Omelett med skinke og grønnsaker",
    type: "egg",
    beskrivelse: "Omelett med skinke, paprika og vårløk. Middag på et kvarter.",
    minutter: 15,
    proteinPerPorsjon: 28,
    porsjoner: 3,
    merker: ["rask", "egg"],
    ingredienser: [
      { navn: "Egg", mengde: 9, enhet: "stk", kategori: "Meieri og egg" },
      { navn: "Skinke", mengde: 150, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Paprika", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Vårløk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Grovbrød", mengde: 1, enhet: "stk", kategori: "Brød og bakst" },
    ],
  },
  {
    id: "kyllinglar",
    navn: "Kyllinglår i ovn med søtpotet",
    type: "kylling",
    beskrivelse: "Kyllinglår og søtpotet i ovnen, med rødløk og olivenolje.",
    minutter: 45,
    proteinPerPorsjon: 36,
    porsjoner: 3,
    merker: ["kylling", "ovn"],
    ingredienser: [
      { navn: "Kyllinglår", mengde: 900, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Søtpotet", mengde: 700, enhet: "g", kategori: "Frukt og grønt" },
      { navn: "Rødløk", mengde: 2, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Olivenolje", mengde: 1, enhet: "stk", kategori: "Tørrvarer og hermetikk", basis: true },
    ],
  },
  {
    id: "poke",
    navn: "Laks poke bowl",
    type: "fisk",
    beskrivelse: "Laks, ris, avokado, agurk og edamame i bolle.",
    minutter: 25,
    proteinPerPorsjon: 33,
    porsjoner: 3,
    merker: ["fisk", "frisk"],
    ingredienser: [
      { navn: "Laksefilet", mengde: 400, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Ris", mengde: 250, enhet: "g", kategori: "Tørrvarer og hermetikk", basis: true },
      { navn: "Avokado", mengde: 2, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Agurk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Edamamebønner", mengde: 200, enhet: "g", kategori: "Frys" },
      { navn: "Soyasaus", mengde: 1, enhet: "stk", kategori: "Tørrvarer og hermetikk", basis: true },
    ],
  },
  {
    id: "kremet-pasta",
    navn: "Kremet pasta med kylling og spinat",
    type: "kylling",
    beskrivelse: "Pasta i kremet saus med kylling, spinat og parmesan.",
    minutter: 25,
    proteinPerPorsjon: 40,
    porsjoner: 3,
    merker: ["kylling", "pasta"],
    ingredienser: [
      { navn: "Kyllingfilet", mengde: 450, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Pasta", mengde: 350, enhet: "g", kategori: "Tørrvarer og hermetikk" },
      { navn: "Matfløte", mengde: 3, enhet: "dl", kategori: "Meieri og egg" },
      { navn: "Babyspinat", mengde: 150, enhet: "g", kategori: "Frukt og grønt" },
      { navn: "Parmesan", mengde: 50, enhet: "g", kategori: "Meieri og egg" },
      { navn: "Hvitløk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt", basis: true },
    ],
  },
  {
    id: "chili",
    navn: "Chili con carne",
    type: "kjøtt",
    beskrivelse: "Chili con carne med bønner og tomat, servert med ris og rømme.",
    minutter: 40,
    proteinPerPorsjon: 35,
    porsjoner: 3,
    merker: ["kjøttdeig", "gryte"],
    ingredienser: [
      { navn: "Kjøttdeig", mengde: 400, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Kidneybønner", mengde: 1, enhet: "boks", kategori: "Tørrvarer og hermetikk" },
      { navn: "Hakkede tomater", mengde: 2, enhet: "boks", kategori: "Tørrvarer og hermetikk" },
      { navn: "Løk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Paprika", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Ris", mengde: 250, enhet: "g", kategori: "Tørrvarer og hermetikk", basis: true },
      { navn: "Rømme", mengde: 1, enhet: "stk", kategori: "Meieri og egg" },
    ],
  },
  {
    id: "fiskekaker",
    navn: "Fiskekaker med poteter og råkost",
    type: "fisk",
    beskrivelse: "Fiskekaker med kokte poteter og revet gulrot.",
    minutter: 25,
    proteinPerPorsjon: 22,
    porsjoner: 3,
    merker: ["fisk", "tradisjonell"],
    ingredienser: [
      { navn: "Fiskekaker", mengde: 600, enhet: "g", kategori: "Kjøtt og fisk" },
      { navn: "Poteter", mengde: 750, enhet: "g", kategori: "Frukt og grønt" },
      { navn: "Gulrot", mengde: 3, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Sitron", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
    ],
  },
  {
    id: "burger",
    navn: "Hamburger",
    type: "kjøtt",
    beskrivelse: "Hjemmelaget burger med ost, salat, tomat og rødløk.",
    minutter: 25,
    proteinPerPorsjon: 32,
    porsjoner: 3,
    merker: ["fredag"],
    ingredienser: [
      { navn: "Hamburgere", mengde: 3, enhet: "stk", kategori: "Kjøtt og fisk" },
      { navn: "Hamburgerbrød", mengde: 1, enhet: "pk", kategori: "Brød og bakst" },
      { navn: "Ostskiver", mengde: 1, enhet: "pk", kategori: "Meieri og egg" },
      { navn: "Isbergsalat", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Tomater", mengde: 2, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Rødløk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
    ],
  },
  {
    id: "linsesuppe",
    navn: "Linsesuppe med kokos",
    type: "vegetar",
    beskrivelse: "Mettende suppe med røde linser, kokos og tomat, servert med brød.",
    minutter: 30,
    proteinPerPorsjon: 18,
    porsjoner: 3,
    merker: ["vegetar", "suppe"],
    ingredienser: [
      { navn: "Røde linser", mengde: 250, enhet: "g", kategori: "Tørrvarer og hermetikk" },
      { navn: "Kokosmelk", mengde: 1, enhet: "boks", kategori: "Tørrvarer og hermetikk" },
      { navn: "Hakkede tomater", mengde: 1, enhet: "boks", kategori: "Tørrvarer og hermetikk" },
      { navn: "Løk", mengde: 1, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Gulrot", mengde: 2, enhet: "stk", kategori: "Frukt og grønt" },
      { navn: "Grovbrød", mengde: 1, enhet: "stk", kategori: "Brød og bakst" },
    ],
  },
];

// Varer vi ofte kjøper uansett meny. Krysses av på /meny.
export const fasteVarer: Ingrediens[] = [
  { navn: "Melk", mengde: 2, enhet: "stk", kategori: "Meieri og egg" },
  { navn: "Grovbrød", mengde: 2, enhet: "stk", kategori: "Brød og bakst" },
  { navn: "Egg", mengde: 12, enhet: "stk", kategori: "Meieri og egg" },
  { navn: "Smør", mengde: 1, enhet: "pk", kategori: "Meieri og egg" },
  { navn: "Kaffe", mengde: 1, enhet: "pk", kategori: "Tørrvarer og hermetikk" },
  { navn: "Bananer", mengde: 6, enhet: "stk", kategori: "Frukt og grønt" },
  { navn: "Epler", mengde: 6, enhet: "stk", kategori: "Frukt og grønt" },
  { navn: "Yoghurt", mengde: 4, enhet: "stk", kategori: "Meieri og egg" },
  { navn: "Pålegg", mengde: 3, enhet: "pk", kategori: "Annet" },
];

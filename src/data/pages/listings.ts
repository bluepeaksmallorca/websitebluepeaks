import type { Locale } from '../site';

/** Copy for the three index pages. Short enough to keep fully translated. */
interface ListingCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  lede: string;
  intro: string;
}

export const hikesIndex: Record<Locale, ListingCopy> = {
  en: {
    metaTitle: 'Hiking routes in Mallorca we guide',
    metaDescription:
      'Every route Blue Peaks guides in the Serra de Tramuntana, with real distances, ascent and walking times — from three-hour valley walks to full summit days.',
    eyebrow: 'Serra de Tramuntana',
    heading: 'Routes we guide',
    lede: 'Honest numbers for every walk, so you can judge what suits you before you write to us.',
    intro:
      'These are the routes we guide most often in Mallorca. Each page gives the actual distance, cumulative ascent and walking time, plus what the ground is like underfoot. Nothing here is graded easier than it is. If you do not see what you are looking for, we build custom days too.',
  },
  de: {
    metaTitle: 'Wanderrouten auf Mallorca, die wir führen',
    metaDescription:
      'Alle Routen, die Blue Peaks in der Serra de Tramuntana führt — mit echten Distanzen, Höhenmetern und Gehzeiten, von dreistündigen Talwanderungen bis zu ganzen Gipfeltagen.',
    eyebrow: 'Serra de Tramuntana',
    heading: 'Routen, die wir führen',
    lede: 'Ehrliche Zahlen zu jeder Tour, damit Sie vorab einschätzen können, was zu Ihnen passt.',
    intro:
      'Das sind die Routen, die wir auf Mallorca am häufigsten führen. Jede Seite nennt die tatsächliche Distanz, die Höhenmeter und die Gehzeit sowie die Beschaffenheit des Untergrunds. Keine Route ist leichter eingestuft, als sie ist. Wenn nichts Passendes dabei ist: Wir planen auch individuelle Tage.',
  },
  es: {
    metaTitle: 'Rutas de senderismo que guiamos en Mallorca',
    metaDescription:
      'Todas las rutas que Blue Peaks guía en la Serra de Tramuntana, con distancias, desnivel y tiempos reales: desde paseos de tres horas hasta jornadas completas de cumbre.',
    eyebrow: 'Serra de Tramuntana',
    heading: 'Rutas que guiamos',
    lede: 'Cifras honestas de cada ruta, para que juzgues qué te encaja antes de escribirnos.',
    intro:
      'Estas son las rutas que más guiamos en Mallorca. Cada página indica la distancia real, el desnivel acumulado y el tiempo de marcha, además de cómo es el terreno. Ninguna está calificada más fácil de lo que es. Si no ves lo que buscas, también diseñamos días a medida.',
  },
  ca: {
    metaTitle: 'Rutes d’excursionisme que guiem a Mallorca',
    metaDescription:
      'Totes les rutes que Blue Peaks guia a la Serra de Tramuntana, amb distàncies, desnivell i temps reals: des de passejades de tres hores fins a jornades completes de cim.',
    eyebrow: 'Serra de Tramuntana',
    heading: 'Rutes que guiem',
    lede: 'Xifres honestes de cada ruta, perquè jutgis què et va bé abans d’escriure’ns.',
    intro:
      'Aquestes són les rutes que més guiem a Mallorca. Cada pàgina indica la distància real, el desnivell acumulat i el temps de marxa, a més de com és el terreny. Cap no està qualificada més fàcil del que és. Si no hi trobes el que busques, també dissenyem dies a mida.',
  },
  nl: {
    metaTitle: 'Wandelroutes op Mallorca die wij begeleiden',
    metaDescription:
      'Alle routes die Blue Peaks begeleidt in de Serra de Tramuntana, met echte afstanden, stijging en looptijden — van dalwandelingen van drie uur tot hele topdagen.',
    eyebrow: 'Serra de Tramuntana',
    heading: 'Routes die wij begeleiden',
    lede: 'Eerlijke cijfers bij elke wandeling, zodat je vooraf kunt inschatten wat bij je past.',
    intro:
      'Dit zijn de routes die we het vaakst begeleiden op Mallorca. Elke pagina geeft de werkelijke afstand, de totale stijging en de looptijd, plus hoe het terrein aanvoelt. Niets is lichter ingeschaald dan het is. Staat er niet bij wat je zoekt? We stellen ook dagen op maat samen.',
  },
  fr: {
    metaTitle: 'Les itinéraires de randonnée que nous guidons à Majorque',
    metaDescription:
      'Tous les itinéraires encadrés par Blue Peaks dans la Serra de Tramuntana, avec distances, dénivelés et temps de marche réels — de la vallée en trois heures à la journée de sommet.',
    eyebrow: 'Serra de Tramuntana',
    heading: 'Les itinéraires que nous guidons',
    lede: 'Des chiffres honnêtes pour chaque sortie, afin de juger de ce qui vous convient avant de nous écrire.',
    intro:
      'Voici les itinéraires que nous encadrons le plus souvent à Majorque. Chaque page indique la distance réelle, le dénivelé cumulé et le temps de marche, ainsi que la nature du terrain. Aucun n’est coté plus facile qu’il ne l’est. Si vous ne trouvez pas votre bonheur, nous construisons aussi des journées sur mesure.',
  },
};

export const guideIndex: Record<Locale, ListingCopy> = {
  en: {
    metaTitle: 'Hiking in Mallorca: a practical guide',
    metaDescription:
      'Practical reference for hiking in Mallorca — when to go, what to pack, how hard the routes are, and how to get around. Written by resident mountain guides.',
    eyebrow: 'Practical guide',
    heading: 'Planning a hiking trip to Mallorca',
    lede: 'The questions we answer every week, written down properly.',
    intro:
      'None of these pages sell anything. They exist because we answer the same questions in emails and on the trail every week, and it seemed more useful to write the answers down. If they help you plan a trip you take on your own, that is a good outcome.',
  },
  de: {
    metaTitle: 'Wandern auf Mallorca: ein praktischer Leitfaden',
    metaDescription:
      'Praktische Infos zum Wandern auf Mallorca — beste Zeit, Ausrüstung, Schwierigkeitsgrade und Anreise vor Ort. Geschrieben von einheimischen Bergführern.',
    eyebrow: 'Praktischer Leitfaden',
    heading: 'Eine Wanderreise nach Mallorca planen',
    lede: 'Die Fragen, die uns jede Woche erreichen — ordentlich aufgeschrieben.',
    intro:
      'Keine dieser Seiten verkauft etwas. Sie existieren, weil wir dieselben Fragen jede Woche per E-Mail und unterwegs beantworten und es sinnvoller schien, die Antworten aufzuschreiben. Wenn sie Ihnen bei einer Tour helfen, die Sie allein gehen, ist das ein gutes Ergebnis.',
  },
  es: {
    metaTitle: 'Senderismo en Mallorca: guía práctica',
    metaDescription:
      'Guía práctica para caminar por Mallorca: cuándo ir, qué llevar, qué dificultad tienen las rutas y cómo moverse. Escrita por guías de montaña residentes.',
    eyebrow: 'Guía práctica',
    heading: 'Planificar un viaje de senderismo a Mallorca',
    lede: 'Las preguntas que respondemos cada semana, escritas como toca.',
    intro:
      'Ninguna de estas páginas vende nada. Existen porque respondemos las mismas preguntas por correo y en el camino cada semana, y nos pareció más útil dejar las respuestas por escrito. Si te ayudan a planificar una salida que harás por tu cuenta, perfecto.',
  },
  ca: {
    metaTitle: 'Excursionisme a Mallorca: guia pràctica',
    metaDescription:
      'Guia pràctica per caminar per Mallorca: quan anar-hi, què portar, quina dificultat tenen les rutes i com moure’s. Escrita per guies de muntanya residents.',
    eyebrow: 'Guia pràctica',
    heading: 'Planificar un viatge d’excursionisme a Mallorca',
    lede: 'Les preguntes que responem cada setmana, escrites com cal.',
    intro:
      'Cap d’aquestes pàgines no ven res. Existeixen perquè responem les mateixes preguntes per correu i pel camí cada setmana, i ens va semblar més útil deixar les respostes per escrit. Si t’ajuden a planificar una sortida pel teu compte, perfecte.',
  },
  nl: {
    metaTitle: 'Wandelen op Mallorca: een praktische gids',
    metaDescription:
      'Praktische naslag voor wandelen op Mallorca — wanneer je moet gaan, wat je meeneemt, hoe zwaar de routes zijn en hoe je je verplaatst. Geschreven door lokale berggidsen.',
    eyebrow: 'Praktische gids',
    heading: 'Een wandelreis naar Mallorca plannen',
    lede: 'De vragen die we elke week beantwoorden, nu eens goed opgeschreven.',
    intro:
      'Geen van deze pagina’s verkoopt iets. Ze bestaan omdat we dezelfde vragen elke week per mail en onderweg beantwoorden, en het leek nuttiger om de antwoorden op te schrijven. Helpen ze je bij een tocht die je zelf loopt, dan is dat prima.',
  },
  fr: {
    metaTitle: 'Randonner à Majorque : guide pratique',
    metaDescription:
      'Guide pratique pour randonner à Majorque : quand partir, quoi emporter, la difficulté des itinéraires et comment se déplacer. Écrit par des guides de montagne résidents.',
    eyebrow: 'Guide pratique',
    heading: 'Préparer un séjour randonnée à Majorque',
    lede: 'Les questions auxquelles nous répondons chaque semaine, écrites correctement.',
    intro:
      'Aucune de ces pages ne vend quoi que ce soit. Elles existent parce que nous répondons aux mêmes questions par e-mail et sur le sentier chaque semaine, et qu’il nous a semblé plus utile d’écrire les réponses. Si elles vous aident à préparer une sortie que vous ferez seul, tant mieux.',
  },
};

export const blogIndex: Record<Locale, ListingCopy> = {
  en: {
    metaTitle: 'Journal — notes from the Serra de Tramuntana',
    metaDescription:
      'Notes from Helena and Matija on guiding, seasons and routes in Mallorca’s Serra de Tramuntana.',
    eyebrow: 'Journal',
    heading: 'Notes from the range',
    lede: 'Written on the days we are not out walking.',
    intro:
      'Occasional writing about what the mountains are doing, what we learned on a route, and the things that do not fit neatly into a guide page.',
  },
  de: {
    metaTitle: 'Journal — Notizen aus der Serra de Tramuntana',
    metaDescription:
      'Notizen von Helena und Matija über das Führen, die Jahreszeiten und die Routen in Mallorcas Serra de Tramuntana.',
    eyebrow: 'Journal',
    heading: 'Notizen aus dem Gebirge',
    lede: 'Geschrieben an den Tagen, an denen wir nicht draußen sind.',
    intro:
      'Gelegentliche Texte darüber, was die Berge gerade machen, was wir auf einer Route gelernt haben, und über Dinge, die nicht sauber in eine Ratgeberseite passen.',
  },
  es: {
    metaTitle: 'Diario — notas desde la Serra de Tramuntana',
    metaDescription:
      'Notas de Helena y Matija sobre guiar, las estaciones y las rutas de la Serra de Tramuntana de Mallorca.',
    eyebrow: 'Diario',
    heading: 'Notas desde la sierra',
    lede: 'Escritas los días que no estamos caminando.',
    intro:
      'Textos ocasionales sobre qué está haciendo la montaña, qué aprendimos en una ruta y las cosas que no encajan del todo en una página de guía.',
  },
  ca: {
    metaTitle: 'Diari — notes des de la Serra de Tramuntana',
    metaDescription:
      'Notes d’Helena i Matija sobre guiar, les estacions i les rutes de la Serra de Tramuntana de Mallorca.',
    eyebrow: 'Diari',
    heading: 'Notes des de la serra',
    lede: 'Escrites els dies que no estem caminant.',
    intro:
      'Textos ocasionals sobre què fa la muntanya, què hem après en una ruta i les coses que no encaixen del tot en una pàgina de guia.',
  },
  nl: {
    metaTitle: 'Journaal — aantekeningen uit de Serra de Tramuntana',
    metaDescription:
      'Aantekeningen van Helena en Matija over het gidsen, de seizoenen en de routes in de Serra de Tramuntana op Mallorca.',
    eyebrow: 'Journaal',
    heading: 'Aantekeningen uit het gebergte',
    lede: 'Geschreven op de dagen dat we niet buiten zijn.',
    intro:
      'Af en toe iets over wat de bergen doen, wat we op een route leerden, en de dingen die niet netjes in een gidspagina passen.',
  },
  fr: {
    metaTitle: 'Journal — notes de la Serra de Tramuntana',
    metaDescription:
      'Notes d’Helena et Matija sur le métier de guide, les saisons et les itinéraires de la Serra de Tramuntana à Majorque.',
    eyebrow: 'Journal',
    heading: 'Notes du massif',
    lede: 'Écrites les jours où nous ne sommes pas dehors.',
    intro:
      'Des textes occasionnels sur ce que font les montagnes, ce qu’un itinéraire nous a appris, et tout ce qui n’entre pas proprement dans une page de guide.',
  },
};

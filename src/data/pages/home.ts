import type { Locale } from '../site';

/**
 * Home page copy.
 *
 * Written answer-first: the `intro` paragraph is a complete, self-contained
 * definition of the business — who, what, where, how much — so that a model
 * summarising this page has everything it needs from the first block, and a
 * reader gets the point without scrolling.
 */
export interface HomeCopy {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  introLabel: string;
  intro: string;
  intro2: string;
  waysHeading: string;
  waysLede: string;
  ways: Array<{ title: string; body: string; cta: string; path: string }>;
  hikesHeading: string;
  hikesLede: string;
  guidesHeading: string;
  guidesBody: string;
  guidesBody2: string;
  guidesCta: string;
  practicalHeading: string;
  practicalLede: string;
  faqs: Array<{ q: string; a: string }>;
}

export const home: Record<Locale, HomeCopy> = {
  en: {
    metaTitle: 'Blue Peaks Mallorca — guided hiking in the Serra de Tramuntana',
    metaDescription:
      'Private and small-group guided hikes in Mallorca’s Serra de Tramuntana, led by resident mountain guides Helena and Matija. €180 per day for the whole group.',
    heroEyebrow: 'Serra de Tramuntana · Mallorca',
    heroTitle: 'The mountains, at the pace they deserve',
    heroLede:
      'Guided walking days in Mallorca for people who would rather understand a place than tick it off.',
    introLabel: 'In short',
    intro:
      'Blue Peaks Mallorca is a two-person guiding company run by Helena and Matija, based in Alaró. We lead private and small-group hikes across the Serra de Tramuntana — the limestone range along Mallorca’s north-west coast, and a UNESCO World Heritage site — from gentle valley walks to long summit days.',
    intro2:
      'A private day costs €180 for the whole group, whether there are two of you or eight. That covers the guiding, the route planning, and the part most people remember: knowing what you are looking at.',
    waysHeading: 'Three ways to walk with us',
    waysLede:
      'Most people start with a private day. If you already know what you want, or you would rather join something scheduled, we have those too.',
    ways: [
      {
        title: 'Private hikes',
        body: 'Just your group and one of us. Pick a route from our list, tell us your dates, and we handle the rest — including deciding on the morning if the weather says otherwise.',
        cta: 'How private days work',
        path: 'private-hikes',
      },
      {
        title: 'Custom hikes',
        body: 'A route built around something specific: a summit you have wanted for years, a food and wine day, a photography walk, or several days linked into a traverse.',
        cta: 'Build a custom day',
        path: 'custom-hikes',
      },
      {
        title: 'All routes',
        body: 'The full set of walks we guide, with real distances, ascent and walking times, so you can judge honestly what suits you before you write to us.',
        cta: 'Browse every route',
        path: 'hikes',
      },
    ],
    hikesHeading: 'Routes we guide',
    hikesLede:
      'Every route below lists its actual distance, ascent and walking time. No route is graded easier than it is.',
    guidesHeading: 'Two guides, no office',
    guidesBody:
      'Helena and Matija live in Alaró, at the foot of the range. Between them they guide in English, Spanish, Catalan, German and Croatian, and they carry wilderness first-aid qualifications on every day out.',
    guidesBody2:
      'When you write to us, one of us answers — and that same person walks with you. There is no booking desk in between, which is also why we only take a limited number of days each week.',
    guidesCta: 'More about us',
    practicalHeading: 'Planning a hiking trip to Mallorca',
    practicalLede:
      'Reference pages we wrote because we answer these questions every week. No booking required — take what is useful.',
    faqs: [
      {
        q: 'How much does a guided hike in Mallorca cost?',
        a: 'A private guided day with Blue Peaks costs €180 for the whole group, not per person, for groups of up to eight people. That includes route planning, guiding and transport arrangements discussed in advance. Food, drinks and any entry fees are not included.',
      },
      {
        q: 'When is the best time to hike in Mallorca?',
        a: 'March to early June and September to November are the best months. Temperatures sit between roughly 15 and 25 °C, the trails are dry, and the island is far quieter than in high summer. July and August are too hot for long ascents, so we start those days before sunrise or move to shaded, coastal routes.',
      },
      {
        q: 'Do I need to be fit to hike in the Serra de Tramuntana?',
        a: 'Not for everything. We guide routes from three-hour valley walks with about 200 m of ascent to full days with more than 1,000 m. If you walk regularly at home, most of our moderate routes are within reach. Tell us honestly what you are used to and we will match the day to it.',
      },
      {
        q: 'What language do you guide in?',
        a: 'English, Spanish, Catalan, German and Croatian. Tell us which you prefer when you write and we will confirm which of us is guiding.',
      },
      {
        q: 'Where are you based?',
        a: 'Alaró, in the centre of Mallorca at the foot of the Serra de Tramuntana. We guide across the whole range, from Andratx in the south-west to Pollença in the north-east, and we can meet you anywhere on the island.',
      },
      {
        q: 'How far in advance should I book?',
        a: 'Two to three weeks is comfortable in spring and autumn, which are our busiest seasons. We are only two people and guide a limited number of days each week, so popular dates go early. It is always worth asking about short notice — sometimes a day opens up.',
      },
    ],
  },

  de: {
    metaTitle: 'Blue Peaks Mallorca — geführte Wanderungen in der Serra de Tramuntana',
    metaDescription:
      'Private und Kleingruppen-Wanderungen in der Serra de Tramuntana auf Mallorca, geführt von den Bergführern Helena und Matija. 180 € pro Tag für die ganze Gruppe.',
    heroEyebrow: 'Serra de Tramuntana · Mallorca',
    heroTitle: 'Die Berge, in dem Tempo, das sie verdienen',
    heroLede:
      'Geführte Wandertage auf Mallorca — für alle, die einen Ort lieber verstehen als abhaken wollen.',
    introLabel: 'Kurz gesagt',
    intro:
      'Blue Peaks Mallorca ist ein Zwei-Personen-Wanderunternehmen von Helena und Matija mit Sitz in Alaró. Wir führen private und Kleingruppen-Wanderungen durch die Serra de Tramuntana — das Kalksteingebirge an Mallorcas Nordwestküste und UNESCO-Welterbe — von sanften Talwanderungen bis zu langen Gipfeltagen.',
    intro2:
      'Ein privater Tag kostet 180 € für die gesamte Gruppe, ob Sie zu zweit oder zu acht sind. Darin enthalten sind die Führung, die Routenplanung und das, woran sich die meisten am längsten erinnern: zu wissen, worauf man da eigentlich schaut.',
    waysHeading: 'Drei Wege, mit uns zu gehen',
    waysLede:
      'Die meisten beginnen mit einem privaten Tag. Wenn Sie schon genau wissen, was Sie wollen, oder lieber etwas Geplantes mitgehen, gibt es auch das.',
    ways: [
      {
        title: 'Private Touren',
        body: 'Nur Ihre Gruppe und eine:r von uns. Route aussuchen, Termin nennen — den Rest übernehmen wir, inklusive der Entscheidung am Morgen, wenn das Wetter etwas anderes sagt.',
        cta: 'So läuft ein privater Tag',
        path: 'private-hikes',
      },
      {
        title: 'Individuelle Touren',
        body: 'Eine Route um etwas Bestimmtes herum gebaut: ein lang ersehnter Gipfel, ein Tag mit Wein und guter Küche, eine Fototour oder mehrere Tage als Durchquerung.',
        cta: 'Eigene Tour planen',
        path: 'custom-hikes',
      },
      {
        title: 'Alle Routen',
        body: 'Alle Wanderungen, die wir führen — mit echten Distanzen, Höhenmetern und Gehzeiten, damit Sie ehrlich einschätzen können, was zu Ihnen passt.',
        cta: 'Alle Routen ansehen',
        path: 'hikes',
      },
    ],
    hikesHeading: 'Routen, die wir führen',
    hikesLede:
      'Jede Route nennt ihre tatsächliche Distanz, Höhenmeter und Gehzeit. Keine Route ist leichter eingestuft, als sie ist.',
    guidesHeading: 'Zwei Bergführer, kein Büro',
    guidesBody:
      'Helena und Matija leben in Alaró, am Fuß des Gebirges. Gemeinsam führen sie auf Englisch, Spanisch, Katalanisch, Deutsch und Kroatisch — und haben bei jedem Tag draußen eine Wildnis-Erste-Hilfe-Ausbildung dabei.',
    guidesBody2:
      'Wenn Sie uns schreiben, antwortet eine:r von uns — und genau diese Person geht auch mit Ihnen. Dazwischen sitzt keine Buchungszentrale. Deshalb nehmen wir pro Woche auch nur eine begrenzte Zahl an Tagen an.',
    guidesCta: 'Mehr über uns',
    practicalHeading: 'Eine Wanderreise nach Mallorca planen',
    practicalLede:
      'Diese Seiten haben wir geschrieben, weil uns diese Fragen jede Woche erreichen. Ohne Buchung — nehmen Sie mit, was nützlich ist.',
    faqs: [
      {
        q: 'Was kostet eine geführte Wanderung auf Mallorca?',
        a: 'Ein privater Wandertag mit Blue Peaks kostet 180 € für die gesamte Gruppe, nicht pro Person, bei Gruppen bis acht Personen. Enthalten sind Routenplanung, Führung und die vorab besprochene Transportorganisation. Verpflegung, Getränke und etwaige Eintritte sind nicht enthalten.',
      },
      {
        q: 'Wann ist die beste Zeit zum Wandern auf Mallorca?',
        a: 'März bis Anfang Juni und September bis November sind die besten Monate. Die Temperaturen liegen etwa zwischen 15 und 25 °C, die Wege sind trocken und die Insel ist deutlich ruhiger als im Hochsommer. Juli und August sind für lange Anstiege zu heiß — dann starten wir vor Sonnenaufgang oder weichen auf schattige Küstenrouten aus.',
      },
      {
        q: 'Muss ich fit sein, um in der Serra de Tramuntana zu wandern?',
        a: 'Nicht für alles. Wir führen Routen von dreistündigen Talwanderungen mit rund 200 Höhenmetern bis zu ganzen Tagen mit über 1.000 Höhenmetern. Wer zu Hause regelmäßig wandert, schafft die meisten unserer mittleren Routen. Sagen Sie uns ehrlich, was Sie gewohnt sind — wir passen den Tag daran an.',
      },
      {
        q: 'In welcher Sprache führen Sie?',
        a: 'Englisch, Spanisch, Katalanisch, Deutsch und Kroatisch. Sagen Sie uns bei der Anfrage, was Ihnen lieber ist, und wir bestätigen, wer von uns führt.',
      },
      {
        q: 'Wo sind Sie ansässig?',
        a: 'In Alaró, in der Inselmitte Mallorcas am Fuß der Serra de Tramuntana. Wir führen im gesamten Gebirge, von Andratx im Südwesten bis Pollença im Nordosten, und können Sie überall auf der Insel treffen.',
      },
      {
        q: 'Wie früh sollte ich buchen?',
        a: 'Zwei bis drei Wochen sind im Frühjahr und Herbst — unseren Hauptsaisons — angenehm. Wir sind nur zu zweit und führen pro Woche eine begrenzte Zahl an Tagen, beliebte Termine sind früh vergeben. Kurzfristig zu fragen lohnt sich trotzdem immer.',
      },
    ],
  },

  es: {
    metaTitle: 'Blue Peaks Mallorca — senderismo guiado en la Serra de Tramuntana',
    metaDescription:
      'Rutas guiadas privadas y en grupos reducidos por la Serra de Tramuntana de Mallorca, con los guías de montaña Helena y Matija. 180 € por día para todo el grupo.',
    heroEyebrow: 'Serra de Tramuntana · Mallorca',
    heroTitle: 'La montaña, al ritmo que merece',
    heroLede:
      'Días de senderismo guiado en Mallorca para quien prefiere entender un lugar antes que tacharlo de una lista.',
    introLabel: 'En resumen',
    intro:
      'Blue Peaks Mallorca es una empresa de dos personas, Helena y Matija, con base en Alaró. Guiamos rutas privadas y en grupos reducidos por la Serra de Tramuntana —la sierra calcárea del noroeste de Mallorca, Patrimonio de la Humanidad de la UNESCO— desde paseos suaves por los valles hasta largas jornadas de cumbre.',
    intro2:
      'Un día privado cuesta 180 € para todo el grupo, seáis dos u ocho. Incluye el guiaje, la planificación de la ruta y lo que casi todo el mundo recuerda después: saber qué estás mirando.',
    waysHeading: 'Tres maneras de caminar con nosotros',
    waysLede:
      'La mayoría empieza por un día privado. Si ya sabes lo que quieres, o prefieres unirte a algo programado, también lo tenemos.',
    ways: [
      {
        title: 'Rutas privadas',
        body: 'Solo tu grupo y uno de nosotros. Elige una ruta, dinos las fechas y nos ocupamos del resto, incluida la decisión de por la mañana si el tiempo dice otra cosa.',
        cta: 'Cómo funciona un día privado',
        path: 'private-hikes',
      },
      {
        title: 'Rutas a medida',
        body: 'Una ruta construida alrededor de algo concreto: una cumbre que llevas años queriendo, un día de vino y buena mesa, una salida fotográfica o varios días encadenados en una travesía.',
        cta: 'Diseña tu ruta',
        path: 'custom-hikes',
      },
      {
        title: 'Todas las rutas',
        body: 'Todas las caminatas que guiamos, con distancias, desnivel y tiempos reales, para que juzgues con honestidad qué te encaja antes de escribirnos.',
        cta: 'Ver todas las rutas',
        path: 'hikes',
      },
    ],
    hikesHeading: 'Rutas que guiamos',
    hikesLede:
      'Cada ruta indica su distancia, desnivel y tiempo de marcha reales. Ninguna está calificada más fácil de lo que es.',
    guidesHeading: 'Dos guías, ninguna oficina',
    guidesBody:
      'Helena y Matija viven en Alaró, al pie de la sierra. Entre los dos guían en inglés, español, catalán, alemán y croata, y llevan formación en primeros auxilios en entorno natural en cada salida.',
    guidesBody2:
      'Cuando nos escribes, contesta uno de nosotros, y esa misma persona camina contigo. No hay un mostrador de reservas por medio, y por eso aceptamos un número limitado de días por semana.',
    guidesCta: 'Más sobre nosotros',
    practicalHeading: 'Planificar un viaje de senderismo a Mallorca',
    practicalLede:
      'Páginas de consulta que escribimos porque respondemos a estas preguntas cada semana. Sin reservar nada: coge lo que te sirva.',
    faqs: [
      {
        q: '¿Cuánto cuesta una ruta guiada en Mallorca?',
        a: 'Un día privado con Blue Peaks cuesta 180 € para todo el grupo, no por persona, para grupos de hasta ocho personas. Incluye la planificación de la ruta, el guiaje y la organización del transporte acordada de antemano. No incluye comida, bebida ni entradas.',
      },
      {
        q: '¿Cuál es la mejor época para hacer senderismo en Mallorca?',
        a: 'De marzo a principios de junio y de septiembre a noviembre. Las temperaturas rondan entre los 15 y los 25 °C, los senderos están secos y la isla está mucho más tranquila que en pleno verano. Julio y agosto son demasiado calurosos para subidas largas: esos días salimos antes del amanecer o cambiamos a rutas costeras con sombra.',
      },
      {
        q: '¿Hay que estar en forma para caminar por la Serra de Tramuntana?',
        a: 'No para todo. Guiamos rutas desde tres horas por los valles con unos 200 m de desnivel hasta jornadas completas de más de 1.000 m. Si caminas con regularidad, la mayoría de nuestras rutas moderadas están a tu alcance. Dinos con honestidad a qué estás acostumbrado y ajustamos el día.',
      },
      {
        q: '¿En qué idioma guiáis?',
        a: 'Inglés, español, catalán, alemán y croata. Dinos cuál prefieres al escribirnos y te confirmamos quién de los dos guía.',
      },
      {
        q: '¿Dónde estáis?',
        a: 'En Alaró, en el centro de Mallorca al pie de la Serra de Tramuntana. Guiamos por toda la sierra, de Andratx en el suroeste a Pollença en el noreste, y podemos quedar contigo en cualquier punto de la isla.',
      },
      {
        q: '¿Con cuánta antelación conviene reservar?',
        a: 'Dos o tres semanas van bien en primavera y otoño, nuestras temporadas más ocupadas. Somos solo dos y guiamos un número limitado de días por semana, así que las fechas populares vuelan. Aun así, siempre vale la pena preguntar por última hora.',
      },
    ],
  },

  ca: {
    metaTitle: 'Blue Peaks Mallorca — excursions guiades a la Serra de Tramuntana',
    metaDescription:
      'Rutes guiades privades i en grups reduïts per la Serra de Tramuntana de Mallorca, amb els guies de muntanya Helena i Matija. 180 € per dia per a tot el grup.',
    heroEyebrow: 'Serra de Tramuntana · Mallorca',
    heroTitle: 'La muntanya, al ritme que es mereix',
    heroLede:
      'Jornades d’excursionisme guiat a Mallorca per a qui prefereix entendre un lloc abans que ratllar-lo d’una llista.',
    introLabel: 'En resum',
    intro:
      'Blue Peaks Mallorca és una empresa de dues persones, Helena i Matija, amb base a Alaró. Guiem rutes privades i en grups reduïts per la Serra de Tramuntana —la serralada calcària del nord-oest de Mallorca, Patrimoni Mundial de la UNESCO— des de passejades suaus per les valls fins a llargues jornades de cim.',
    intro2:
      'Un dia privat costa 180 € per a tot el grup, tant si sou dos com vuit. Inclou el guiatge, la planificació de la ruta i allò que gairebé tothom recorda després: saber què estàs mirant.',
    waysHeading: 'Tres maneres de caminar amb nosaltres',
    waysLede:
      'La majoria comença amb un dia privat. Si ja saps què vols, o prefereixes afegir-te a alguna cosa programada, també ho tenim.',
    ways: [
      {
        title: 'Rutes privades',
        body: 'Només el teu grup i un de nosaltres. Tria una ruta, digues-nos les dates i ens ocupem de la resta, inclosa la decisió del matí si el temps diu una altra cosa.',
        cta: 'Com funciona un dia privat',
        path: 'private-hikes',
      },
      {
        title: 'Rutes a mida',
        body: 'Una ruta construïda al voltant d’alguna cosa concreta: un cim que fa anys que vols, un dia de vi i bona taula, una sortida fotogràfica o diversos dies encadenats en una travessa.',
        cta: 'Dissenya la teva ruta',
        path: 'custom-hikes',
      },
      {
        title: 'Totes les rutes',
        body: 'Totes les caminades que guiem, amb distàncies, desnivell i temps reals, perquè puguis jutjar amb honestedat què et va bé abans d’escriure’ns.',
        cta: 'Veure totes les rutes',
        path: 'hikes',
      },
    ],
    hikesHeading: 'Rutes que guiem',
    hikesLede:
      'Cada ruta indica la distància, el desnivell i el temps de marxa reals. Cap ruta no està qualificada més fàcil del que és.',
    guidesHeading: 'Dos guies, cap oficina',
    guidesBody:
      'Helena i Matija viuen a Alaró, al peu de la serra. Entre tots dos guien en anglès, castellà, català, alemany i croat, i porten formació en primers auxilis en entorn natural a cada sortida.',
    guidesBody2:
      'Quan ens escrius, contesta un de nosaltres, i aquesta mateixa persona camina amb tu. No hi ha cap taulell de reserves pel mig, i per això acceptem un nombre limitat de dies per setmana.',
    guidesCta: 'Més sobre nosaltres',
    practicalHeading: 'Planificar un viatge d’excursionisme a Mallorca',
    practicalLede:
      'Pàgines de consulta que hem escrit perquè responem aquestes preguntes cada setmana. Sense reservar res: agafa el que et serveixi.',
    faqs: [
      {
        q: 'Quant costa una excursió guiada a Mallorca?',
        a: 'Un dia privat amb Blue Peaks costa 180 € per a tot el grup, no per persona, per a grups de fins a vuit persones. Inclou la planificació de la ruta, el guiatge i l’organització del transport acordada prèviament. No inclou menjar, begudes ni entrades.',
      },
      {
        q: 'Quina és la millor època per fer excursions a Mallorca?',
        a: 'De març a principis de juny i de setembre a novembre. Les temperatures ronden entre els 15 i els 25 °C, els camins són secs i l’illa és molt més tranquil·la que a ple estiu. El juliol i l’agost fa massa calor per a pujades llargues: aquells dies sortim abans de l’alba o canviem a rutes costaneres amb ombra.',
      },
      {
        q: 'Cal estar en forma per caminar per la Serra de Tramuntana?',
        a: 'No per a tot. Guiem rutes des de tres hores per les valls amb uns 200 m de desnivell fins a jornades completes de més de 1.000 m. Si camines amb regularitat, la majoria de les nostres rutes moderades són a l’abast. Digues-nos amb honestedat a què estàs acostumat i ajustem el dia.',
      },
      {
        q: 'En quin idioma guieu?',
        a: 'Anglès, castellà, català, alemany i croat. Digues-nos què prefereixes quan ens escriguis i et confirmem qui de nosaltres guia.',
      },
      {
        q: 'On sou?',
        a: 'A Alaró, al centre de Mallorca al peu de la Serra de Tramuntana. Guiem per tota la serra, d’Andratx al sud-oest fins a Pollença al nord-est, i podem quedar amb tu a qualsevol punt de l’illa.',
      },
      {
        q: 'Amb quanta antelació cal reservar?',
        a: 'Dues o tres setmanes van bé a la primavera i la tardor, les nostres temporades amb més feina. Només som dos i guiem un nombre limitat de dies per setmana, així que les dates populars volen. Tot i així, sempre val la pena preguntar per última hora.',
      },
    ],
  },

  nl: {
    metaTitle: 'Blue Peaks Mallorca — begeleide wandeltochten in de Serra de Tramuntana',
    metaDescription:
      'Privé- en kleinschalige wandeltochten in de Serra de Tramuntana op Mallorca, begeleid door berggidsen Helena en Matija. € 180 per dag voor de hele groep.',
    heroEyebrow: 'Serra de Tramuntana · Mallorca',
    heroTitle: 'De bergen, op het tempo dat ze verdienen',
    heroLede:
      'Begeleide wandeldagen op Mallorca voor wie een plek liever begrijpt dan afvinkt.',
    introLabel: 'Kort gezegd',
    intro:
      'Blue Peaks Mallorca is een tweemansbedrijf van Helena en Matija, gevestigd in Alaró. Wij begeleiden privéwandelingen en kleine groepen door de Serra de Tramuntana — het kalkstenen gebergte langs de noordwestkust van Mallorca en UNESCO-werelderfgoed — van rustige dalwandelingen tot lange topdagen.',
    intro2:
      'Een privédag kost € 180 voor de hele groep, of jullie nu met z’n tweeën of met z’n achten zijn. Daarbij zit de begeleiding, de routeplanning en het deel dat de meeste mensen bijblijft: weten waar je precies naar staat te kijken.',
    waysHeading: 'Drie manieren om met ons te lopen',
    waysLede:
      'De meesten beginnen met een privédag. Weet je al wat je wilt, of sluit je liever aan bij iets wat gepland staat, dan kan dat ook.',
    ways: [
      {
        title: 'Privéwandelingen',
        body: 'Alleen jullie groep en een van ons. Kies een route, geef je data door en wij regelen de rest — inclusief de knoop doorhakken op de ochtend zelf als het weer anders beslist.',
        cta: 'Zo werkt een privédag',
        path: 'private-hikes',
      },
      {
        title: 'Wandelingen op maat',
        body: 'Een route rond iets specifieks: een top waar je al jaren op aast, een dag met wijn en goed eten, een fotowandeling, of meerdere dagen aaneengeregen tot een trektocht.',
        cta: 'Stel je eigen dag samen',
        path: 'custom-hikes',
      },
      {
        title: 'Alle routes',
        body: 'Alle wandelingen die wij begeleiden, met echte afstanden, stijging en looptijden, zodat je eerlijk kunt inschatten wat bij je past voordat je ons schrijft.',
        cta: 'Bekijk alle routes',
        path: 'hikes',
      },
    ],
    hikesHeading: 'Routes die wij begeleiden',
    hikesLede:
      'Bij elke route staan de werkelijke afstand, stijging en looptijd. Geen enkele route is lichter ingeschaald dan hij is.',
    guidesHeading: 'Twee gidsen, geen kantoor',
    guidesBody:
      'Helena en Matija wonen in Alaró, aan de voet van het gebergte. Samen begeleiden ze in het Engels, Spaans, Catalaans, Duits en Kroatisch, en ze hebben bij elke tocht een wildernis-EHBO-opleiding op zak.',
    guidesBody2:
      'Als je ons schrijft, antwoordt een van ons — en diezelfde persoon loopt met je mee. Er zit geen boekingsbalie tussen, en juist daarom nemen we per week maar een beperkt aantal dagen aan.',
    guidesCta: 'Meer over ons',
    practicalHeading: 'Een wandelreis naar Mallorca plannen',
    practicalLede:
      'Naslagpagina’s die we schreven omdat we deze vragen elke week krijgen. Zonder boeking — pak eruit wat nuttig is.',
    faqs: [
      {
        q: 'Wat kost een begeleide wandeling op Mallorca?',
        a: 'Een privédag met Blue Peaks kost € 180 voor de hele groep, niet per persoon, voor groepen tot acht personen. Daarin zitten routeplanning, begeleiding en de vooraf besproken vervoersregeling. Eten, drinken en eventuele toegangsgelden zitten er niet bij.',
      },
      {
        q: 'Wat is de beste tijd om te wandelen op Mallorca?',
        a: 'Maart tot begin juni en september tot november zijn de beste maanden. De temperatuur ligt tussen ongeveer 15 en 25 °C, de paden zijn droog en het is veel rustiger dan in het hoogseizoen. Juli en augustus zijn te heet voor lange klimmen: dan vertrekken we voor zonsopgang of wijken we uit naar schaduwrijke kustroutes.',
      },
      {
        q: 'Moet ik fit zijn om in de Serra de Tramuntana te wandelen?',
        a: 'Niet voor alles. We begeleiden routes van drie uur door de dalen met zo’n 200 m stijging tot hele dagen met meer dan 1.000 m. Wie thuis regelmatig loopt, redt de meeste van onze gemiddelde routes. Vertel ons eerlijk wat je gewend bent, dan stemmen we de dag daarop af.',
      },
      {
        q: 'In welke taal begeleiden jullie?',
        a: 'Engels, Spaans, Catalaans, Duits en Kroatisch. Laat bij je bericht weten wat je voorkeur heeft, dan bevestigen we wie van ons meegaat.',
      },
      {
        q: 'Waar zitten jullie?',
        a: 'In Alaró, midden op Mallorca aan de voet van de Serra de Tramuntana. We begeleiden in het hele gebergte, van Andratx in het zuidwesten tot Pollença in het noordoosten, en we kunnen je overal op het eiland ontmoeten.',
      },
      {
        q: 'Hoe ver van tevoren moet ik boeken?',
        a: 'Twee tot drie weken is prettig in het voor- en najaar, onze drukste seizoenen. We zijn met z’n tweeën en begeleiden een beperkt aantal dagen per week, dus populaire data gaan snel. Toch is het altijd de moeite waard om kort van tevoren te vragen.',
      },
    ],
  },

  fr: {
    metaTitle: 'Blue Peaks Mallorca — randonnées guidées dans la Serra de Tramuntana',
    metaDescription:
      'Randonnées guidées privées et en petit groupe dans la Serra de Tramuntana à Majorque, avec les guides de montagne Helena et Matija. 180 € par jour pour tout le groupe.',
    heroEyebrow: 'Serra de Tramuntana · Majorque',
    heroTitle: 'La montagne, au rythme qu’elle mérite',
    heroLede:
      'Des journées de randonnée guidée à Majorque, pour celles et ceux qui préfèrent comprendre un lieu plutôt que le cocher.',
    introLabel: 'En bref',
    intro:
      'Blue Peaks Mallorca est une entreprise de deux personnes, Helena et Matija, basée à Alaró. Nous guidons des randonnées privées et en petit groupe dans la Serra de Tramuntana — le massif calcaire du nord-ouest de Majorque, inscrit au patrimoine mondial de l’UNESCO — des marches tranquilles dans les vallées aux longues journées de sommet.',
    intro2:
      'Une journée privée coûte 180 € pour le groupe entier, que vous soyez deux ou huit. Cela comprend l’encadrement, la préparation de l’itinéraire, et ce dont on se souvient le plus longtemps : savoir ce que l’on a sous les yeux.',
    waysHeading: 'Trois façons de marcher avec nous',
    waysLede:
      'La plupart commencent par une journée privée. Si vous savez déjà ce que vous voulez, ou préférez rejoindre une sortie programmée, c’est possible aussi.',
    ways: [
      {
        title: 'Randonnées privées',
        body: 'Votre groupe et l’un·e de nous, rien d’autre. Choisissez un itinéraire, donnez-nous vos dates, nous nous occupons du reste — y compris trancher le matin même si la météo en décide autrement.',
        cta: 'Comment se passe une journée privée',
        path: 'private-hikes',
      },
      {
        title: 'Randonnées sur mesure',
        body: 'Un itinéraire bâti autour d’une envie précise : un sommet qui vous fait envie depuis des années, une journée vin et bonne table, une sortie photo, ou plusieurs jours enchaînés en traversée.',
        cta: 'Composer votre journée',
        path: 'custom-hikes',
      },
      {
        title: 'Tous les itinéraires',
        body: 'L’ensemble des randonnées que nous encadrons, avec distances, dénivelés et temps de marche réels, pour juger honnêtement de ce qui vous convient avant de nous écrire.',
        cta: 'Voir tous les itinéraires',
        path: 'hikes',
      },
    ],
    hikesHeading: 'Les itinéraires que nous guidons',
    hikesLede:
      'Chaque itinéraire indique sa distance, son dénivelé et son temps de marche réels. Aucun n’est coté plus facile qu’il ne l’est.',
    guidesHeading: 'Deux guides, aucun bureau',
    guidesBody:
      'Helena et Matija vivent à Alaró, au pied du massif. À eux deux, ils guident en anglais, espagnol, catalan, allemand et croate, et emportent une formation aux premiers secours en milieu isolé à chaque sortie.',
    guidesBody2:
      'Quand vous nous écrivez, c’est l’un·e de nous qui répond — et c’est cette même personne qui marchera avec vous. Aucun comptoir de réservation entre les deux, ce qui explique aussi pourquoi nous ne prenons qu’un nombre limité de journées par semaine.',
    guidesCta: 'En savoir plus sur nous',
    practicalHeading: 'Préparer un séjour randonnée à Majorque',
    practicalLede:
      'Des pages de référence écrites parce que ces questions nous arrivent chaque semaine. Sans réservation : prenez ce qui vous sert.',
    faqs: [
      {
        q: 'Combien coûte une randonnée guidée à Majorque ?',
        a: 'Une journée privée avec Blue Peaks coûte 180 € pour tout le groupe, et non par personne, pour des groupes allant jusqu’à huit personnes. Cela comprend la préparation de l’itinéraire, l’encadrement et l’organisation du transport convenue à l’avance. Repas, boissons et éventuels droits d’entrée ne sont pas inclus.',
      },
      {
        q: 'Quelle est la meilleure période pour randonner à Majorque ?',
        a: 'De mars à début juin et de septembre à novembre. Les températures se situent entre 15 et 25 °C environ, les sentiers sont secs et l’île est bien plus calme qu’en plein été. Juillet et août sont trop chauds pour les longues montées : ces jours-là, nous partons avant le lever du soleil ou basculons sur des itinéraires côtiers ombragés.',
      },
      {
        q: 'Faut-il être en forme pour marcher dans la Serra de Tramuntana ?',
        a: 'Pas pour tout. Nous encadrons des itinéraires allant de trois heures dans les vallées avec 200 m de dénivelé à des journées complètes de plus de 1 000 m. Si vous marchez régulièrement, la plupart de nos itinéraires modérés sont à votre portée. Dites-nous honnêtement ce dont vous avez l’habitude et nous ajusterons la journée.',
      },
      {
        q: 'Dans quelle langue guidez-vous ?',
        a: 'Anglais, espagnol, catalan, allemand et croate. Indiquez votre préférence en nous écrivant et nous vous confirmerons qui de nous deux encadre la sortie.',
      },
      {
        q: 'Où êtes-vous basés ?',
        a: 'À Alaró, au centre de Majorque, au pied de la Serra de Tramuntana. Nous guidons dans tout le massif, d’Andratx au sud-ouest à Pollença au nord-est, et pouvons vous retrouver partout sur l’île.',
      },
      {
        q: 'Combien de temps à l’avance faut-il réserver ?',
        a: 'Deux à trois semaines sont confortables au printemps et à l’automne, nos saisons les plus chargées. Nous ne sommes que deux et n’encadrons qu’un nombre limité de journées par semaine : les dates prisées partent tôt. Cela vaut toujours la peine de demander à la dernière minute.',
      },
    ],
  },
};

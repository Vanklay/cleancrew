import type { Lang } from './config';

type Value = string | string[];

// `fr` is the canonical dictionary: it defines the complete set of translation
// keys. `de`/`en` must mirror it exactly (enforced below by FullDict); `lu`/`pt`/
// `es` may omit keys and fall back to `fr` at runtime (PartialDict). To add a
// string anywhere on the site: add the key here first, then to every other dict.
const fr = {
  'nav.services': 'Services',
  'nav.about': 'À propos',
  'nav.blog': 'Blog',
  'nav.contact': 'Contact',
  'nav.book': 'Réserver',

  'hero.kicker': 'Débarras & nettoyage · Luxembourg',
  'hero.title': 'On vide votre garage.',
  'hero.title2': 'On garde tout impeccable.',
  'hero.sub': 'Débarras de garages, caves et greniers. Puis nettoyage de vitres et de parties communes, par une équipe qui revient. Devis clair, intervention rapide, partout au Luxembourg.',
  'hero.cta': 'Réserver une date',
  'hero.cta2': 'Voir les services',

  'services.title': 'Trois services, une seule équipe',
  'services.clearance.title': 'Débarras de garage',
  'services.clearance.desc': 'Garages, caves, greniers vidés en une intervention. Tri, évacuation, recyclage. Vous récupérez l’espace, on s’occupe du reste.',
  'services.windows.title': 'Nettoyage de vitres',
  'services.windows.desc': 'Vitres, baies et vérandas sans traces. Une rapidité reconnue parmi les meilleures du Luxembourg, en ponctuel ou en abonnement.',
  'services.entrances.title': 'Nettoyage de parties communes',
  'services.entrances.desc': 'Halls, entrées et cages d’escalier d’immeubles, entretenus régulièrement. Propreté constante pour copropriétés et résidences.',
  'services.learn': 'En savoir plus',

  'why.title': 'Pourquoi CleanCrew',
  'why.1.t': 'Une équipe qui revient',
  'why.1.d': 'On vide une fois, on entretient ensuite. La même équipe connaît déjà les lieux.',
  'why.2.t': 'Devis clair, sans surprise',
  'why.2.d': 'Un prix annoncé avant l’intervention. Pas de coûts cachés.',
  'why.3.t': 'Rapides et soigneux',
  'why.3.d': 'Une vitesse d’exécution rare, sans jamais sacrifier le détail.',
  'why.4.t': 'Partout au Luxembourg',
  'why.4.d': 'Strassen et tout le Grand-Duché, du nord au sud.',

  'faq.1.q': 'Combien coûte un débarras de garage au Luxembourg ?',
  'faq.1.a': 'Le prix dépend du volume, de l’accès et de l’étage. CleanCrew annonce un devis clair avant l’intervention, sans coûts cachés.',
  'faq.2.q': 'Intervenez-vous partout au Luxembourg ?',
  'faq.2.a': 'Oui. Basés à Strassen, nous intervenons dans tout le Grand-Duché, du nord au sud.',

  'book.title': 'Réservez votre intervention',
  'book.sub': 'Choisissez un créneau. On confirme par email sous 24 h.',
  'book.name': 'Nom',
  'book.email': 'Email',
  'book.phone': 'Téléphone',
  'book.service': 'Service',
  'book.date': 'Date souhaitée',
  'book.message': 'Détails (surface, accès, étage…)',
  'book.submit': 'Demander cette date',
  'book.success': 'Demande envoyée. On vous recontacte sous 24 h.',
  'book.error': 'Une erreur est survenue. Réessayez ou écrivez-nous directement.',
  'book.calendar.available': 'Dates disponibles en bleu.',
  'book.calendar.none': 'Choisissez une date ci-dessus.',
  'book.calendar.months': ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  'book.calendar.days': ['L','M','M','J','V','S','D'],

  'contact.title': 'Parlons de votre projet',
  'contact.sub': 'Un garage à vider, des vitres à nettoyer, un immeuble à entretenir ? Écrivez-nous.',

  'about.title': 'Une équipe locale, obsédée par le détail',
  'about.body': 'CleanCrew est née d’une conviction simple : un espace vidé et entretenu change tout. Nous combinons le débarras à fort impact et l’entretien régulier pour offrir un service continu, fiable et soigné, partout au Luxembourg.',

  'footer.tagline': 'Débarras & nettoyage au Luxembourg.',
  'footer.services': 'Services',
  'footer.company': 'Entreprise',
  'footer.legal': 'Mentions légales',
  'footer.rights': 'Tous droits réservés.',
  'blog.title': 'Le journal',
  'blog.sub': 'Conseils débarras, entretien et organisation de l’espace.',
  'blog.readmore': 'Lire',
} satisfies Record<string, Value>;

/** Every translation key on the site, derived from the canonical `fr` dictionary. */
export type TranslationKey = keyof typeof fr;

/** fr/de/en must define every key; lu/pt/es may omit a key and fall back to fr. */
type FullDict = Record<TranslationKey, Value>;
type PartialDict = Partial<FullDict>;

const de: FullDict = {
  'nav.services': 'Leistungen',
  'nav.about': 'Über uns',
  'nav.blog': 'Blog',
  'nav.contact': 'Kontakt',
  'nav.book': 'Buchen',

  'hero.kicker': 'Entrümpelung & Reinigung · Luxemburg',
  'hero.title': 'Wir räumen Ihre Garage.',
  'hero.title2': 'Und halten alles makellos.',
  'hero.sub': 'Entrümpelung von Garagen, Kellern und Dachböden. Danach Fenster- und Gemeinschaftsreinigung durch ein Team, das wiederkommt. Klares Angebot, schnelle Ausführung, in ganz Luxemburg.',
  'hero.cta': 'Termin buchen',
  'hero.cta2': 'Leistungen ansehen',

  'services.title': 'Drei Leistungen, ein Team',
  'services.clearance.title': 'Garagenentrümpelung',
  'services.clearance.desc': 'Garagen, Keller und Dachböden in einem Durchgang geräumt. Sortieren, Abtransport, Recycling. Sie gewinnen Platz, wir erledigen den Rest.',
  'services.windows.title': 'Fensterreinigung',
  'services.windows.desc': 'Fenster, Fronten und Wintergärten streifenfrei. Eine Geschwindigkeit, die zu den besten Luxemburgs zählt – einmalig oder im Abo.',
  'services.entrances.title': 'Reinigung von Gemeinschaftsflächen',
  'services.entrances.desc': 'Eingänge, Flure und Treppenhäuser regelmäßig gepflegt. Konstante Sauberkeit für Eigentümergemeinschaften und Residenzen.',
  'services.learn': 'Mehr erfahren',

  'why.title': 'Warum CleanCrew',
  'why.1.t': 'Ein Team, das wiederkommt',
  'why.1.d': 'Einmal räumen, dann pflegen. Dasselbe Team kennt den Ort bereits.',
  'why.2.t': 'Klares Angebot, keine Überraschungen',
  'why.2.d': 'Ein Preis, der vor der Ausführung feststeht. Keine versteckten Kosten.',
  'why.3.t': 'Schnell und sorgfältig',
  'why.3.d': 'Seltene Ausführungsgeschwindigkeit, ohne das Detail zu opfern.',
  'why.4.t': 'In ganz Luxemburg',
  'why.4.d': 'Strassen und das gesamte Großherzogtum, von Nord bis Süd.',

  'faq.1.q': 'Was kostet eine Garagenentrümpelung in Luxemburg?',
  'faq.1.a': 'Der Preis hängt von Volumen, Zugang und Stockwerk ab. CleanCrew nennt vor der Ausführung ein klares Angebot, ohne versteckte Kosten.',
  'faq.2.q': 'Sind Sie in ganz Luxemburg tätig?',
  'faq.2.a': 'Ja. Mit Sitz in Strassen sind wir im gesamten Großherzogtum tätig, von Nord bis Süd.',

  'book.title': 'Buchen Sie Ihren Termin',
  'book.sub': 'Wählen Sie einen Termin. Bestätigung per E-Mail innerhalb von 24 Std.',
  'book.name': 'Name',
  'book.email': 'E-Mail',
  'book.phone': 'Telefon',
  'book.service': 'Leistung',
  'book.date': 'Wunschtermin',
  'book.message': 'Details (Fläche, Zugang, Stockwerk…)',
  'book.submit': 'Diesen Termin anfragen',
  'book.success': 'Anfrage gesendet. Wir melden uns innerhalb von 24 Std.',
  'book.error': 'Ein Fehler ist aufgetreten. Bitte erneut versuchen oder direkt schreiben.',
  'book.calendar.available': 'Verfügbare Termine in Blau.',
  'book.calendar.none': 'Bitte oben ein Datum wählen.',
  'book.calendar.months': ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
  'book.calendar.days': ['M','D','M','D','F','S','S'],

  'contact.title': 'Sprechen wir über Ihr Projekt',
  'contact.sub': 'Eine Garage zu räumen, Fenster zu reinigen, ein Gebäude zu pflegen? Schreiben Sie uns.',

  'about.title': 'Ein lokales Team, besessen vom Detail',
  'about.body': 'CleanCrew entstand aus einer einfachen Überzeugung: Ein geräumter und gepflegter Raum verändert alles. Wir verbinden wirkungsvolle Entrümpelung mit regelmäßiger Pflege – für einen durchgehenden, zuverlässigen und sorgfältigen Service in ganz Luxemburg.',

  'footer.tagline': 'Entrümpelung & Reinigung in Luxemburg.',
  'footer.services': 'Leistungen',
  'footer.company': 'Unternehmen',
  'footer.legal': 'Impressum',
  'footer.rights': 'Alle Rechte vorbehalten.',
  'blog.title': 'Das Journal',
  'blog.sub': 'Tipps zu Entrümpelung, Pflege und Raumorganisation.',
  'blog.readmore': 'Lesen',
};

const en: FullDict = {
  'nav.services': 'Services',
  'nav.about': 'About',
  'nav.blog': 'Blog',
  'nav.contact': 'Contact',
  'nav.book': 'Book',

  'hero.kicker': 'Clearance & cleaning · Luxembourg',
  'hero.title': 'We empty your garage.',
  'hero.title2': 'We keep it spotless.',
  'hero.sub': 'Garage, cellar and attic clearance. Then window and common-area cleaning by a crew that comes back. Clear quote, fast turnaround, anywhere in Luxembourg.',
  'hero.cta': 'Book a date',
  'hero.cta2': 'See services',

  'services.title': 'Three services, one crew',
  'services.clearance.title': 'Garage clearance',
  'services.clearance.desc': 'Garages, cellars and attics emptied in a single visit. Sorting, removal, recycling. You get the space back, we handle the rest.',
  'services.windows.title': 'Window cleaning',
  'services.windows.desc': 'Windows, fronts and conservatories, streak-free. A speed ranked among the best in Luxembourg — one-off or on subscription.',
  'services.entrances.title': 'Common-area cleaning',
  'services.entrances.desc': 'Building entrances, halls and stairwells kept up on a schedule. Consistent cleanliness for co-ownerships and residences.',
  'services.learn': 'Learn more',

  'why.title': 'Why CleanCrew',
  'why.1.t': 'A crew that returns',
  'why.1.d': 'We clear once, then maintain. The same crew already knows the place.',
  'why.2.t': 'Clear quote, no surprises',
  'why.2.d': 'A price set before we start. No hidden costs.',
  'why.3.t': 'Fast and meticulous',
  'why.3.d': 'A rare execution speed, never at the cost of detail.',
  'why.4.t': 'Across Luxembourg',
  'why.4.d': 'Strassen and the whole Grand Duchy, north to south.',

  'faq.1.q': 'How much does a garage clearance cost in Luxembourg?',
  'faq.1.a': 'The price depends on volume, access and floor. CleanCrew gives a clear quote before the visit, with no hidden costs.',
  'faq.2.q': 'Do you operate across Luxembourg?',
  'faq.2.a': 'Yes. Based in Strassen, we cover the whole Grand Duchy, north to south.',

  'book.title': 'Book your visit',
  'book.sub': 'Pick a slot. We confirm by email within 24 h.',
  'book.name': 'Name',
  'book.email': 'Email',
  'book.phone': 'Phone',
  'book.service': 'Service',
  'book.date': 'Preferred date',
  'book.message': 'Details (area, access, floor…)',
  'book.submit': 'Request this date',
  'book.success': 'Request sent. We’ll get back to you within 24 h.',
  'book.error': 'Something went wrong. Please retry or email us directly.',
  'book.calendar.available': 'Available dates in blue.',
  'book.calendar.none': 'Pick a date above.',
  'book.calendar.months': ['January','February','March','April','May','June','July','August','September','October','November','December'],
  'book.calendar.days': ['M','T','W','T','F','S','S'],

  'contact.title': 'Let’s talk about your project',
  'contact.sub': 'A garage to clear, windows to clean, a building to maintain? Write to us.',

  'about.title': 'A local crew, obsessed with detail',
  'about.body': 'CleanCrew was built on a simple conviction: a cleared, maintained space changes everything. We combine high-impact clearance with regular upkeep to deliver a continuous, reliable, careful service across Luxembourg.',

  'footer.tagline': 'Clearance & cleaning in Luxembourg.',
  'footer.services': 'Services',
  'footer.company': 'Company',
  'footer.legal': 'Legal notice',
  'footer.rights': 'All rights reserved.',
  'blog.title': 'The journal',
  'blog.sub': 'Tips on clearance, upkeep and organising your space.',
  'blog.readmore': 'Read',
};

// Full native dictionaries. lu/pt/es currently translate every fr key, but are
// typed PartialDict: a new key can be added to fr/de/en first and filled in
// here later, falling back to fr in the meantime. A typo'd key is still caught.
const lu: PartialDict = {
  'nav.services': 'Servicer',
  'nav.about': 'Iwwer eis',
  'nav.blog': 'Blog',
  'nav.contact': 'Kontakt',
  'nav.book': 'Buchen',

  'hero.kicker': 'Entrëmpelung & Botzen · Lëtzebuerg',
  'hero.title': 'Mir eidelen Är Garage.',
  'hero.title2': 'A halen alles propper.',
  'hero.sub': 'Entrëmpelung vu Garagen, Kelleren a Späicheren. Duerno Fënster- a Gemeinschaftsbotzen vun engem Team, dat erëmkënnt. Klore Devis, séier Ausféierung, am ganze Land.',
  'hero.cta': 'En Datum buchen',
  'hero.cta2': 'Servicer kucken',

  'services.title': 'Dräi Servicer, ee Team',
  'services.clearance.title': 'Garage entrëmpelen',
  'services.clearance.desc': 'Garagen, Kelleren a Späicheren an engem eenzegen Asaz eidelgemaach. Zortéieren, ewechféieren, recycléieren. Dir kritt de Raum zréck, mir këmmeren eis ëm de Rescht.',
  'services.windows.title': 'Fënsterbotzen',
  'services.windows.desc': 'Fënsteren, Façaden a Wantergäert ouni Spueren. Eng Geschwindegkeet, déi zu de beschten zu Lëtzebuerg zielt — eemoleg oder am Abo.',
  'services.entrances.title': 'Botzen vu Gemeinschaftsraim',
  'services.entrances.desc': 'Agäng, Couloiren an Trapenhaiser, regelméisseg gepflegt. Konstant Proppertéit fir Matbesëtzergemeinschaften a Residenzen.',
  'services.learn': 'Méi gewuer ginn',

  'why.title': 'Firwat CleanCrew',
  'why.1.t': 'En Team, dat erëmkënnt',
  'why.1.d': 'Eemol eidelmaachen, da pflegen. Dat selwecht Team kennt d’Plaz scho.',
  'why.2.t': 'Klore Devis, keng Iwwerraschungen',
  'why.2.d': 'E Präis, dee virum Asaz feststeet. Keng verstoppte Käschten.',
  'why.3.t': 'Séier a suergfälteg',
  'why.3.d': 'Eng seele Ausféierungsgeschwindegkeet, ouni de Detail ze affréieren.',
  'why.4.t': 'Am ganze Land',
  'why.4.d': 'Stroossen an dat ganzt Groussherzogtum, vun Norden bis Süden.',

  'faq.1.q': 'Wat kascht eng Garagenentrëmpelung zu Lëtzebuerg?',
  'faq.1.a': 'De Präis hänkt vum Volume, vum Zougang a vum Stack of. CleanCrew nennt virum Asaz e kloren Devis, ouni verstoppte Käschten.',
  'faq.2.q': 'Schafft Dir am ganze Land?',
  'faq.2.a': 'Jo. Mat Sëtz zu Stroossen schaffe mir am ganze Groussherzogtum, vun Norden bis Süden.',

  'book.title': 'Buchen Ären Asaz',
  'book.sub': 'Wielt en Termin. Mir confirméieren per Email bannent 24 Stonnen.',
  'book.name': 'Numm',
  'book.email': 'Email',
  'book.phone': 'Telefon',
  'book.service': 'Service',
  'book.date': 'Gewënschten Datum',
  'book.message': 'Detailer (Fläch, Zougang, Stack…)',
  'book.submit': 'Dësen Datum ufroen',
  'book.success': 'Ufro geschéckt. Mir mellen eis bannent 24 Stonnen.',
  'book.error': 'Et ass e Feeler opgetrueden. Probéiert nach eng Kéier oder schreift eis direkt.',
  'book.calendar.available': 'Verfügbar Datumer a Blo.',
  'book.calendar.none': 'Wielt en Datum hei uewen.',
  'book.calendar.months': ['Januar','Februar','Mäerz','Abrëll','Mee','Juni','Juli','August','September','Oktober','November','Dezember'],
  'book.calendar.days': ['M','D','M','D','F','S','S'],

  'contact.title': 'Schwätze mer iwwer Äre Projet',
  'contact.sub': 'Eng Garage fir eidelzemaachen, Fënsteren fir ze botzen, en Immeuble fir ze pflegen? Schreift eis.',

  'about.title': 'E lokaalt Team, besiess vum Detail',
  'about.body': 'CleanCrew ass aus enger einfacher Iwwerzeegung entstanen: e geraumte gepflegte Raum verännert alles. Mir verbannen impaktvoll Entrëmpelung mat regelméisseger Pfleeg, fir e kontinuéierleche, zouverléissege a suergfältege Service am ganze Land.',

  'footer.tagline': 'Entrëmpelung & Botzen zu Lëtzebuerg.',
  'footer.services': 'Servicer',
  'footer.company': 'Entreprise',
  'footer.legal': 'Impressum',
  'footer.rights': 'All Rechter virbehalen.',
  'blog.title': 'De Journal',
  'blog.sub': 'Tipps fir Entrëmpelung, Pfleeg an d’Organisatioun vum Raum.',
  'blog.readmore': 'Liesen',
};

const pt: PartialDict = {
  'nav.services': 'Serviços',
  'nav.about': 'Sobre',
  'nav.blog': 'Blog',
  'nav.contact': 'Contacto',
  'nav.book': 'Reservar',

  'hero.kicker': 'Esvaziamento & limpeza · Luxemburgo',
  'hero.title': 'Esvaziamos a sua garagem.',
  'hero.title2': 'E mantemos tudo impecável.',
  'hero.sub': 'Esvaziamento de garagens, caves e sótãos. Depois limpeza de vidros e zonas comuns, por uma equipa que regressa. Orçamento claro, intervenção rápida, em todo o Luxemburgo.',
  'hero.cta': 'Reservar uma data',
  'hero.cta2': 'Ver serviços',

  'services.title': 'Três serviços, uma só equipa',
  'services.clearance.title': 'Esvaziamento de garagem',
  'services.clearance.desc': 'Garagens, caves e sótãos esvaziados numa só intervenção. Triagem, remoção, reciclagem. Recupera o espaço, nós tratamos do resto.',
  'services.windows.title': 'Limpeza de vidros',
  'services.windows.desc': 'Vidros, janelas e marquises sem marcas. Uma rapidez entre as melhores do Luxemburgo, pontual ou por subscrição.',
  'services.entrances.title': 'Limpeza de zonas comuns',
  'services.entrances.desc': 'Halls, entradas e escadas de prédios, mantidos com regularidade. Limpeza constante para condomínios e residências.',
  'services.learn': 'Saber mais',

  'why.title': 'Porquê a CleanCrew',
  'why.1.t': 'Uma equipa que regressa',
  'why.1.d': 'Esvaziamos uma vez, depois mantemos. A mesma equipa já conhece o local.',
  'why.2.t': 'Orçamento claro, sem surpresas',
  'why.2.d': 'Um preço definido antes da intervenção. Sem custos escondidos.',
  'why.3.t': 'Rápidos e cuidadosos',
  'why.3.d': 'Uma rapidez de execução rara, sem nunca sacrificar o detalhe.',
  'why.4.t': 'Em todo o Luxemburgo',
  'why.4.d': 'Strassen e todo o Grão-Ducado, de norte a sul.',

  'faq.1.q': 'Quanto custa o esvaziamento de uma garagem no Luxemburgo?',
  'faq.1.a': 'O preço depende do volume, do acesso e do andar. A CleanCrew apresenta um orçamento claro antes da intervenção, sem custos escondidos.',
  'faq.2.q': 'Intervêm em todo o Luxemburgo?',
  'faq.2.a': 'Sim. Sediados em Strassen, intervimos em todo o Grão-Ducado, de norte a sul.',

  'book.title': 'Reserve a sua intervenção',
  'book.sub': 'Escolha um horário. Confirmamos por email em 24 h.',
  'book.name': 'Nome',
  'book.email': 'Email',
  'book.phone': 'Telefone',
  'book.service': 'Serviço',
  'book.date': 'Data pretendida',
  'book.message': 'Detalhes (área, acesso, andar…)',
  'book.submit': 'Pedir esta data',
  'book.success': 'Pedido enviado. Entramos em contacto em 24 h.',
  'book.error': 'Ocorreu um erro. Tente novamente ou escreva-nos diretamente.',
  'book.calendar.available': 'Datas disponíveis a azul.',
  'book.calendar.none': 'Escolha uma data acima.',
  'book.calendar.months': ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  'book.calendar.days': ['S','T','Q','Q','S','S','D'],

  'contact.title': 'Vamos falar do seu projeto',
  'contact.sub': 'Uma garagem para esvaziar, vidros para limpar, um prédio para manter? Escreva-nos.',

  'about.title': 'Uma equipa local, obcecada pelo detalhe',
  'about.body': 'A CleanCrew nasceu de uma convicção simples: um espaço esvaziado e cuidado muda tudo. Combinamos o esvaziamento de forte impacto com a manutenção regular para oferecer um serviço contínuo, fiável e cuidado, em todo o Luxemburgo.',

  'footer.tagline': 'Esvaziamento & limpeza no Luxemburgo.',
  'footer.services': 'Serviços',
  'footer.company': 'Empresa',
  'footer.legal': 'Avisos legais',
  'footer.rights': 'Todos os direitos reservados.',
  'blog.title': 'O jornal',
  'blog.sub': 'Conselhos de esvaziamento, manutenção e organização do espaço.',
  'blog.readmore': 'Ler',
};

const es: PartialDict = {
  'nav.services': 'Servicios',
  'nav.about': 'Nosotros',
  'nav.blog': 'Blog',
  'nav.contact': 'Contacto',
  'nav.book': 'Reservar',

  'hero.kicker': 'Vaciado & limpieza · Luxemburgo',
  'hero.title': 'Vaciamos tu garaje.',
  'hero.title2': 'Y lo dejamos impecable.',
  'hero.sub': 'Vaciado de garajes, sótanos y desvanes. Luego limpieza de cristales y zonas comunes, por un equipo que vuelve. Presupuesto claro, intervención rápida, en todo Luxemburgo.',
  'hero.cta': 'Reservar una fecha',
  'hero.cta2': 'Ver servicios',

  'services.title': 'Tres servicios, un solo equipo',
  'services.clearance.title': 'Vaciado de garaje',
  'services.clearance.desc': 'Garajes, sótanos y desvanes vaciados en una sola intervención. Clasificación, retirada, reciclaje. Tú recuperas el espacio, nosotros nos ocupamos del resto.',
  'services.windows.title': 'Limpieza de cristales',
  'services.windows.desc': 'Cristales, ventanales y galerías sin marcas. Una rapidez entre las mejores de Luxemburgo, puntual o por suscripción.',
  'services.entrances.title': 'Limpieza de zonas comunes',
  'services.entrances.desc': 'Portales, entradas y escaleras de edificios, mantenidos con regularidad. Limpieza constante para comunidades y residencias.',
  'services.learn': 'Saber más',

  'why.title': 'Por qué CleanCrew',
  'why.1.t': 'Un equipo que vuelve',
  'why.1.d': 'Vaciamos una vez, luego mantenemos. El mismo equipo ya conoce el lugar.',
  'why.2.t': 'Presupuesto claro, sin sorpresas',
  'why.2.d': 'Un precio fijado antes de la intervención. Sin costes ocultos.',
  'why.3.t': 'Rápidos y cuidadosos',
  'why.3.d': 'Una rapidez de ejecución poco común, sin sacrificar nunca el detalle.',
  'why.4.t': 'En todo Luxemburgo',
  'why.4.d': 'Strassen y todo el Gran Ducado, de norte a sur.',

  'faq.1.q': '¿Cuánto cuesta el vaciado de un garaje en Luxemburgo?',
  'faq.1.a': 'El precio depende del volumen, el acceso y la planta. CleanCrew ofrece un presupuesto claro antes de la intervención, sin costes ocultos.',
  'faq.2.q': '¿Trabajáis en todo Luxemburgo?',
  'faq.2.a': 'Sí. Con sede en Strassen, intervenimos en todo el Gran Ducado, de norte a sur.',

  'book.title': 'Reserva tu intervención',
  'book.sub': 'Elige una franja. Confirmamos por email en 24 h.',
  'book.name': 'Nombre',
  'book.email': 'Email',
  'book.phone': 'Teléfono',
  'book.service': 'Servicio',
  'book.date': 'Fecha deseada',
  'book.message': 'Detalles (superficie, acceso, planta…)',
  'book.submit': 'Solicitar esta fecha',
  'book.success': 'Solicitud enviada. Te contactamos en 24 h.',
  'book.error': 'Se ha producido un error. Inténtalo de nuevo o escríbenos directamente.',
  'book.calendar.available': 'Fechas disponibles en azul.',
  'book.calendar.none': 'Elige una fecha arriba.',
  'book.calendar.months': ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  'book.calendar.days': ['L','M','X','J','V','S','D'],

  'contact.title': 'Hablemos de tu proyecto',
  'contact.sub': '¿Un garaje que vaciar, cristales que limpiar, un edificio que mantener? Escríbenos.',

  'about.title': 'Un equipo local, obsesionado con el detalle',
  'about.body': 'CleanCrew nació de una convicción simple: un espacio vaciado y cuidado lo cambia todo. Combinamos el vaciado de gran impacto con el mantenimiento regular para ofrecer un servicio continuo, fiable y cuidado, en todo Luxemburgo.',

  'footer.tagline': 'Vaciado & limpieza en Luxemburgo.',
  'footer.services': 'Servicios',
  'footer.company': 'Empresa',
  'footer.legal': 'Aviso legal',
  'footer.rights': 'Todos los derechos reservados.',
  'blog.title': 'El diario',
  'blog.sub': 'Consejos de vaciado, mantenimiento y organización del espacio.',
  'blog.readmore': 'Leer',
};

export const ui: Record<Lang, PartialDict> = { fr, de, en, lu, pt, es };

// Known keys autocomplete; dynamic keys (e.g. `services.${s}.title`) still pass.
type Key = TranslationKey | (string & {});

export function useTranslations(lang: Lang) {
  return function t(key: Key): string {
    const v = ui[lang][key as TranslationKey] ?? ui.fr[key as TranslationKey] ?? key;
    return Array.isArray(v) ? v.join(', ') : v;
  };
}

// Raw accessor — returns arrays intact (for calendar months/days etc.)
export function useRaw(lang: Lang) {
  return function r(key: Key): string | string[] {
    return ui[lang][key as TranslationKey] ?? ui.fr[key as TranslationKey] ?? key;
  };
}

/* ────────────────────────────────────────────────────────────────────────
   COR València — bilingual content
   English first (per brief). Spanish translations follow.
   Section labels are warm + lowercase, not mono uppercase.
   ──────────────────────────────────────────────────────────────────────── */

interface Pillar { name: string; quote: string }
interface Price  { label: string; price: string }
interface Line   { text: string; gold: boolean }

export interface Copy {
  nav: { practice: string; sessions: string; programmes: string; join: string; book: string };
  hero: {
    label:        string;
    titleA:       string;
    titleB:       string;
    titleC:       string;
    subtitle:     string;
    ctaPrimary:   string;
    ctaSecondary: string;
    scroll:       string;
    motto:        string;
  };
  essence: {
    label: string;
    lines: readonly string[];
    body:  string;
    aside: string;
  };
  practice: {
    label:   string;
    title:   string;
    titleEm: string;
    blurb:   string;
    pillars: readonly Pillar[];
  };
  live: {
    label:     string;
    status:    string;
    title:     string;
    desc:      string;
    gift:      string;
    when:      string;
    where:     string;
    formLabel: string;
    formNote:  string;
    cta:       string;
    sent:      string;
  };
  offerings: {
    label:   string;
    title:   string;
    titleEm: string;
    blurb:   string;
    kids: {
      status: string; title: string; desc: string; openTo: string;
      prices: readonly Price[]; cta: string; sent: string;
    };
    adult: {
      status: string; title: string; desc: string; focus: string;
      tag: string; cta: string; sent: string;
    };
  };
  tailored: {
    label:     string;
    title:     string;
    titleEm:   string;
    blurb:     string;
    audiences: readonly string[];
    prompt:    string;
    cta:       string;
    sent:      string;
  };
  gallery: { label: string; title: string; titleEm: string };
  voice:   { label: string; lines: readonly Line[]; attribution: string; aside: string };
  join: {
    label: string; title: string; titleEm: string; blurb: string;
    emailLabel: string; emailPlaceholder: string; cta: string; sent: string;
    contactLabel: string; contactName: string; contactMessage: string; contactCta: string;
    location: string; instagram: string; copyright: string;
  };
}

const en: Copy = {
  nav: { practice:'Practice', sessions:'Sessions', programmes:'Programmes', join:'Join', book:'Book' },
  hero: {
    label:        'a somatic practice in valència',
    titleA:       'Return',
    titleB:       'to your',
    titleC:       'body',
    subtitle:     'Movement, breath, and the slow return to alignment. A practice for those ready to come home to themselves.',
    ctaPrimary:   'Join a circle',
    ctaSecondary: 'Discover the practice',
    scroll:       'scroll',
    motto:        '— heart at the core of innovation',
  },
  essence: {
    label: 'the essence',
    lines: ['COR is', 'a coming', 'home.'],
    body:  'We move not to perform, but to feel. Not to escape, but to return. COR is a slow, embodied practice — a place where the body remembers what the mind has forgotten.',
    aside: 'Founded in València by a dancer, somatic practitioner, and massage therapist who has spent two decades listening to the body.',
  },
  practice: {
    label:   'the practice',
    title:   'Four ways back',
    titleEm: 'to yourself',
    blurb:   'COR weaves together four threads — each one a doorway into the body, the breath, and the present moment.',
    pillars: [
      { name:'Movement',  quote:'The body knows what the mind has forgotten.' },
      { name:'Breath',    quote:'Between two breaths, the soul speaks.' },
      { name:'Touch',     quote:'What you cannot say in words, your body remembers.' },
      { name:'Stillness', quote:'In stillness, you meet yourself.' },
    ],
  },
  live: {
    label:     'live now',
    status:    'live now',
    title:     'COR Soft Landing Circle',
    desc:      'A monthly somatic grounding circle for adults navigating life transitions. A space to breathe, connect, and be held.',
    gift:      'Free to attend — offered as a gift to the community while COR grows in València.',
    when:      'Monthly · València',
    where:     'Location shared on booking',
    formLabel: 'Reserve your place',
    formNote:  'No payment, just your name and email to manage numbers.',
    cta:       'rsvp',
    sent:      'Your place is held. We\'ll be in touch with the location.',
  },
  offerings: {
    label:   'what\'s coming',
    title:   'New journeys,',
    titleEm: 'opening soon',
    blurb:   'Two new offerings on the horizon. Add yourself to either list to be notified — and to help shape what they become.',
    kids: {
      status: 'June 2026',
      title:  'COR Kids València',
      desc:   'Outdoor movement and music sessions for children and parents at Jardín del Turia and Playa del Cabanyal. Not a dance class — a space for emotional expression, connection, and wellbeing through movement and music.',
      openTo: 'Open to all ages, backgrounds, and family structures.',
      prices: [
        { label:'Drop-in single',                            price:'€10' },
        { label:'Drop-in parent + child',                    price:'€15' },
        { label:'Monthly · individual (4 sessions)',          price:'€30' },
        { label:'Monthly · parent + child (4 sessions)',      price:'€50' },
      ],
      cta:    'notify me',
      sent:   'You\'re on the list. We\'ll write before June.',
    },
    adult: {
      status: 'date tbc',
      title:  'The 4-Session Adult Course',
      desc:   'A journey for adults ready to go deeper. Over four sessions, participants move through somatic movement practices, alignment work, meditation, and guided discussion — each session building on the last.',
      focus:  'The focus is on returning to your true self: releasing what no longer fits, reconnecting with the body, and finding your way back to alignment.',
      tag:    'Premium and transformational. Not a drop-in. A commitment to yourself.',
      cta:    'join the waitlist',
      sent:   'You\'re on the waitlist. The course is forming.',
    },
  },
  tailored: {
    label:     'tailored work',
    title:     'For groups ready',
    titleEm:   'to move together',
    blurb:     'Bespoke programmes drawing from COR\'s somatic methodology, embodiment teachings, and movement practice.',
    audiences: ['Schools & educators','Corporate groups','Women\'s circles','Families & parents','ADHD communities','Adults in life transition'],
    prompt:    'Tell us about your group and we\'ll create something just for you.',
    cta:       'begin an enquiry',
    sent:      'Thank you. Raquel will write back personally — usually within a week.',
  },
  gallery: {
    label:   'in motion',
    title:   'Bodies, breath,',
    titleEm: 'and the space between',
  },
  voice: {
    label: 'a note from raquel',
    lines: [
      { text:'This is not',       gold:false },
      { text:'a fitness class.',  gold:false },
      { text:'This is',           gold:false },
      { text:'a homecoming.',     gold:true  },
    ],
    attribution: 'Raquel — Founder, COR València',
    aside: 'Fifteen years of dance. A decade of somatic touch. A lifetime of listening to bodies — including my own. COR is what I wish I had been offered, in the shape that I needed it.',
  },
  join: {
    label:            'stay close',
    title:            'Be the first',
    titleEm:          'to know',
    blurb:            'New offerings, circle dates, and reflections from the practice — sent gently, never often.',
    emailLabel:       'Your email',
    emailPlaceholder: 'name@example.com',
    cta:              'join the list',
    sent:             'Welcome. You\'ll hear from us soon.',
    contactLabel:     'Or write to us',
    contactName:      'Name',
    contactMessage:   'What\'s on your heart?',
    contactCta:       'send a note',
    location:         'València, España',
    instagram:        '@corvalencia',
    copyright:        '© 2026 COR València · Heart at the core of innovation',
  },
};

const es: Copy = {
  nav: { practice:'Práctica', sessions:'Sesiones', programmes:'Programas', join:'Únete', book:'Reserva' },
  hero: {
    label:        'una práctica somática en valència',
    titleA:       'Vuelve',
    titleB:       'a tu',
    titleC:       'cuerpo',
    subtitle:     'Movimiento, respiración, y el regreso pausado a la alineación. Una práctica para quienes están listos para volver a sí mismos.',
    ctaPrimary:   'Únete a un círculo',
    ctaSecondary: 'Descubre la práctica',
    scroll:       'desliza',
    motto:        '— el corazón en el centro de la innovación',
  },
  essence: {
    label: 'la esencia',
    lines: ['COR es', 'un regreso', 'a casa.'],
    body:  'Nos movemos no para actuar, sino para sentir. No para escapar, sino para volver. COR es una práctica corporal pausada — un lugar donde el cuerpo recuerda lo que la mente ha olvidado.',
    aside: 'Fundado en València por una bailarina, terapeuta somática y masajista, que lleva dos décadas escuchando al cuerpo.',
  },
  practice: {
    label:   'la práctica',
    title:   'Cuatro caminos',
    titleEm: 'de vuelta a ti',
    blurb:   'COR entrelaza cuatro hilos — cada uno una puerta hacia el cuerpo, la respiración, y el momento presente.',
    pillars: [
      { name:'Movimiento',   quote:'El cuerpo sabe lo que la mente ha olvidado.' },
      { name:'Respiración',  quote:'Entre dos respiraciones, habla el alma.' },
      { name:'Tacto',        quote:'Lo que no puedes decir con palabras, tu cuerpo lo recuerda.' },
      { name:'Quietud',      quote:'En la quietud, te encuentras a ti mismo.' },
    ],
  },
  live: {
    label:     'ahora en vivo',
    status:    'ahora en vivo',
    title:     'COR Círculo de Aterrizaje Suave',
    desc:      'Un círculo somático mensual para adultos en transición vital. Un espacio para respirar, conectar, y ser sostenido.',
    gift:      'Gratuito — un regalo a la comunidad mientras COR crece en València.',
    when:      'Mensual · València',
    where:     'Ubicación al reservar',
    formLabel: 'Reserva tu lugar',
    formNote:  'Sin pago, solo tu nombre y email para gestionar el aforo.',
    cta:       'reservar',
    sent:      'Tu lugar está reservado. Te escribiremos con la ubicación.',
  },
  offerings: {
    label:   'lo que viene',
    title:   'Nuevos viajes,',
    titleEm: 'pronto disponibles',
    blurb:   'Dos nuevas ofertas en el horizonte. Únete a cualquier lista para ser avisada — y para dar forma a lo que serán.',
    kids: {
      status: 'junio 2026',
      title:  'COR Kids València',
      desc:   'Sesiones al aire libre de movimiento y música para niños y padres en el Jardín del Turia y la Playa del Cabanyal. No es una clase de baile — un espacio para la expresión emocional, la conexión, y el bienestar.',
      openTo: 'Abierto a todas las edades, orígenes, y estructuras familiares.',
      prices: [
        { label:'Sesión individual',                              price:'€10' },
        { label:'Sesión adulto + niño',                           price:'€15' },
        { label:'Pase mensual · individual (4 sesiones)',          price:'€30' },
        { label:'Pase mensual · adulto + niño (4 sesiones)',       price:'€50' },
      ],
      cta:    'avísame',
      sent:   'Estás en la lista. Te escribiremos antes de junio.',
    },
    adult: {
      status: 'fecha por confirmar',
      title:  'El Curso de 4 Sesiones para Adultos',
      desc:   'Un viaje para adultos listos para profundizar. A lo largo de cuatro sesiones, los participantes atraviesan prácticas somáticas, trabajo de alineación, meditación, y diálogo guiado — cada sesión construye sobre la anterior.',
      focus:  'El foco está en volver a tu verdadero ser: soltar lo que ya no encaja, reconectar con el cuerpo, y encontrar el camino de regreso a la alineación.',
      tag:    'Premium y transformador. No es de prueba. Un compromiso contigo misma.',
      cta:    'únete a la lista',
      sent:   'Estás en la lista de espera. El curso está tomando forma.',
    },
  },
  tailored: {
    label:     'a medida',
    title:     'Para grupos listos',
    titleEm:   'para moverse juntos',
    blurb:     'Programas a medida que beben de la metodología somática de COR, las enseñanzas de encarnación, y la práctica del movimiento.',
    audiences: ['Escuelas y educadores','Grupos corporativos','Círculos de mujeres','Familias y padres','Comunidades TDAH','Adultos en transición'],
    prompt:    'Cuéntanos sobre tu grupo y crearemos algo a tu medida.',
    cta:       'comienza una consulta',
    sent:      'Gracias. Raquel te responderá personalmente — normalmente en una semana.',
  },
  gallery: {
    label:   'en movimiento',
    title:   'Cuerpos, respiración,',
    titleEm: 'y el espacio entre ellos',
  },
  voice: {
    label: 'una nota de raquel',
    lines: [
      { text:'Esto no es',                gold:false },
      { text:'una clase de fitness.',     gold:false },
      { text:'Esto es',                   gold:false },
      { text:'un regreso a casa.',        gold:true  },
    ],
    attribution: 'Raquel — Fundadora, COR València',
    aside: 'Quince años de danza. Una década de tacto somático. Toda una vida escuchando cuerpos — incluido el mío. COR es lo que desearía haber recibido, en la forma en que lo necesitaba.',
  },
  join: {
    label:            'quédate cerca',
    title:            'Sé la primera',
    titleEm:          'en saberlo',
    blurb:            'Nuevas ofertas, fechas de círculos, y reflexiones desde la práctica — enviadas con cuidado, nunca con frecuencia.',
    emailLabel:       'Tu email',
    emailPlaceholder: 'nombre@ejemplo.com',
    cta:              'únete a la lista',
    sent:             'Bienvenida. Te escribiremos pronto.',
    contactLabel:     'O escríbenos',
    contactName:      'Nombre',
    contactMessage:   '¿Qué hay en tu corazón?',
    contactCta:       'envía una nota',
    location:         'València, España',
    instagram:        '@corvalencia',
    copyright:        '© 2026 COR València · El corazón en el centro de la innovación',
  },
};

export const COPY: { en: Copy; es: Copy } = { en, es };
export type Lang = keyof typeof COPY;

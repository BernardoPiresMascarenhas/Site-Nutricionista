/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURAÇÃO CENTRAL DO SITE
 * ─────────────────────────────────────────────────────────────
 *  Tudo o que muda de uma profissional para outra está aqui:
 *  nome, textos, serviços, fotos, contatos e modalidades.
 *
 *  ⚠ Projeto demonstrativo. "Isadora Vale" é uma marca fictícia.
 *  As fotografias são do Unsplash (licença Unsplash) e são
 *  meramente ilustrativas — não retratam uma profissional real.
 *
 *  Convenção de títulos: use "|" para quebrar linha e *palavra*
 *  para o destaque em itálico. Ex.: "Sua melhor|versão *começa*".
 * ─────────────────────────────────────────────────────────────
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  /** Mensagem usada no WhatsApp quando o card é clicado. */
  bookingMessage: string;
};

export type Step = {
  title: string;
  description: string;
  image: { src: string; alt: string };
};

export const site = {
  /** Modo demonstração: exibe selos "demonstrativo" e o aviso no rodapé. */
  demo: true,

  brand: {
    name: "Isadora Vale",
    descriptor: "Nutrição",
    /** Título profissional exibido no rodapé. */
    role: "Nutricionista",
    /**
     * CRN: preencha SOMENTE com o registro verdadeiro informado pela
     * profissional. Vazio = não exibido.
     */
    crn: "",
  },

  url: "https://isadora-vale-nutricao.vercel.app",

  seo: {
    title: "Isadora Vale | Nutrição personalizada",
    description:
      "Nutrição personalizada para uma relação mais equilibrada com a comida — sem dietas impossíveis e sem abrir mão do prazer de comer. Atendimento presencial e online.",
  },

  contact: {
    /**
     * WhatsApp no formato internacional, só números (ex.: "5511999999999").
     * Enquanto estiver vazio, os botões de agendamento abrem um aviso
     * explicando que esta é uma versão demonstrativa.
     */
    whatsapp: "",
    whatsappMessage:
      "Olá, Isadora! Vim pelo site e gostaria de agendar uma consulta.",
    email: "",
    instagram: "", // ex.: "https://instagram.com/usuario"
    /** Cidade/endereço. Vazio = texto neutro "a definir". */
    location: "",
  },

  credits: {
    designer: "Bernardo Pires",
    /** Link do portfólio. Vazio = assinatura sem link. */
    portfolio: "",
  },

  nav: [
    { label: "Sobre", href: "#sobre" },
    { label: "Atendimento", href: "#atendimento" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Formatos", href: "#formatos" },
    { label: "Dúvidas", href: "#duvidas" },
  ],

  hero: {
    headline: "Sua melhor|versão começa|com *equilíbrio.*",
    text: "Uma abordagem personalizada da nutrição para transformar sua relação com a alimentação, sem dietas impossíveis e sem abrir mão do prazer de comer.",
    primaryCta: "Comece sua jornada",
    secondaryCta: { label: "Conheça meu trabalho", href: "#sobre" },
    image: {
      src: "/images/hero-field.jpg",
      alt: "Mulher de suéter verde-oliva em um campo ao entardecer, olhando para o horizonte",
    },
    /**
     * Texto do selo giratório, separado por "·". O espaçamento é ajustado para
     * fechar o círculo; mantenha entre ~28 e ~40 caracteres no total.
     */
    badge: "nutrição · equilíbrio · bem-estar",
  },

  manifesto: {
    text: "Nutrição não é sobre *restringir.* É sobre descobrir o que *faz bem para você.*",
    /** Palavra que recebe o traço animado. */
    strike: "restringir.",
    aside:
      "Nenhum alimento resolve tudo sozinho, e nenhum precisa ser proibido para sempre. O que sustenta uma mudança é entender como você come, por que come e o que é possível ajustar.",
  },

  about: {
    title: "Antes do plano, quero entender *a sua vida.*",
    paragraphs: [
      "Toda consulta começa por uma conversa. O que você come num dia corrido, o que gosta, o que evita, o que já tentou e não deu certo. É a partir disso, e não de um modelo pronto, que o acompanhamento é construído.",
      "Acredito numa nutrição baseada em evidências e traduzida para o cotidiano: refeições possíveis, ajustes graduais e espaço para os momentos em que a comida é encontro, memória e prazer.",
    ],
    cta: { label: "Conheça minha abordagem", href: "#filosofia" },
    image: {
      src: "/images/hero-field.jpg",
      alt: "Mulher de suéter verde-oliva em um campo ao entardecer, olhando para o horizonte",
    },
    imageNote: "Imagem ilustrativa",
  },

  services: {
    title: "Áreas de *atendimento*",
    intro:
      "Frentes de trabalho que podem ser combinadas conforme o seu momento. Toque em uma delas para conversar sobre ela.",
    items: [
      {
        id: "clinica",
        title: "Nutrição clínica",
        description:
          "Cuidado alimentar para quem convive com condições de saúde que pedem atenção específica, em diálogo com o acompanhamento médico.",
        image: {
          src: "/images/service-clinical.jpg",
          alt: "Tigela de castanhas e fatias de limão sobre uma mesa em luz suave",
        },
        bookingMessage:
          "Olá! Gostaria de saber mais sobre o atendimento em nutrição clínica.",
      },
      {
        id: "reeducacao",
        title: "Reeducação alimentar",
        description:
          "Revisar hábitos sem radicalismo: entender padrões, reorganizar as refeições e recuperar a tranquilidade à mesa.",
        image: {
          src: "/images/service-reeducation.jpg",
          alt: "Tábua com abacate, ovos, tomates, cogumelos e cebolinha prontos para o preparo",
        },
        bookingMessage:
          "Olá! Gostaria de saber mais sobre o acompanhamento de reeducação alimentar.",
      },
      {
        id: "esportiva",
        title: "Nutrição esportiva",
        description:
          "Alimentação pensada para o seu treino — do recreativo ao mais intenso — com foco em energia, recuperação e constância.",
        image: {
          src: "/images/service-sport.jpg",
          alt: "Pessoa sentada segurando um prato colorido com legumes e grãos",
        },
        bookingMessage:
          "Olá! Gostaria de saber mais sobre o atendimento em nutrição esportiva.",
      },
      {
        id: "acompanhamento",
        title: "Acompanhamento personalizado",
        description:
          "Retornos regulares para ajustar o plano ao que muda na sua vida: agenda, fases, objetivos e preferências.",
        image: {
          src: "/images/service-follow.jpg",
          alt: "Prato com ovo pochê, legumes e tomates sobre mesa de madeira",
        },
        bookingMessage:
          "Olá! Gostaria de saber mais sobre o acompanhamento personalizado.",
      },
    ] satisfies Service[],
  },

  process: {
    title: "Como funciona o *acompanhamento*",
    intro: "Quatro etapas, no seu ritmo. Cada uma prepara a seguinte.",
    steps: [
      {
        title: "Primeiro contato",
        description:
          "Você entra em contato, tira dúvidas sobre o atendimento e escolhe o formato que faz mais sentido: presencial ou online.",
        image: {
          src: "/images/step-contact.jpg",
          alt: "Mãos fazendo anotações em um bloco de papel sobre mesa escura",
        },
      },
      {
        title: "Entendendo sua rotina",
        description:
          "Na primeira consulta, conversamos sobre histórico, hábitos, horários, preferências e objetivos. Sem julgamentos e sem pressa.",
        image: {
          src: "/images/step-routine.jpg",
          alt: "Mulher cozinhando em uma cozinha iluminada por luz natural",
        },
      },
      {
        title: "Planejamento individualizado",
        description:
          "Você recebe um plano construído para o seu dia a dia, com orientações claras e opções que respeitam o seu paladar.",
        image: {
          src: "/images/step-plan.jpg",
          alt: "Prato equilibrado com vagem, quinoa, tomates e sementes, visto de cima",
        },
      },
      {
        title: "Acompanhamento e evolução",
        description:
          "Nos retornos, olhamos juntos para o que funcionou, o que precisa mudar e quais são os próximos passos.",
        image: {
          src: "/images/step-evolution.jpg",
          alt: "Mesa de café da manhã com frutas, iogurte, granola e café",
        },
      },
    ] satisfies Step[],
  },

  philosophy: {
    title: "Três ideias que *orientam* o trabalho",
    pillars: [
      {
        title: "Individualidade",
        text: "Cada pessoa possui necessidades, preferências e rotinas diferentes.",
      },
      {
        title: "Equilíbrio",
        text: "Uma alimentação saudável precisa fazer sentido na vida real.",
      },
      {
        title: "Consistência",
        text: "Pequenas mudanças sustentáveis fazem parte de um processo duradouro.",
      },
    ],
  },

  gallery: {
    title: "Comer bem cabe *na vida real.*",
    items: [
      { src: "/images/gallery-breakfast.jpg", alt: "Mesa com várias tigelas de café da manhã iluminadas pelo sol", size: "tall" },
      { quote: "Cor, textura *e tempo.*" },
      { src: "/images/gallery-lemons.jpg", alt: "Limões-sicilianos e folhas de manjericão sobre tecido branco ao sol", size: "wide" },
      { src: "/images/gallery-bowl.jpg", alt: "Tigela escura com legumes, grão-de-bico e tomate sobre madeira", size: "mid" },
      { quote: "Menos regra, *mais repertório.*" },
      { src: "/images/gallery-ingredients.jpg", alt: "Alho, tomates, queijo, pão e azeite dispostos sobre uma bancada", size: "tall" },
      { src: "/images/gallery-pantry.jpg", alt: "Pequenas tigelas com frutas, sementes e especiarias vistas de cima", size: "mid" },
      { quote: "O prazer de comer *também é cuidado.*" },
      { src: "/images/gallery-kitchen.jpg", alt: "Bancada de cozinha com tomates, pão e ervas frescas", size: "tall" },
    ] as Array<
      | { src: string; alt: string; size: "tall" | "wide" | "mid" }
      | { quote: string }
    >,
  },

  formats: {
    title: "Presencial *ou* online",
    intro:
      "Os dois formatos seguem a mesma lógica de cuidado. A escolha depende do que é mais confortável para você.",
    items: [
      {
        id: "presencial",
        title: "Consulta presencial",
        text: "Para quem prefere o encontro em pessoa, em um ambiente reservado e tranquilo para conversar.",
        points: [
          "Conversa e avaliação feitas pessoalmente",
          "Ambiente reservado",
          "Local informado no agendamento",
        ],
        image: {
          src: "/images/format-inperson.jpg",
          position: "50% 78%",
          alt: "Livro aberto e copo de chá sobre uma mesa sob luz quente",
        },
        bookingMessage: "Olá! Gostaria de agendar uma consulta presencial.",
      },
      {
        id: "online",
        title: "Consulta online",
        text: "O mesmo cuidado por videochamada, de onde você estiver — prático para agendas cheias ou outras cidades.",
        points: [
          "Atendimento por videochamada",
          "Orientações e materiais em formato digital",
          "Sem deslocamento",
        ],
        image: {
          src: "/images/format-online.jpg",
          position: "40% 70%",
          alt: "Caneca e flores sobre um livro, ao lado de uma janela clara",
        },
        bookingMessage: "Olá! Gostaria de agendar uma consulta online.",
      },
    ],
  },

  faq: {
    title: "Perguntas *frequentes*",
    intro:
      "Respostas demonstrativas. Na versão final, cada uma é ajustada à forma de trabalho da profissional.",
    items: [
      {
        q: "Como funciona a primeira consulta?",
        a: "É o momento de conhecer sua história: hábitos, horários, preferências, exames recentes (se houver) e o que você espera do acompanhamento. A partir dessa conversa, a estratégia começa a ser desenhada.",
      },
      {
        q: "O acompanhamento pode ser online?",
        a: "Sim. O formato online segue a mesma estrutura do presencial, por videochamada. Os detalhes sobre plataforma e envio de materiais são combinados no agendamento.",
      },
      {
        q: "Preciso seguir uma dieta restritiva?",
        a: "Esse não é o ponto de partida. A proposta é construir uma alimentação que funcione para você, com ajustes graduais. Restrições só entram quando existe uma indicação clara para elas.",
      },
      {
        q: "Com que frequência acontecem os retornos?",
        a: "Depende dos seus objetivos e do momento do acompanhamento. A frequência é definida em conjunto, depois da primeira consulta, e pode mudar ao longo do processo.",
      },
      {
        q: "Como posso agendar uma consulta?",
        a: "Pelos botões de agendamento deste site, que levam a uma conversa direta pelo WhatsApp. Nesta versão demonstrativa, o contato ainda não está configurado.",
      },
    ],
  },

  finalCta: {
    title: "O próximo passo é|cuidar *de você.*",
    text: "Uma primeira conversa já ajuda a entender qual caminho faz sentido para o seu momento.",
    button: "Agendar minha consulta",
    image: {
      src: "/images/cta-herbs.jpg",
      alt: "Cestos com ervas frescas e grãos em uma feira",
    },
  },

  /** Créditos das fotografias (Unsplash License). */
  photoCredits: [
    "Iryna Studenets", "Diego Arenas de Rodrigo", "Katie Smith",
    "Clark Douglas", "Brooke Lark", "Kelly Sikkema", "Tina Dawson",
    "Ella Olsson", "Monaz Nazary", "Illia Bondar", "Odiseo Castrejon",
    "Ahmet Koç", "Joanie Simon", "Clay Banks", "Leylâ", "Carmela Lustre",
    "Raelle Cameron",
  ],
};

export type Site = typeof site;

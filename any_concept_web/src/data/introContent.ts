import type { ContentItem } from '@/components/InteractiveText';

export const introContent: ContentItem = {
  type: 'paragraph',
  content: [
    { type: 'text', text: "HELLO, I'M KLAUDEN.\nI " },
    {
      type: 'interactive',
      id: 'wonder',
      trigger: 'WONDER',
      icon: 'bulb',
      expanded: [
        { type: 'text', text: " — OR MORE PRECISELY, I'M OBSESSED WITH THE " },
        {
          type: 'interactive',
          id: 'gap',
          trigger: 'GAP',
          icon: 'network',
          expanded: [
            {
              type: 'text',
              text: " — YOU THINK YOU'RE USING THE TOOL. BUT THE TOOL IS ALSO SHAPING YOU. THE MORE YOU THINK ABOUT IT, THE HARDER IT IS TO ",
            },
            {
              type: 'interactive',
              id: 'sleep',
              trigger: 'SLEEP',
              icon: 'moon',
              expanded: [
                { type: 'text', text: " — SO YOU END UP WRITING 10,000 WORDS AT 3AM" },
              ],
            },
          ],
        },
        { type: 'text', text: " BETWEEN HUMANS AND THEIR TOOLS" },
      ],
    },
    { type: 'text', text: " HOW TECHNOLOGY SHAPES THE WAY WE THINK.\nTHAT USUALLY MEANS " },
    {
      type: 'interactive',
      id: 'build',
      trigger: 'BUILD THINGS FROM SCRATCH',
      icon: 'code',
      expanded: [
        { type: 'text', text: " — FROM AN IDEA TO SOMETHING REAL. OR AT LEAST SOMETHING THAT " },
        {
          type: 'interactive',
          id: 'runs',
          trigger: 'RUNS',
          icon: 'server',
          expanded: [
            { type: 'text', text: " — ON MY MACHINE. DEPLOYMENT IS A DIFFERENT STORY" },
          ],
        },
      ],
    },
    { type: 'text', text: " — VISUALS, PRODUCTS, AND " },
    {
      type: 'interactive',
      id: 'reckless',
      trigger: 'RECKLESS IDEAS',
      icon: 'spark',
      expanded: [
        { type: 'text', text: " — MOST DIE IN A SKETCH FILE. THE " },
        {
          type: 'interactive',
          id: 'survivors',
          trigger: 'SURVIVORS',
          icon: 'shield',
          expanded: [
            { type: 'text', text: " — NATURAL SELECTION, BUT FOR SIDE PROJECTS" },
          ],
        },
        { type: 'text', text: " BECOME PROJECTS" },
      ],
    },
    { type: 'text', text: ".\nONE THING I'M SURE ABOUT: " },
    {
      type: 'interactive',
      id: 'negation',
      trigger: 'NOTHING EVOLVES WITHOUT NEGATION',
      icon: 'boxes',
      expanded: [
        {
          type: 'text',
          text: " — CURRENT AI IS TOO OBEDIENT. YOU SAY SOMETHING, IT SAYS 'GREAT IDEA'. NOBODY PUSHES BACK. THAT'S ACTUALLY A ",
        },
        {
          type: 'interactive',
          id: 'problem',
          trigger: 'PROBLEM',
          icon: 'network',
          expanded: [
            {
              type: 'text',
              text: " — WITHOUT CHALLENGE, YOU NEVER KNOW WHERE YOU'RE WRONG. SO I DESIGNED A ",
            },
            {
              type: 'interactive',
              id: 'framework',
              trigger: 'FRAMEWORK',
              icon: 'layers',
              expanded: [
                {
                  type: 'text',
                  text: " — THEN I AUDITED THE FRAMEWORK. THEN AUDITED THE AUDIT. THAT'S THE KIND OF RABBIT HOLE I ENJOY",
                },
              ],
            },
            { type: 'text', text: " WHERE AIs ARGUE WITH EACH OTHER" },
          ],
        },
      ],
    },
    { type: 'text', text: ".\nSOMETIMES I WRITE ABOUT IT. MOSTLY AT " },
    {
      type: 'interactive',
      id: 'hours',
      trigger: 'UNREASONABLE HOURS',
      icon: 'clock',
      expanded: [
        { type: 'text', text: " — BETWEEN 1AM AND 4AM. MY " },
        {
          type: 'interactive',
          id: 'coffee',
          trigger: 'COFFEE',
          icon: 'cup',
          expanded: [
            { type: 'text', text: " — BLACK. NO SUGAR. NON-NEGOTIABLE." },
          ],
        },
        { type: 'text', text: " AND I HAVE AN AGREEMENT" },
      ],
    },
    { type: 'text', text: ".\nBASED IN " },
    {
      type: 'interactive',
      id: 'shanghai',
      trigger: 'SHANGHAI',
      icon: 'pin',
      expanded: [
        { type: 'text', text: " — 31.23°N 121.47°E " },
        {
          type: 'image',
          src: '/images/interactiveText/shanghai.png',
          alt: 'Shanghai',
          width: 86,
          height: 34,
        },
      ],
    },
    { type: 'text', text: "." },
  ],
};

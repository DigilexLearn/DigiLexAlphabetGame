// Keep everything text-only to avoid image path errors.
const TrigraphData = [
  // Consonant trigraphs
  {
    id: 'sch',
    title: 'sch',
    type: 'consonant',
    levelName: 'beginner',
    intro: 'sch makes /sk/ or /ʃ/ in some words.',
    words: ['school', 'scholar', 'scheme', 'schedule'],
  },
  {
    id: 'thr',
    title: 'thr',
    type: 'consonant',
    levelName: 'beginner',
    intro: 'thr as in three or throw.',
    words: ['three', 'throw', 'thrive', 'throat'],
  },
  {
    id: 'str',
    title: 'str',
    type: 'consonant',
    levelName: 'intermediate',
    intro: 'str as in street or strong.',
    words: ['street', 'strong', 'string', 'stripe'],
  },
  {
    id: 'spl',
    title: 'spl',
    type: 'consonant',
    levelName: 'intermediate',
    intro: 'spl as in splash.',
    words: ['splash', 'splendid', 'spleen', 'splice'],
  },
  {
    id: 'spr',
    title: 'spr',
    type: 'consonant',
    levelName: 'intermediate',
    intro: 'spr as in spring.',
    words: ['spring', 'spray', 'sprout', 'sprinkle'],
  },

  // Vowel trigraphs (examples; adjust per your curriculum)
  {
    id: 'igh',
    title: 'igh',
    type: 'vowel',
    levelName: 'beginner',
    intro: 'igh makes a long /ī/ as in light.',
    words: ['light', 'night', 'bright', 'sight'],
  },
  {
    id: 'eau',
    title: 'eau',
    type: 'vowel',
    levelName: 'intermediate',
    intro: 'eau makes /ō/ as in beau (loan words).',
    words: ['beauty', 'bureau', 'plateau', 'chateau'],
  },
  {
    id: 'aoi',
    title: 'aoi',
    type: 'vowel',
    levelName: 'pro',
    intro: 'aoi occurs in some names/loan words.',
    words: ['chaotic', 'aortic', 'Naoise', 'Maoist'],
  },
];

export default TrigraphData;

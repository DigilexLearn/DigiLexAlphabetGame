// data/TrigraphData.js
const TrigraphData = [
  {
    id: 'igh',
    title: 'igh',
    levelName: 'Beginner',
    intro: 'igh says long /i/ as in light.',
    words: [
      { text: 'light', tokens: ['l','igh','t'] },
      { text: 'night', tokens: ['n','igh','t'] },
      { text: 'sight', tokens: ['s','igh','t'] },
    ],
  },
  {
    id: 'tch',
    title: 'tch',
    levelName: 'Intermediate',
    intro: 'tch says /ch/ as in match.',
    words: [
      { text: 'match', tokens: ['ma','tch'] },
      { text: 'catch', tokens: ['ca','tch'] },
      { text: 'witch', tokens: ['wi','tch'] },
    ],
  },
  {
    id: 'ear',
    title: 'ear',
    levelName: 'Advanced',
    intro: 'ear can say /ear/ as in hear.',
    words: [
      { text: 'hear', tokens: ['h','ear'] },
      { text: 'near', tokens: ['n','ear'] },
      { text: 'fear', tokens: ['f','ear'] },
    ],
  },
];

export default TrigraphData;

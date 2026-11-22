export type Bilingual = { en: string; ar: string };

export type QuizQuestion = {
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  title: Bilingual;
  questions: QuizQuestion[];
};

export const topics: Bilingual[] = [
  { en: "Present", ar: "الحاضر" },
  { en: "Past", ar: "الماضي" },
  { en: "Future", ar: "المستقبل" },
  { en: "Sentence Types", ar: "أنواع الجمل" },
];

export const tenseLessons = [
  {
    id: "present",
    number: "01",
    title: "Present Simple",
    arabicTitle: "المضارع البسيط",
    accent: "rose",
    meaning: [
      { en: "Habit: actions we do regularly, every day.", ar: "عادة يومية: أفعال نفعلها بانتظام كل يوم." },
      { en: "Fact: general truths or facts.", ar: "حقيقة: حقائق عامة أو ثابتة." },
    ],
    forms: [
      { label: "Singular · He, She, It", arLabel: "مفرد · هو، هي، هو لغير العاقل", formula: "He / She / It + verb + s", example: { en: "She works.", ar: "هي تعمل." }, note: { en: "Add -s to the verb.", ar: "نضيف s إلى الفعل." } },
      { label: "Plural · I, You, We, They", arLabel: "جمع · أنا، أنت، نحن، هم", formula: "I / You / We / They + base verb", example: { en: "They work.", ar: "هم يعملون." }, note: { en: "Use the base verb—no -s.", ar: "نستخدم الفعل الأساسي دون s." } },
    ],
    keywords: [
      { en: "Always", ar: "دائماً" }, { en: "Usually", ar: "عادةً" }, { en: "Often", ar: "غالباً" }, { en: "Every day", ar: "كل يوم" },
    ],
    examples: [
      { en: "The company always provides financial services.", ar: "الشركة دائماً تقدم خدمات مالية." },
      { en: "He checks his emails every day.", ar: "هو يتحقق من بريده الإلكتروني كل يوم." },
      { en: "They work in the bank.", ar: "هم يعملون في البنك." },
      { en: "She speaks English.", ar: "هي تتحدث الإنجليزية." },
    ],
    tip: { en: "We use Present Simple for routines, habits, and facts that are always true.", ar: "نستخدم المضارع البسيط للعادات والروتين والحقائق الثابتة." },
    rule: "One small -s changes the subject.",
  },
  {
    id: "past",
    number: "02",
    title: "Past Simple",
    arabicTitle: "الماضي البسيط",
    accent: "violet",
    meaning: [
      { en: "A finished action: it started and ended in the past.", ar: "فعل انتهى: حدث واكتمل في الماضي." },
    ],
    forms: [
      { label: "Regular verbs", arLabel: "الأفعال المنتظمة", formula: "Subject + verb + ed", example: { en: "They worked.", ar: "هم عملوا." }, note: { en: "The same rule for every subject; no -s is added.", ar: "القاعدة نفسها مع جميع الضمائر، ولا نضيف s للفعل." } },
      { label: "Irregular verbs", arLabel: "الأفعال الشاذة", formula: "Some verbs change form", example: { en: "He sent the report.", ar: "هو أرسل التقرير." }, note: { en: "Learn each irregular form.", ar: "نتعلم صيغة كل فعل شاذ." } },
    ],
    keywords: [
      { en: "Yesterday", ar: "يوم أمس" }, { en: "Last week / year", ar: "الأسبوع / العام الماضي" }, { en: "Ago", ar: "منذ / قبل" },
    ],
    examples: [
      { en: "The company launched a new product last year.", ar: "أطلقت الشركة منتجاً جديداً في العام الماضي." },
      { en: "He sent the report last night.", ar: "أرسل التقرير ليلة أمس." },
    ],
    irregulars: [
      { en: "send → sent", ar: "أرسل" }, { en: "do → did", ar: "فعل" }, { en: "go → went", ar: "ذهب" },
    ],
    tip: { en: "Use Past Simple for actions completed at a specific time in the past: yesterday, last week, last year, or an hour ago.", ar: "يُستخدم الماضي البسيط للأفعال التي انتهت في وقت محدد: أمس، الأسبوع الماضي، العام الماضي، أو منذ ساعة." },
    rule: "Finished then. No -s for any subject.",
  },
  {
    id: "future",
    number: "03",
    title: "Future Simple",
    arabicTitle: "المستقبل البسيط",
    accent: "pink",
    meaning: [
      { en: "Will happen later: an action or event that will occur in the future.", ar: "سيحدث لاحقاً: فعل أو حدث سيقع في المستقبل." },
    ],
    forms: [
      { label: "Every subject", arLabel: "مع جميع الضمائر", formula: "Subject + will + base verb", example: { en: "She will work.", ar: "هي سوف تعمل." }, note: { en: "No -s and no -ed after will.", ar: "يبقى الفعل بصيغته الأساسية، دون s أو ed." } },
      { label: "All pronouns", arLabel: "كل الضمائر", formula: "I / You / He / She / It / We / They + will", example: { en: "They will work.", ar: "هم سوف يعملون." }, note: { en: "Will stays the same for everyone.", ar: "تبقى will كما هي مع الجميع." } },
    ],
    keywords: [
      { en: "Tomorrow", ar: "غداً" }, { en: "Next year", ar: "السنة القادمة" }, { en: "Soon", ar: "قريباً / عما قريب" },
    ],
    examples: [
      { en: "The company will expand its operations next year.", ar: "الشركة ستوسّع عملياتها السنة القادمة." },
      { en: "I will work in a bank.", ar: "سأعمل في بنك." },
      { en: "She will meet the manager tomorrow.", ar: "هي ستقابل المدير غداً." },
      { en: "We will open a new branch soon.", ar: "سنفتح فرعاً جديداً قريباً." },
    ],
    tip: { en: "Use will for all subjects: I / You / He / She / It / We / They + will + verb.", ar: "استخدم will مع جميع الضمائر: أنا، أنت، هو، هي، نحن، هم + will + الفعل." },
    rule: "Will + base verb. Nothing added.",
  },
] as const;

export const tenseQuizzes: Quiz[] = [
  {
    id: "present-quiz",
    title: { en: "Present Simple", ar: "المضارع البسيط" },
    questions: [
      { prompt: "She _____ English.", choices: ["Speak", "Speaks", "Speaking", "Spoke"], answer: 1, explanation: "With she, add -s: “She speaks.”" },
      { prompt: "They _____ in the bank.", choices: ["Works", "Work", "Worked", "Working"], answer: 1, explanation: "They takes the base verb: “They work.”" },
      { prompt: "Which is a Present Simple keyword?", choices: ["Tomorrow", "Yesterday", "Always", "Soon"], answer: 2, explanation: "Always signals a repeated habit or regular truth." },
      { prompt: "He _____ his emails every day.", choices: ["Check", "Checks", "Checked", "Will check"], answer: 1, explanation: "With he, add -s: “He checks.”" },
      { prompt: "Choose the correct sentence.", choices: ["She work hard.", "She works hard.", "She worked hard.", "She will work hard."], answer: 1, explanation: "The present simple form with she is “works.”" },
    ],
  },
  {
    id: "past-quiz",
    title: { en: "Past Simple", ar: "الماضي البسيط" },
    questions: [
      { prompt: "The company _____ a new product last year.", choices: ["Launch", "Launches", "Launched", "Will launch"], answer: 2, explanation: "“Last year” marks a completed past action: launched." },
      { prompt: "He _____ the report last night.", choices: ["Send", "Sent", "Sends", "Will send"], answer: 1, explanation: "Send is irregular: send → sent." },
      { prompt: "Which is a Past Simple keyword?", choices: ["Yesterday", "Always", "Tomorrow", "Soon"], answer: 0, explanation: "Yesterday places the action in the past." },
      { prompt: "They _____ to school yesterday.", choices: ["Go", "Goes", "Went", "Will go"], answer: 2, explanation: "Go is irregular: go → went." },
      { prompt: "Choose the correct sentence.", choices: ["He worked yesterday.", "He works yesterday.", "He working yesterday.", "He will work yesterday."], answer: 0, explanation: "A completed action yesterday uses the past form worked." },
    ],
  },
  {
    id: "future-quiz",
    title: { en: "Future Simple", ar: "المستقبل البسيط" },
    questions: [
      { prompt: "I _____ work in a bank.", choices: ["Will", "Works", "Worked", "Working"], answer: 0, explanation: "Future Simple uses will + the base verb." },
      { prompt: "She _____ meet the manager tomorrow.", choices: ["Will meets", "Will met", "Will", "Will meeting"], answer: 2, explanation: "Use will followed by the base verb: “will meet.”" },
      { prompt: "Which is a Future Simple keyword?", choices: ["Yesterday", "Always", "Tomorrow", "Last year"], answer: 2, explanation: "Tomorrow points to the future." },
      { prompt: "We _____ open a new branch soon.", choices: ["Will", "Won’t", "Will be", "Will opening"], answer: 0, explanation: "The affirmative form is will + open." },
      { prompt: "Will you travel tomorrow?", choices: ["Yes, I will.", "Yes, I won’t.", "Yes, I travel.", "Yes, I work."], answer: 0, explanation: "A positive short answer repeats will: “Yes, I will.”" },
    ],
  },
];

export const sentenceTypes = [
  {
    number: "01", id: "simple-sentence", title: "Simple", arabicTitle: "جملة بسيطة", kind: "One independent clause",
    definition: { en: "One independent clause. No connector joins it to another clause.", ar: "جملة مستقلة واحدة مكتملة، بلا رابط يصلها بجملة أخرى." },
    connectors: "One complete thought",
    examples: [
      { en: "The company increased sales.", ar: "الشركة زادت المبيعات." },
      { en: "I drink water every morning.", ar: "أشرب الماء كل صباح." },
      { en: "She reads a book before bed.", ar: "هي تقرأ كتاباً قبل النوم." },
    ],
  },
  {
    number: "02", id: "compound-sentence", title: "Compound", arabicTitle: "جملة مركبة", kind: "Two independent clauses",
    definition: { en: "Two independent clauses joined by a connector like and, but, or.", ar: "جملتان مستقلتان مربوطتان برابط مثل and أو but أو or." },
    connectors: "and · but · or",
    examples: [
      { en: "The company increased sales and it opened a new branch.", ar: "الشركة زادت المبيعات وفتحت فرعاً جديداً." },
      { en: "I was hungry, but I finished my homework.", ar: "كنت جائعاً، لكنني أنهيت واجبي." },
      { en: "She likes tea, or she prefers coffee.", ar: "هي تحب الشاي، أو تفضل القهوة." },
    ],
  },
  {
    number: "03", id: "complex-sentence", title: "Complex", arabicTitle: "جملة معقدة", kind: "Independent + dependent",
    definition: { en: "One independent clause and one dependent clause, using because, although, before, when, or if.", ar: "جملة مستقلة وجملة تابعة باستخدام because أو although أو before أو when أو if." },
    connectors: "because · although · before · when · if",
    examples: [
      { en: "The company increased sales because it improved marketing.", ar: "الشركة زادت المبيعات لأنها حسّنت التسويق." },
      { en: "I stayed home because it was raining.", ar: "بقيت في البيت لأن الجو كان ماطراً." },
      { en: "She will study before she goes to bed.", ar: "ستدرس قبل أن تذهب إلى النوم." },
    ],
  },
  {
    number: "04", id: "compound-complex-sentence", title: "Compound–Complex", arabicTitle: "جملة مركبة معقدة", kind: "Two independent + one dependent",
    definition: { en: "Two independent clauses plus one dependent clause. It uses a dependent connector and and, but, or.", ar: "جملتان مستقلتان بالإضافة إلى جملة تابعة؛ تستخدم رابطاً تابعاً وand أو but أو or." },
    connectors: "because / although / when + and / but / or",
    examples: [
      { en: "Although the market was competitive, the company increased sales and it opened a branch.", ar: "على الرغم من أن السوق كان تنافسياً، زادت الشركة المبيعات وافتتحت فرعاً." },
      { en: "Although I was late, I caught the bus and I arrived on time.", ar: "على الرغم من أنني تأخرت، لحقت بالحافلة ووصلت في الوقت." },
      { en: "When the rain stopped, the kids played outside and they laughed happily.", ar: "عندما توقف المطر، لعب الأطفال بالخارج وضحكوا بسعادة." },
    ],
  },
];

export const sentenceTip: Bilingual = {
  en: "Simple = one idea. Compound = two ideas joined by and / but / or. Complex = an idea + a reason, time, or contrast. Compound–Complex = both. Look for the connectors!",
  ar: "بسيطة = فكرة واحدة. مركبة = فكرتان بـ and / but / or. معقدة = فكرة + سبب أو وقت أو مقارنة. مركبة معقدة = الاثنان معاً. ابحث عن الروابط!",
};

export const sentenceQuiz: Quiz = {
  id: "sentence-quiz",
  title: { en: "Types of Sentences", ar: "أنواع الجمل" },
  questions: [
    { prompt: "“I drink water every morning.” What type?", choices: ["Simple", "Compound", "Complex", "Compound-Complex"], answer: 0, explanation: "It is one independent clause with one complete thought." },
    { prompt: "“The company increased sales and it opened a new branch.” What type?", choices: ["Simple", "Compound", "Complex", "None"], answer: 1, explanation: "Two independent clauses are joined by and." },
    { prompt: "Which connectors can join clauses in a compound sentence?", choices: ["Because", "And / But / Or", "When", "Although"], answer: 1, explanation: "And, but, and or can join two independent clauses." },
    { prompt: "“I stayed home because it was raining.” What type?", choices: ["Simple", "Compound", "Complex", "None"], answer: 2, explanation: "Because it was raining is dependent; I stayed home is independent." },
    { prompt: "“Although the market was competitive, the company increased sales and opened a branch.” What type?", choices: ["Simple", "Compound", "Complex", "Compound-Complex"], answer: 2, explanation: "Technically, this has one dependent clause and one independent clause with a compound predicate, so it is complex. A compound-complex sentence needs two independent clauses." },
  ],
};

export const recap = {
  tenses: [
    { title: "Present Simple", arabic: "المضارع البسيط", en: "He works · They work", ar: "هو يعمل · هم يعملون", rule: "Add -s only with he / she / it." },
    { title: "Past Simple", arabic: "الماضي البسيط", en: "He worked · They worked", ar: "هو عمل · هم عملوا", rule: "A finished action; the same rule for each subject." },
    { title: "Future Simple", arabic: "المستقبل البسيط", en: "He will work · They will work", ar: "هو سوف يعمل · هم سوف يعملون", rule: "Will + base verb." },
  ],
  structures: [
    { title: "Simple", connector: "No connector", example: "He works hard.", ar: "هو يعمل بجد." },
    { title: "Compound", connector: "and", example: "He works hard and he is kind.", ar: "هو يعمل بجد وهو لطيف." },
    { title: "Complex", connector: "because", example: "He works hard because he likes it.", ar: "هو يعمل بجد لأنه يحبه." },
    { title: "Compound–Complex", connector: "and + because", example: "He works hard and he is happy because he loves it.", ar: "هو يعمل بجد وهو سعيد لأنه يحبه." },
  ],
  truths: [
    { en: "The company provides financial services every year.", ar: "الشركة تقدم خدمات مالية كل عام.", answer: true },
    { en: "The company launches a new product last year.", ar: "الشركة تطلق منتجاً جديداً العام الماضي.", answer: false },
    { en: "The company will expand next year.", ar: "الشركة ستتوسع العام القادم.", answer: true },
  ],
  finalRule: { en: "Remember: use -s only with he / she / it in Present Simple!", ar: "تذكر: نستخدم s فقط مع he / she / it في المضارع البسيط!" },
};

export const presenters = [
  { number: "01", name: "George Magdy", role: "Introduction, Conclusion, and Final Summary of the Presentation" },
  { number: "02", name: "Ahmed Fayez", role: "Present Simple" },
  { number: "03", name: "Mahmoud Abdelrahman", role: "Past Simple" },
  { number: "04", name: "Hamed Mohamed", role: "Future Simple" },
  { number: "05", name: "Ahmed Osama", role: "Types of Sentences" },
  { number: "06", name: "Ahmed Gamal", role: "Prompt Engineer, Website, CSS, Animation, Slides" },
];

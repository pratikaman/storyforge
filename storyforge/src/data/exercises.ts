export interface Exercise {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  techniqueCategory: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prompt: string;
  tips: string[];
  estimatedTime: string;
  wordCountGuide: { min: number; max: number };
}

export const exercises: Exercise[] = [
  {
    id: "ex-three-act",
    title: "The Three-Act Story",
    description: "Write a complete short story following the classic three-act structure.",
    moduleId: "story-spine",
    techniqueCategory: "Structure",
    difficulty: "beginner",
    prompt: "Write a short story (300-500 words) about a character who discovers something unexpected in their everyday routine. Structure it clearly into Setup (introduce character and world), Confrontation (the discovery creates a problem), and Resolution (how they deal with it).",
    tips: [
      "Spend roughly 25% on setup, 50% on confrontation, 25% on resolution",
      "Make sure your character changes between the beginning and end",
      "The discovery should challenge something your character believes",
    ],
    estimatedTime: "20-30 minutes",
    wordCountGuide: { min: 300, max: 500 },
  },
  {
    id: "ex-hero-journey",
    title: "The Hero's Call",
    description: "Write the 'Call to Adventure' and 'Refusal of the Call' stages.",
    moduleId: "story-spine",
    techniqueCategory: "Structure",
    difficulty: "intermediate",
    prompt: "Write a scene (300-500 words) where an ordinary person receives an extraordinary call to adventure. Show them initially refusing — what are they afraid of losing? What comfort zone are they clinging to? Then hint at what might pull them forward anyway.",
    tips: [
      "Ground the character in their 'ordinary world' first",
      "The refusal should feel genuine, not token",
      "Use specific sensory details to make the call feel real",
    ],
    estimatedTime: "25-35 minutes",
    wordCountGuide: { min: 300, max: 500 },
  },
  {
    id: "ex-character-intro",
    title: "Character in a Sentence",
    description: "Craft vivid character introductions that reveal personality through action.",
    moduleId: "character-craft",
    techniqueCategory: "Character",
    difficulty: "beginner",
    prompt: "Write 5 character introductions (2-3 sentences each). Each introduction should reveal the character's personality, status, and at least one flaw — entirely through action and specific detail, not adjectives. Think about what they do, how they move, what they notice.",
    tips: [
      "Avoid telling us someone is 'kind' or 'nervous' — show it through behavior",
      "Use specific objects and actions as character shorthand",
      "What a character notices tells us who they are",
    ],
    estimatedTime: "15-20 minutes",
    wordCountGuide: { min: 200, max: 400 },
  },
  {
    id: "ex-character-arc",
    title: "The Transformation",
    description: "Write two scenes showing a character before and after a pivotal change.",
    moduleId: "character-craft",
    techniqueCategory: "Character",
    difficulty: "intermediate",
    prompt: "Write two short scenes (200-300 words each) featuring the same character. Scene 1: Show them in their 'before' state — how they see the world, how they interact with others. Scene 2: After a pivotal (unseen) event, show the same character changed. The reader should feel the transformation without you explaining it.",
    tips: [
      "Use parallel situations to highlight the change",
      "Small behavioral shifts are more powerful than dramatic personality overhauls",
      "Dialogue is a great way to reveal internal change",
    ],
    estimatedTime: "30-40 minutes",
    wordCountGuide: { min: 400, max: 600 },
  },
  {
    id: "ex-conflict-scene",
    title: "Escalating Conflict",
    description: "Write a scene where tension gradually escalates through dialogue and action.",
    moduleId: "conflict-tension",
    techniqueCategory: "Structure",
    difficulty: "intermediate",
    prompt: "Write a scene (300-500 words) between two characters who want incompatible things. Start the scene calm and gradually escalate the tension. The conflict can be a dinner conversation, a business meeting, or a casual encounter — but by the end, something should be at stake that wasn't at the beginning.",
    tips: [
      "Each exchange should raise the temperature slightly",
      "Use subtext — what's unsaid is often more powerful",
      "Physical actions and body language can mirror the emotional escalation",
    ],
    estimatedTime: "25-35 minutes",
    wordCountGuide: { min: 300, max: 500 },
  },
  {
    id: "ex-dramatic-irony",
    title: "The Audience Knows",
    description: "Write a scene using dramatic irony where the reader knows something the character doesn't.",
    moduleId: "conflict-tension",
    techniqueCategory: "Narrative",
    difficulty: "advanced",
    prompt: "Write a scene (300-500 words) where the reader knows something crucial that the main character doesn't. Perhaps they're walking into a trap, or praising someone who has betrayed them, or celebrating something that's about to be taken away. Build tension through the gap between what the character believes and what the reader knows.",
    tips: [
      "Establish the dramatic irony in the first few lines",
      "Have the character say or do things that take on double meaning",
      "The tension comes from the reader wanting to warn the character",
    ],
    estimatedTime: "25-35 minutes",
    wordCountGuide: { min: 300, max: 500 },
  },
  {
    id: "ex-subtext-dialogue",
    title: "What They Really Mean",
    description: "Write a dialogue scene where characters talk about one thing but mean another.",
    moduleId: "dialogue",
    techniqueCategory: "Language",
    difficulty: "intermediate",
    prompt: "Write a dialogue scene (300-400 words) between two people where the surface conversation (about something mundane like planning a trip, cooking dinner, or organizing a room) is actually about something much deeper — a breakup, a betrayal, a confession. The real subject should never be stated directly.",
    tips: [
      "Read it aloud — if the subtext is working, you'll feel the tension",
      "Use pauses, interrupted sentences, and topic changes",
      "The mundane details should metaphorically mirror the real subject",
    ],
    estimatedTime: "25-30 minutes",
    wordCountGuide: { min: 300, max: 400 },
  },
  {
    id: "ex-world-sensory",
    title: "The Five Senses World",
    description: "Build an immersive world using all five senses.",
    moduleId: "world-building",
    techniqueCategory: "Language",
    difficulty: "beginner",
    prompt: "Describe a setting (200-400 words) using all five senses. Choose one: a bustling night market, an abandoned library, a space station cafeteria, or a medieval forge. For each sense, find one specific, unexpected detail that makes the place feel lived-in and real. Avoid clichés.",
    tips: [
      "Start with the less obvious senses (taste, touch, smell) before sight",
      "Specific beats generic: 'the smell of burnt coffee and old paper' beats 'it smelled old'",
      "Include one detail that suggests the place's history or regular inhabitants",
    ],
    estimatedTime: "15-25 minutes",
    wordCountGuide: { min: 200, max: 400 },
  },
  {
    id: "ex-pacing",
    title: "Fast and Slow",
    description: "Write two versions of the same event — one fast-paced, one slow and contemplative.",
    moduleId: "pacing-structure",
    techniqueCategory: "Structure",
    difficulty: "intermediate",
    prompt: "Choose a dramatic event (a chase, a confrontation, a departure). Write it twice in 200-300 words each. Version 1: Breakneck pace — short sentences, action verbs, no pause for reflection. Version 2: Slow and contemplative — long sentences, internal thought, sensory detail, stretched time. Notice how the same events can feel completely different.",
    tips: [
      "In the fast version, cut every adjective that isn't essential",
      "In the slow version, let the character's mind wander between actions",
      "Sentence length is your primary tool for controlling pace",
    ],
    estimatedTime: "30-40 minutes",
    wordCountGuide: { min: 400, max: 600 },
  },
  {
    id: "ex-symbolism",
    title: "The Object That Means More",
    description: "Write a story where a single object carries symbolic weight.",
    moduleId: "theme-meaning",
    techniqueCategory: "Advanced",
    difficulty: "advanced",
    prompt: "Write a short story or scene (300-500 words) centered around a single physical object (a key, a photograph, a clock, a pair of shoes, etc.). The object should appear at least three times, and each time it should carry more symbolic meaning. By the end, the object should represent something the character has gained, lost, or understood.",
    tips: [
      "Don't explain the symbolism — let it emerge through context",
      "Each appearance of the object should shift its meaning slightly",
      "The character's relationship with the object should mirror their internal journey",
    ],
    estimatedTime: "25-35 minutes",
    wordCountGuide: { min: 300, max: 500 },
  },
  {
    id: "ex-unreliable-narrator",
    title: "Trust Issues",
    description: "Write from the perspective of a narrator the reader shouldn't fully trust.",
    moduleId: "narrative-voice",
    techniqueCategory: "Narrative",
    difficulty: "advanced",
    prompt: "Write a first-person scene (300-500 words) where the narrator describes an event from their past, but subtle clues suggest they're not telling the whole truth. Perhaps they skip over key details, contradict themselves slightly, or paint themselves too favorably. The reader should finish feeling that the real story is different from the one being told.",
    tips: [
      "Plant small inconsistencies that a careful reader would catch",
      "Have the narrator over-explain or over-justify something minor",
      "Use phrases like 'as far as I remember' or 'I'm sure it was' to create doubt",
    ],
    estimatedTime: "30-40 minutes",
    wordCountGuide: { min: 300, max: 500 },
  },
  {
    id: "ex-voice-style",
    title: "Three Voices, One Scene",
    description: "Write the same scene in three different narrative voices.",
    moduleId: "narrative-voice",
    techniqueCategory: "Narrative",
    difficulty: "advanced",
    prompt: "Choose a simple scene: someone enters a café and orders coffee. Write it three times (100-150 words each): 1) In a clipped, noir detective voice. 2) In a warm, lyrical literary voice. 3) In a frantic, stream-of-consciousness voice. Each version should convey a different mood and character through voice alone.",
    tips: [
      "Read each version aloud — they should sound completely different",
      "Voice is about word choice, sentence rhythm, and what gets noticed",
      "Each voice should reveal a different personality behind the narrator",
    ],
    estimatedTime: "25-35 minutes",
    wordCountGuide: { min: 300, max: 450 },
  },
];

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((e) => e.id === id);
}

export function getExercisesByModule(moduleId: string): Exercise[] {
  return exercises.filter((e) => e.moduleId === moduleId);
}

export function getExercisesByDifficulty(
  difficulty: Exercise["difficulty"]
): Exercise[] {
  return exercises.filter((e) => e.difficulty === difficulty);
}

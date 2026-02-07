export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Example {
  title: string;
  source: string;
  text: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  examples: Example[];
  quiz: QuizQuestion[];
  writingPrompt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: "story-spine",
    title: "The Story Spine",
    description: "Learn the fundamental frameworks that underpin every great story, from the classic three-act structure to the hero's journey.",
    icon: "📖",
    color: "from-blue-400 to-indigo-600",
    order: 1,
    lessons: [
      {
        id: "three-act-structure",
        moduleId: "story-spine",
        title: "The Three-Act Structure",
        description: "The foundation of Western storytelling — setup, confrontation, and resolution.",
        content: `The three-act structure is the backbone of storytelling. Nearly every film, novel, and play you've experienced follows this pattern, whether the author planned it or not.

**Act I: Setup (roughly 25%)** introduces the characters, world, and the "normal" before everything changes. It ends with the *inciting incident* — the event that propels the protagonist into the story.

**Act II: Confrontation (roughly 50%)** is where the protagonist pursues their goal and faces escalating obstacles. The midpoint often features a major revelation or reversal. Act II ends with the "dark moment" — the lowest point before the climax.

**Act III: Resolution (roughly 25%)** contains the climax, where the central conflict reaches its peak, and the denouement, where loose threads are tied. The protagonist has changed — or the world has.

Understanding this structure doesn't mean your stories must be formulaic. Think of it as gravity: you can defy it, but first you need to understand how it works.`,
        examples: [
          {
            title: "Star Wars: A New Hope",
            source: "Film (1977)",
            text: "Act I: Luke Skywalker on Tatooine receives Leia's message (inciting incident). Act II: Luke trains with Obi-Wan, rescues Leia, faces escalating Imperial threats. The midpoint is the Death Star rescue. Act III: The trench run climax where Luke destroys the Death Star, completing his transformation from farm boy to hero.",
          },
          {
            title: "The Great Gatsby",
            source: "F. Scott Fitzgerald (1925)",
            text: "Act I: Nick moves to West Egg and meets the mysterious Gatsby. Act II: Gatsby's pursuit of Daisy escalates through lavish parties and a tense confrontation at the Plaza Hotel (midpoint reversal). Act III: The tragic climax with Myrtle's death and Gatsby's murder, followed by Nick's disillusioned departure.",
          },
        ],
        quiz: [
          {
            question: "What percentage of a story does Act II typically occupy?",
            options: ["25%", "33%", "50%", "75%"],
            correctIndex: 2,
            explanation: "Act II (Confrontation) typically takes up about 50% of the story, making it the longest act where the protagonist faces escalating challenges.",
          },
          {
            question: "What is the 'inciting incident'?",
            options: [
              "The climax of the story",
              "The event that propels the protagonist into the story",
              "The moment the hero refuses the call",
              "The resolution of the main conflict",
            ],
            correctIndex: 1,
            explanation: "The inciting incident is the event at the end of Act I that disrupts the protagonist's normal world and launches them into the story's main conflict.",
          },
        ],
        writingPrompt: "Write a 300-word story using clear three-act structure. Mark each act transition with a line break. Focus on making the inciting incident feel both surprising and inevitable.",
      },
      {
        id: "heros-journey",
        moduleId: "story-spine",
        title: "The Hero's Journey",
        description: "Joseph Campbell's mythic structure that resonates across cultures and centuries.",
        content: `Joseph Campbell's "monomyth," outlined in *The Hero with a Thousand Faces* (1949), describes a universal story pattern found across mythologies worldwide. While the full journey has 17 stages, most storytellers focus on the essential beats.

**The Ordinary World** establishes who the hero is before the adventure. **The Call to Adventure** disrupts their routine. **Refusal of the Call** shows their hesitation. **Meeting the Mentor** provides guidance. **Crossing the Threshold** marks the point of no return.

**Tests, Allies, and Enemies** fill the middle journey. **The Ordeal** is the hero's greatest challenge — often a symbolic death and rebirth. **The Reward** follows victory. **The Road Back** presents new complications. **The Resurrection** is the final test. **Return with the Elixir** completes the circle.

The hero's journey isn't a rigid formula — it's a map of emotional transformation. Your hero doesn't need to visit every stage, but understanding the pattern helps you create stories that feel mythically resonant.`,
        examples: [
          {
            title: "The Lord of the Rings",
            source: "J.R.R. Tolkien (1954)",
            text: "Frodo's journey maps perfectly: the Shire (Ordinary World), Gandalf's request (Call), Frodo's reluctance (Refusal), Gandalf as Mentor, leaving the Shire (Threshold), the Fellowship (Allies), Mount Doom (Ordeal), destroying the Ring (Reward), the Scouring of the Shire (Road Back), and returning to the Shire transformed (Elixir).",
          },
          {
            title: "The Matrix",
            source: "Film (1999)",
            text: "Neo follows the hero's journey: his cubicle life (Ordinary World), Morpheus's red pill offer (Call), Neo's initial doubt (Refusal), Morpheus as Mentor, entering the Matrix (Threshold), training and the Oracle (Tests), his death and resurrection fighting Agent Smith (Ordeal/Resurrection), and becoming 'The One' (Elixir).",
          },
        ],
        quiz: [
          {
            question: "Who developed the concept of the Hero's Journey?",
            options: ["Robert McKee", "Joseph Campbell", "Aristotle", "Christopher Vogler"],
            correctIndex: 1,
            explanation: "Joseph Campbell outlined the monomyth in 'The Hero with a Thousand Faces' (1949), identifying the universal story pattern across world mythologies.",
          },
          {
            question: "What does 'Crossing the Threshold' represent?",
            options: [
              "The hero's lowest point",
              "The final battle",
              "The point of no return into the adventure",
              "Meeting the mentor",
            ],
            correctIndex: 2,
            explanation: "Crossing the Threshold is when the hero commits to the adventure and enters the 'special world,' marking the point of no return from their ordinary life.",
          },
        ],
        writingPrompt: "Write a scene showing the 'Call to Adventure' and 'Refusal of the Call' for a modern-day character. What are they afraid of losing? What might pull them forward?",
      },
      {
        id: "story-beats",
        moduleId: "story-spine",
        title: "Story Beats",
        description: "The rhythmic turning points that keep audiences engaged from beginning to end.",
        content: `Story beats are the individual moments of change that propel your narrative forward. Every scene should contain at least one beat — a shift in emotion, information, or power dynamics.

**A beat is a moment where something changes.** A character learns something new. Power shifts from one person to another. An emotion transforms — hope becomes fear, love becomes suspicion, confidence becomes doubt.

Blake Snyder's "Save the Cat" beat sheet is a popular framework: Opening Image, Theme Stated, Setup, Catalyst, Debate, Break into Two, B Story, Fun and Games, Midpoint, Bad Guys Close In, All Is Lost, Dark Night of the Soul, Break into Three, Finale, Final Image.

The key insight: **beats create rhythm**. Too many beats in quick succession feel frantic. Too few feel sluggish. Great storytellers vary their beat frequency — fast during action, slow during reflection — creating a pulse that mirrors the emotional experience they want the audience to feel.

Think of beats like a heartbeat monitor. Flatline means death (of interest). But constant spikes are equally exhausting. The art is in the variation.`,
        examples: [
          {
            title: "Breaking Bad — Pilot",
            source: "TV Series (2008)",
            text: "The pilot is a masterclass in beats: Walter's 50th birthday (setup), the cancer diagnosis (catalyst), riding along with Hank (debate), witnessing the meth bust (midpoint), cooking with Jesse (break into two). Each beat irrevocably changes Walter's trajectory, and no scene exists without a clear shift.",
          },
          {
            title: "Jaws",
            source: "Film (1975)",
            text: "Spielberg's beat structure builds perfectly: the opening attack (catalyst), Brody's growing fear, the beach panic (midpoint), Quint's USS Indianapolis monologue (dark night of the soul), and the explosive climax. Each beat raises the stakes while alternating between fast-paced tension and slow character moments.",
          },
        ],
        quiz: [
          {
            question: "What is a 'story beat'?",
            options: [
              "A chapter break",
              "A moment where something changes in the story",
              "A type of musical scoring",
              "The pace of dialogue",
            ],
            correctIndex: 1,
            explanation: "A story beat is a moment of change — in emotion, information, power dynamics, or character understanding. Each beat should shift something meaningful.",
          },
          {
            question: "Why should beat frequency vary throughout a story?",
            options: [
              "To confuse the audience",
              "Because publishers require it",
              "To create rhythm that mirrors the desired emotional experience",
              "To make the story longer",
            ],
            correctIndex: 2,
            explanation: "Varying beat frequency creates natural rhythm — fast during action, slow during reflection — keeping the audience engaged without exhausting them.",
          },
        ],
        writingPrompt: "Write a short scene with exactly 5 beats. Before each beat, write a one-line note identifying what changes. Focus on making each shift feel natural yet surprising.",
      },
      {
        id: "freytags-pyramid",
        moduleId: "story-spine",
        title: "Freytag's Pyramid",
        description: "The five-part dramatic structure that reveals the shape of rising and falling action.",
        content: `Gustav Freytag, a 19th-century German novelist, analyzed Greek and Shakespearean drama and identified a five-part structure that visually forms a pyramid (or inverted check mark).

**1. Exposition** — The starting situation. Characters, setting, and the status quo are established. The audience learns what "normal" looks like.

**2. Rising Action** — Complications begin. The conflict is introduced, stakes are raised, and tension builds through a series of escalating events. This is typically the longest section.

**3. Climax** — The turning point. The moment of greatest tension where the central conflict reaches its peak. Everything before leads to this; everything after flows from it.

**4. Falling Action** — The consequences of the climax unfold. Subplots are resolved. The tension decreases but the outcome remains uncertain.

**5. Denouement** — The resolution. A new normal is established. The story's themes are crystallized in the final moments.

Freytag's model is especially useful for understanding **tension as a shape**. By visualizing your story as a pyramid, you can identify where tension should be building and where it can release — and spot problems when your story feels flat.`,
        examples: [
          {
            title: "Romeo and Juliet",
            source: "William Shakespeare (1597)",
            text: "Exposition: The feuding families and the Capulet ball. Rising Action: The secret marriage, Tybalt's death, Romeo's banishment. Climax: Juliet takes the sleeping potion. Falling Action: Romeo finds Juliet 'dead' and takes poison. Denouement: Both families reconcile over the bodies of their children.",
          },
          {
            title: "The Shawshank Redemption",
            source: "Film (1994)",
            text: "Exposition: Andy's wrongful conviction and arrival at Shawshank. Rising Action: Andy earns respect, befriends Red, builds the library, faces the Warden's corruption. Climax: Andy's escape through the tunnel. Falling Action: The Warden's downfall. Denouement: Red's parole and reunion with Andy in Zihuatanejo.",
          },
        ],
        quiz: [
          {
            question: "In Freytag's Pyramid, what is the climax?",
            options: [
              "The opening scene",
              "The longest section of the story",
              "The moment of greatest tension and the story's turning point",
              "The final resolution",
            ],
            correctIndex: 2,
            explanation: "The climax is the peak of the pyramid — the moment of greatest tension where the central conflict reaches its highest point and the story's direction is decided.",
          },
          {
            question: "What follows the climax in Freytag's model?",
            options: [
              "Rising Action",
              "Exposition",
              "Falling Action",
              "A second climax",
            ],
            correctIndex: 2,
            explanation: "After the climax, the Falling Action shows the consequences unfolding, resolving subplots and decreasing tension before the final denouement.",
          },
        ],
        writingPrompt: "Draw Freytag's Pyramid on paper, then write a five-paragraph flash fiction where each paragraph corresponds to one stage. Label each section.",
      },
    ],
  },
  {
    id: "character-craft",
    title: "Character Craft",
    description: "Create characters that live and breathe on the page — from memorable introductions to transformative arcs.",
    icon: "👤",
    color: "from-emerald-400 to-teal-600",
    order: 2,
    lessons: [
      {
        id: "memorable-characters",
        moduleId: "character-craft",
        title: "Creating Memorable Characters",
        description: "How to craft characters that stay with readers long after the story ends.",
        content: `Memorable characters are not defined by their descriptions — they're defined by their **contradictions**, **desires**, and **specific behaviors**.

Consider what makes a character stick in memory. It's rarely their hair color or height. It's the **specific**: Sherlock Holmes's violin playing and cocaine habit, Atticus Finch's quiet moral courage, or Walter White's transformation from mild teacher to ruthless criminal.

Three pillars of memorable characters:

**1. Want vs. Need** — Your character wants something concrete (a promotion, a lover, revenge) but *needs* something deeper (self-acceptance, connection, forgiveness). The tension between want and need creates compelling drama.

**2. Contradiction** — The most interesting characters contain opposites: a hitman who loves gardening, a coward with moments of profound bravery, a generous person with a secret jealous streak. Contradiction makes characters feel human.

**3. Specificity** — Generic characters are forgettable. Specific ones are iconic. Don't write "she was nervous." Write "she arranged the sugar packets by color, then re-arranged them by size."`,
        examples: [
          {
            title: "Atticus Finch",
            source: "To Kill a Mockingbird — Harper Lee (1960)",
            text: "Atticus is memorable because of his contradiction: he's the gentlest person in Maycomb, yet he takes on the most confrontational case in town. His specificity shines through small actions — shooting the rabid dog (hidden competence), reading to his children nightly (consistent values), treating everyone with the same quiet respect.",
          },
          {
            title: "The Joker",
            source: "The Dark Knight — Film (2008)",
            text: "Heath Ledger's Joker is unforgettable because of specificity: the lip-licking, the changing origin stories, the way he claps in his cell. His contradiction — a man who claims to be an agent of chaos but plans everything meticulously — creates an endlessly fascinating character.",
          },
        ],
        quiz: [
          {
            question: "What creates the most compelling character drama?",
            options: [
              "Detailed physical descriptions",
              "The tension between what a character wants and what they need",
              "Having many supporting characters",
              "Making the character likeable",
            ],
            correctIndex: 1,
            explanation: "The tension between want (concrete external goal) and need (deeper internal truth) creates compelling drama because it forces the character to grow or face consequences.",
          },
          {
            question: "Why are contradictions important in character creation?",
            options: [
              "They make the plot more confusing",
              "They make characters feel human and interesting",
              "They are required by publishers",
              "They make dialogue easier to write",
            ],
            correctIndex: 1,
            explanation: "Real people contain contradictions, and characters with opposing traits feel more human, surprising, and memorable than one-dimensional archetypes.",
          },
        ],
        writingPrompt: "Create a character using all three pillars: give them a clear want vs. need, a meaningful contradiction, and three specific behavioral details that make them unique.",
      },
      {
        id: "character-arcs",
        moduleId: "character-craft",
        title: "Character Arcs",
        description: "How characters transform — or resist transformation — throughout a story.",
        content: `A character arc is the transformation a character undergoes from the beginning to the end of a story. There are three fundamental types:

**Positive Arc (Change Arc)**: The character starts with a flawed worldview, faces challenges that expose the flaw, and ultimately adopts a healthier perspective. This is the most common arc. Example: Ebenezer Scrooge moves from miserly isolation to joyful generosity.

**Negative Arc (Corruption/Fall)**: The character starts in a relatively good place and deteriorates. They may reject truth, embrace a lie, or surrender to their worst impulses. Example: Walter White transforms from a sympathetic teacher into a drug kingpin.

**Flat Arc (Steadfast)**: The character doesn't change — instead, they change the world around them. They hold a core truth and use it to transform others. Example: Paddington Bear's unwavering kindness transforms everyone he meets.

The key to any arc: **the character's belief must be tested**. In a positive arc, their false belief is challenged until they abandon it. In a negative arc, their true belief is eroded until they reject it. In a flat arc, others' false beliefs are challenged by the protagonist's truth.`,
        examples: [
          {
            title: "Elizabeth Bennet",
            source: "Pride and Prejudice — Jane Austen (1813)",
            text: "Elizabeth's positive arc is built on her false belief that her first impressions are always right (her 'prejudice'). Through encounters with Darcy, she gradually recognizes her own snap judgments are as flawed as the pride she criticizes in him. Her transformation is complete when she can laugh at her former blindness.",
          },
          {
            title: "Michael Corleone",
            source: "The Godfather — Film (1972)",
            text: "Michael's negative arc is one of cinema's most devastating. He begins as a war hero who rejects the family business ('That's my family, Kay. It's not me.'). Each moral compromise — killing Sollozzo, fleeing to Sicily, assuming power — erodes his original identity until he becomes the very thing he despised, closing the door on Kay and his former self.",
          },
        ],
        quiz: [
          {
            question: "In a flat character arc, what happens?",
            options: [
              "The character doesn't appear enough to change",
              "The character changes the world around them using their core truth",
              "The character refuses to learn anything",
              "The character has no personality",
            ],
            correctIndex: 1,
            explanation: "In a flat arc, the protagonist holds a core truth and remains steadfast, but uses that truth to transform the people and world around them.",
          },
          {
            question: "What drives a negative character arc?",
            options: [
              "The character becomes physically weaker",
              "The character's true beliefs are eroded until they embrace a lie",
              "The character loses their friends",
              "The writer runs out of positive ideas",
            ],
            correctIndex: 1,
            explanation: "A negative arc shows a character's original beliefs being progressively challenged and corrupted, leading them to reject truth and embrace a destructive worldview.",
          },
        ],
        writingPrompt: "Write two versions of the same character's arc: one positive, one negative. Same starting point, same inciting event, but different choices that lead to opposite outcomes.",
      },
      {
        id: "motivation-flaws",
        moduleId: "character-craft",
        title: "Motivation & Flaws",
        description: "The engine that drives characters forward and the cracks that make them human.",
        content: `Every character needs two things: a **motivation** (what drives them forward) and a **flaw** (what holds them back). The interplay between these creates the story's engine.

**Motivation** is the reason your character gets out of bed in the morning — and the reason they'll walk through fire later. Good motivations are:
- **Specific**: Not "she wants happiness" but "she wants to open a bookshop in Paris"
- **Urgent**: There's a reason they must act now, not later
- **Relatable**: Even villains need motivations the audience can understand

**Flaws** are not quirks like being clumsy or bad at cooking. True character flaws are **moral or psychological weaknesses** that cause real harm — to themselves or others:
- Pride that prevents asking for help
- Fear that paralyzes action
- Jealousy that poisons relationships
- Ambition that justifies cruelty

The best stories create situations where **the flaw directly blocks the motivation**. A character desperate for connection (motivation) who pushes everyone away (flaw) has a built-in story engine. The resolution comes when the character either overcomes the flaw or is destroyed by it.`,
        examples: [
          {
            title: "Jay Gatsby",
            source: "The Great Gatsby — F. Scott Fitzgerald (1925)",
            text: "Gatsby's motivation is specific and urgent: to recapture Daisy's love and the life she represents. His fatal flaw is his inability to accept that the past cannot be recreated. His motivation drives every lavish party; his flaw ensures none of them will ever be enough. The tragedy is that his flaw makes his motivation impossible.",
          },
          {
            title: "Captain Ahab",
            source: "Moby-Dick — Herman Melville (1851)",
            text: "Ahab's motivation (destroying the white whale) and flaw (obsessive monomania) are inseparable. His obsession gives him terrifying charisma — he can bend an entire crew to his will — but also blinds him to everything else: his crew's safety, his own survival, the impossibility of his quest. His flaw is his motivation.",
          },
        ],
        quiz: [
          {
            question: "What makes a truly effective character flaw?",
            options: [
              "Being clumsy or bad at cooking",
              "A moral or psychological weakness that causes real harm",
              "Having a physical limitation",
              "Being unpopular with other characters",
            ],
            correctIndex: 1,
            explanation: "True character flaws are moral or psychological weaknesses — like pride, fear, or jealousy — that cause genuine harm to the character or others, not just endearing quirks.",
          },
          {
            question: "The best stories create situations where...",
            options: [
              "The flaw is mentioned once then forgotten",
              "The character has no flaws",
              "The flaw directly blocks the character's motivation",
              "Multiple characters share the same flaw",
            ],
            correctIndex: 2,
            explanation: "When a character's flaw directly interferes with achieving their motivation, it creates a built-in story engine with natural tension and dramatic potential.",
          },
        ],
        writingPrompt: "Create a character whose deepest flaw is the flipside of their greatest strength. Show how the same trait both helps and hurts them in a short scene.",
      },
      {
        id: "ensemble-dynamics",
        moduleId: "character-craft",
        title: "Ensemble Dynamics",
        description: "How characters interact, contrast, and bring out the best (and worst) in each other.",
        content: `Great ensembles aren't just collections of interesting individuals — they're **systems** where each character serves a specific role in relation to the others.

**The Foil Principle**: Every major character should contrast with at least one other character in a meaningful way. Foils illuminate each other's qualities through their differences. Holmes and Watson. Legolas and Gimli. Elizabeth Bennet and her sister Jane.

**The Role Matrix**: In strong ensembles, characters fill complementary roles:
- The **Leader** (drives action)
- The **Heart** (emotional center)
- The **Brain** (provides solutions)
- The **Skeptic** (challenges the group)
- The **Wildcard** (creates unpredictability)

Not every ensemble needs all roles, but each character should have a **unique function** that would be missed if they were removed.

**Dynamic Relationships**: The best ensemble stories derive conflict not from external threats alone, but from the **friction between characters**. Different values, competing goals, and unresolved tensions within the group create drama that no villain could provide.`,
        examples: [
          {
            title: "The Fellowship of the Ring",
            source: "J.R.R. Tolkien (1954)",
            text: "Tolkien's ensemble is a masterclass in dynamics. Gandalf (leader/brain), Sam (heart), Aragorn (reluctant leader), Boromir (skeptic corrupted by temptation), Legolas/Gimli (foils bridging racial prejudice), Merry/Pippin (wildcards who grow into heroes). Each removal — Gandalf's fall, Boromir's death — fundamentally changes the group dynamic.",
          },
          {
            title: "The Breakfast Club",
            source: "Film (1985)",
            text: "Five high school stereotypes — the brain, athlete, basket case, princess, and criminal — are forced into proximity. The film works because each character serves as a foil to the others, and the conflicts arise from their competing worldviews. By the end, each has been changed by the ensemble, revealing the person behind the label.",
          },
        ],
        quiz: [
          {
            question: "What is a 'foil' character?",
            options: [
              "A character who wraps things up at the end",
              "A character who contrasts with another to highlight their qualities",
              "A character who is always wrong",
              "A minor background character",
            ],
            correctIndex: 1,
            explanation: "A foil is a character who contrasts with another character (usually the protagonist) in ways that highlight important qualities, themes, or traits in both.",
          },
          {
            question: "What should be true of every character in a strong ensemble?",
            options: [
              "They should all have the same goal",
              "They should each have a unique function that would be missed if removed",
              "They should all be likeable",
              "They should all be the same age",
            ],
            correctIndex: 1,
            explanation: "In strong ensembles, each character serves a unique function — remove any one, and the dynamics fundamentally change. This is the test of whether a character earns their place.",
          },
        ],
        writingPrompt: "Write a scene with four characters in a confined space (elevator, car, waiting room). Give each a distinct role and show how their dynamics create conflict without any external threat.",
      },
    ],
  },
  {
    id: "conflict-tension",
    title: "Conflict & Tension",
    description: "Master the art of making readers unable to put your story down through expertly crafted conflict and suspense.",
    icon: "⚔️",
    color: "from-red-400 to-rose-600",
    order: 3,
    lessons: [
      {
        id: "types-of-conflict",
        moduleId: "conflict-tension",
        title: "Types of Conflict",
        description: "The fundamental categories of conflict that power every story.",
        content: `Conflict is the engine of all storytelling. Without conflict, you have a situation, not a story. There are four fundamental types:

**Person vs. Person** — The most straightforward: two characters with opposing goals. Hero vs. villain, lover vs. rival, child vs. parent. The key is ensuring both sides have understandable motivations.

**Person vs. Self** — Internal conflict. A character battles their own fears, desires, addictions, or moral dilemmas. This is often the deepest, most resonant form of conflict because we all fight ourselves.

**Person vs. Society** — A character challenges the rules, norms, or injustices of their world. Dystopian fiction thrives here, but so do quieter stories about anyone who doesn't fit in.

**Person vs. Nature/Environment** — Survival stories, disaster narratives, and any tale where the antagonist is the world itself. The challenge: nature has no malice, so the real conflict often becomes person vs. self.

The best stories **layer multiple types**. In *The Hunger Games*, Katniss faces person vs. person (other tributes), person vs. society (the Capitol), person vs. self (her moral compromises), and person vs. nature (the arena) simultaneously.`,
        examples: [
          {
            title: "1984",
            source: "George Orwell (1949)",
            text: "Orwell layers all four conflict types: Winston vs. O'Brien (person vs. person), Winston vs. his own fear and desire to survive (person vs. self), Winston vs. the Party (person vs. society), and Winston vs. the oppressive physical environment of Airstrip One (person vs. environment). Each layer reinforces the others.",
          },
          {
            title: "Cast Away",
            source: "Film (2000)",
            text: "Primarily person vs. nature (surviving on a deserted island), but the deeper conflict is person vs. self — Chuck's battle against despair, his relationship with Wilson (a manifestation of his need for connection), and his struggle to find meaning. The external survival challenge mirrors the internal one.",
          },
        ],
        quiz: [
          {
            question: "Which type of conflict involves a character battling their own fears or moral dilemmas?",
            options: ["Person vs. Person", "Person vs. Self", "Person vs. Society", "Person vs. Nature"],
            correctIndex: 1,
            explanation: "Person vs. Self is internal conflict — a character's struggle against their own fears, desires, addictions, or moral choices.",
          },
          {
            question: "Why do the best stories layer multiple types of conflict?",
            options: [
              "To make the story longer",
              "Because single conflicts are boring and unrealistic",
              "Because each layer reinforces the others, creating richer drama",
              "Because publishers require at least three conflict types",
            ],
            correctIndex: 2,
            explanation: "Layering conflicts creates depth — each type reinforces and complicates the others, creating rich, multidimensional drama that mirrors the complexity of real life.",
          },
        ],
        writingPrompt: "Write a scene that contains at least three types of conflict simultaneously. The character should be fighting an external opponent, society's expectations, AND their own internal weakness.",
      },
      {
        id: "raising-stakes",
        moduleId: "conflict-tension",
        title: "Raising the Stakes",
        description: "How to make your audience care more and more as the story progresses.",
        content: `Stakes are what can be gained or lost. Without stakes, conflict is just noise. The art is in **escalation** — making the audience care more deeply as the story progresses.

**Three levels of stakes:**

**Personal Stakes** — What the protagonist personally stands to gain or lose. Their job, their relationship, their life. These are the most immediately engaging.

**Social Stakes** — What the people around the protagonist stand to gain or lose. Their family, their community, their team. These expand the circle of concern.

**Universal Stakes** — What the world stands to gain or lose. Existential threats, civilizational collapse, cosmic consequences. These provide epic scope.

The secret to raising stakes effectively: **start personal, go outward**. If we care about the character first, we'll care about the world through them. Starting with "the world will end!" is less effective than starting with "this person might lose their daughter."

**The Escalation Principle**: Each act should raise the stakes. What starts as personal becomes social, then universal. What starts as "I might lose my job" becomes "I might lose my family" becomes "everyone will suffer."`,
        examples: [
          {
            title: "The Dark Knight",
            source: "Film (2008)",
            text: "Nolan masterfully escalates stakes. Personal: Bruce's identity and relationships. Social: Gotham's citizens in danger, Harvey Dent's corruption. Universal: the Joker's philosophy threatens to prove that anyone can be corrupted. The ferry scene crystallizes all three levels — two boatloads of people choosing whether to kill each other represents Gotham's soul.",
          },
          {
            title: "Harry Potter series",
            source: "J.K. Rowling (1997-2007)",
            text: "Stakes escalate across seven books: personal (surviving school, making friends) → social (protecting Hogwarts, saving friends) → universal (defeating Voldemort, saving the wizarding world). Each book raises the stakes, with Harry's personal losses (Sirius, Dumbledore) making the universal threat feel intimate.",
          },
        ],
        quiz: [
          {
            question: "What is the most effective order for introducing stakes?",
            options: [
              "Universal → Social → Personal",
              "Personal → Social → Universal",
              "All at once",
              "It doesn't matter",
            ],
            correctIndex: 1,
            explanation: "Starting with personal stakes and escalating outward is most effective because the audience needs to care about the character before they'll care about the world.",
          },
          {
            question: "What are 'stakes' in storytelling?",
            options: [
              "The weapons characters use",
              "What can be gained or lost",
              "The setting of the story",
              "The number of characters involved",
            ],
            correctIndex: 1,
            explanation: "Stakes are what's at risk — what the characters and the world stand to gain or lose. They give conflict meaning and make audiences care about the outcome.",
          },
        ],
        writingPrompt: "Write a three-paragraph scene where stakes escalate with each paragraph: paragraph 1 is personal, paragraph 2 adds social stakes, paragraph 3 introduces universal consequences.",
      },
      {
        id: "suspense-techniques",
        moduleId: "conflict-tension",
        title: "Suspense Techniques",
        description: "The tools master storytellers use to keep audiences on the edge of their seats.",
        content: `Alfred Hitchcock defined suspense with a famous example: "Two people are having a conversation. A bomb goes off under the table — that's surprise. Two people are having a conversation, and the audience knows there's a bomb under the table — that's suspense."

**Key suspense techniques:**

**The Ticking Clock** — Impose a deadline. The bomb will explode in five minutes. The ship sails at dawn. The test results arrive tomorrow. Time pressure transforms any situation into a suspense engine.

**Dramatic Irony** — Let the audience know something the character doesn't. This creates unbearable tension as we watch characters walk into danger, trust the wrong person, or celebrate prematurely.

**The Slow Reveal** — Don't show everything at once. Reveal information piece by piece, each revelation raising new questions. The audience should always know just enough to be terrified of what they don't know.

**The False Resolution** — Let the audience think the danger has passed, then reveal it hasn't. The moment of relief makes the renewed threat even more terrifying.

**Constrained Information** — Limit what the reader can see. Use a single POV, fog, darkness, or unreliable information to create uncertainty. We fear what we can't see more than what we can.`,
        examples: [
          {
            title: "No Country for Old Men",
            source: "Cormac McCarthy (2005)",
            text: "McCarthy uses constrained information masterfully. Anton Chigurh's coin toss scenes are pure suspense — we know the stakes (life or death), the method (the coin), but not the outcome. The silenced weapon, the tracking device, the slow hotel hallway approaches all use the slow reveal to create almost unbearable tension.",
          },
          {
            title: "Alien",
            source: "Film (1979)",
            text: "Ridley Scott employs every suspense technique: constrained information (we barely see the alien), ticking clock (the ship's self-destruct), false resolutions (thinking the alien is dead multiple times), and dramatic irony (Ash's secret mission). The less we see the alien, the more terrifying it becomes.",
          },
        ],
        quiz: [
          {
            question: "According to Hitchcock, what distinguishes suspense from surprise?",
            options: [
              "Suspense is louder",
              "The audience knowing about the danger in advance",
              "Suspense requires more characters",
              "Surprise is always better",
            ],
            correctIndex: 1,
            explanation: "Hitchcock's key insight: suspense comes from the audience knowing about a threat that the characters don't. The anticipation is more powerful than the surprise.",
          },
          {
            question: "What is a 'false resolution'?",
            options: [
              "An unsatisfying ending",
              "A moment where the danger seems to have passed but hasn't",
              "A resolution that contradicts the theme",
              "When a character gives up",
            ],
            correctIndex: 1,
            explanation: "A false resolution lets the audience think the danger has passed, creating a brief moment of relief that makes the renewed threat even more terrifying and effective.",
          },
        ],
        writingPrompt: "Write a scene using at least two suspense techniques. Include a ticking clock and either dramatic irony or constrained information. The reader should know something the character doesn't.",
      },
      {
        id: "dramatic-irony",
        moduleId: "conflict-tension",
        title: "Dramatic Irony",
        description: "When the audience knows more than the characters — and why it's one of storytelling's most powerful tools.",
        content: `Dramatic irony occurs when the audience possesses crucial information that a character lacks. It's one of the oldest and most powerful tools in storytelling because it transforms the audience from passive observers into **active, emotionally invested participants**.

**Three effects of dramatic irony:**

**1. Tension** — We watch in agony as a character walks into a trap we can see. Every word they speak, every confident step they take, becomes charged with dread because we know what they don't.

**2. Empathy** — Dramatic irony forces us to care. When we know the truth about a character's situation, we become their silent ally, desperately wishing we could warn them.

**3. Double Meaning** — Lines of dialogue gain second meanings. When a character says "I trust you completely" to someone the audience knows is a betrayer, the words become heartbreaking instead of reassuring.

**How to set up dramatic irony:** Show the audience the truth early, then let the character proceed in ignorance. The gap between what the audience knows and what the character knows creates the tension. The wider the gap, the more powerful the irony.

**Timing the reveal:** When the character finally discovers the truth, the payoff should be proportional to the buildup. The longer and more painful the dramatic irony, the more devastating the revelation needs to be.`,
        examples: [
          {
            title: "Othello",
            source: "William Shakespeare (1603)",
            text: "Shakespeare's Othello is the supreme example of dramatic irony. The audience knows Iago is manipulating Othello, making every scene excruciating. When Othello calls Iago 'honest Iago,' the audience feels the tragic weight of his blindness. Every false 'proof' of Desdemona's infidelity is unbearable because we know the truth.",
          },
          {
            title: "Get Out",
            source: "Film (2017)",
            text: "Jordan Peele uses dramatic irony brilliantly. Once the audience understands the Armitage family's true nature, every polite interaction becomes terrifying. Rose's 'searching for keys' scene works because we know what Chris doesn't — that her search is theater. The audience's knowledge transforms ordinary hospitality into horror.",
          },
        ],
        quiz: [
          {
            question: "What is dramatic irony?",
            options: [
              "When a character is sarcastic",
              "When the audience knows something the character doesn't",
              "When the ending is ironic",
              "When a character lies to another character",
            ],
            correctIndex: 1,
            explanation: "Dramatic irony is specifically when the audience possesses crucial information that a character lacks, creating tension through the gap between audience knowledge and character ignorance.",
          },
          {
            question: "What transforms dialogue when dramatic irony is present?",
            options: [
              "Lines gain double meanings",
              "Characters speak louder",
              "Dialogue becomes unnecessary",
              "Characters use bigger words",
            ],
            correctIndex: 0,
            explanation: "With dramatic irony, lines of dialogue gain second, often devastating meanings — what sounds innocent to the character becomes charged with significance for the audience.",
          },
        ],
        writingPrompt: "Write a scene where the reader knows a character is about to receive devastating news, but the character is blissfully celebrating. Use double-meaning dialogue throughout.",
      },
    ],
  },
  {
    id: "dialogue",
    title: "Dialogue",
    description: "Learn to write dialogue that crackles with life, reveals character, and advances plot simultaneously.",
    icon: "💬",
    color: "from-violet-400 to-purple-600",
    order: 4,
    lessons: [
      {
        id: "art-of-subtext",
        moduleId: "dialogue",
        title: "The Art of Subtext",
        description: "What characters don't say is often more powerful than what they do.",
        content: `Subtext is the meaning beneath the surface of dialogue — what characters really mean when they say something else entirely. In real life, people rarely say exactly what they think. Neither should your characters.

**Why subtext works:** When characters speak directly ("I'm angry at you for betraying me"), the audience is passive. When subtext is at play ("Would you like some tea?" said with ice in their voice), the audience becomes active — decoding, interpreting, feeling the tension in the gap between words and meaning.

**Techniques for creating subtext:**

**1. The Displacement Conversation** — Characters argue about something small (who left the dishes out) when the real conflict is something large (their marriage is failing).

**2. The Opposite** — A character says the opposite of what they feel. "I'm fine" when they're devastated. "I don't care" when they care desperately.

**3. The Deflection** — When asked a direct question, the character changes the subject, asks a different question, or responds to something unspoken.

**4. Physical Action as Subtext** — A character who says "I support you" while gathering their things to leave. The body contradicts the words.

The golden rule: **trust your reader.** If you've built the scene well, you don't need characters to state their feelings. The audience will feel them.`,
        examples: [
          {
            title: "Hills Like White Elephants",
            source: "Ernest Hemingway (1927)",
            text: "Hemingway's masterpiece of subtext never uses the word 'abortion,' yet the entire story is about one. The couple discusses drinks, scenery, and 'the operation' without ever naming it. Every line is loaded with what's unsaid — her desire to keep the baby, his desire to maintain their lifestyle, their mutual inability to be honest.",
          },
          {
            title: "Lost in Translation",
            source: "Film (2003)",
            text: "Coppola's film is built on subtext. Bob and Charlotte discuss jet lag, careers, and marriages — but what they're really discussing is loneliness, disconnection, and an unspoken attraction. The famous final whisper is the ultimate subtext: we never hear the words, because the feeling has already been communicated through everything else.",
          },
        ],
        quiz: [
          {
            question: "What is a 'displacement conversation'?",
            options: [
              "A conversation in a different language",
              "Characters arguing about something small when the real conflict is something large",
              "A conversation that takes place in an unusual location",
              "When a character talks to themselves",
            ],
            correctIndex: 1,
            explanation: "A displacement conversation occurs when characters argue about a small, surface-level issue (dishes, parking) when the real, deeper conflict (failing relationship, resentment) goes unspoken.",
          },
          {
            question: "Why should writers trust their readers with subtext?",
            options: [
              "Because readers are always correct",
              "Because it's easier to write",
              "Because active audience interpretation creates more engaging, powerful scenes",
              "Because direct dialogue is considered bad writing",
            ],
            correctIndex: 2,
            explanation: "When readers actively decode subtext, they become emotionally invested participants rather than passive receivers, making the scene more engaging and the emotional impact more powerful.",
          },
        ],
        writingPrompt: "Write a dialogue scene between two people discussing what to have for dinner. But the real conversation is about something much deeper — a betrayal, a secret, or a goodbye. Never mention the real subject directly.",
      },
      {
        id: "distinctive-voice",
        moduleId: "dialogue",
        title: "Distinctive Voice",
        description: "How to make each character sound unique on the page.",
        content: `If you cover the dialogue tags and can't tell which character is speaking, your characters don't have distinctive voices. Every character should sound **unique** — not through accent gimmicks, but through deeper patterns.

**Elements of distinctive voice:**

**1. Vocabulary Range** — An academic uses different words than a mechanic. But it's not just education — it's personality. An optimist uses different words than a pessimist, regardless of education.

**2. Sentence Structure** — Some people speak in long, winding sentences. Others use fragments. Some ask questions constantly. Others make declarations. Match sentence patterns to personality.

**3. What They Talk About** — A character obsessed with fairness will frame everything in terms of justice. A character driven by fear will constantly reference safety and risk. What they circle back to reveals who they are.

**4. What They Avoid** — Equally revealing. A character who never mentions their family. Someone who deflects every compliment. What a character refuses to discuss tells us as much as what they do discuss.

**5. Rhythm and Pace** — Some characters interrupt. Some wait too long to respond. Some fill silence with chatter. Some weaponize it. Rhythm reveals emotional patterns.

**The test:** Write a scene with four characters. Remove all dialogue tags. If a reader can identify each speaker, you've succeeded.`,
        examples: [
          {
            title: "True Grit",
            source: "Charles Portis (1968)",
            text: "Mattie Ross's voice is unmistakable: precise, legalistic, old-fashioned, and utterly unintimidated. She speaks like a 14-year-old lawyer, using formal vocabulary and complex sentences that reveal her intelligence and stubbornness: 'You must pay for everything in this world, one way or another. There is nothing free except the grace of God.'",
          },
          {
            title: "Pulp Fiction",
            source: "Film (1994)",
            text: "Tarantino gives each character a unique verbal signature. Jules speaks in biblical cadences and philosophical monologues. Vincent is casual, tangential, story-driven. Mia is direct, curious, and playful. The diner robbery couple speaks in excited, overlapping fragments. Without tags, each is identifiable by rhythm alone.",
          },
        ],
        quiz: [
          {
            question: "What is the key test for distinctive character voices?",
            options: [
              "Each character has a catchphrase",
              "Readers can identify speakers without dialogue tags",
              "Characters use different accents",
              "Each character has a unique font",
            ],
            correctIndex: 1,
            explanation: "The true test of distinctive voice: remove all dialogue tags and see if a reader can still identify which character is speaking, based on vocabulary, rhythm, and patterns.",
          },
          {
            question: "What's as revealing as what a character discusses?",
            options: [
              "How loudly they speak",
              "What they avoid discussing",
              "Where they're standing",
              "Their physical appearance",
            ],
            correctIndex: 1,
            explanation: "What characters refuse to discuss — their avoidances and deflections — reveals as much about them as what they actively talk about, creating depth through absence.",
          },
        ],
        writingPrompt: "Write a four-person dialogue scene with NO dialogue tags. Each character should be identifiable by voice alone. Have them discuss a controversial topic where they all disagree.",
      },
      {
        id: "exposition-through-dialogue",
        moduleId: "dialogue",
        title: "Exposition Through Dialogue",
        description: "How to convey information without making characters sound like Wikipedia articles.",
        content: `Exposition — the information the reader needs to understand the story — is one of the hardest things to deliver naturally. The worst approach: two characters telling each other things they both already know. ("As you know, Bob, our planet is under attack...")

**The Rule:** Characters should only say things they would actually say in that situation, to that person, for their own reasons.

**Techniques that work:**

**1. Conflict-Driven Exposition** — Deliver information through arguments. When characters disagree about facts, both sides get stated naturally: "The deal was for fifty thousand!" "We never agreed to fifty. I said forty, and you know it."

**2. The Newcomer** — Introduce a character who genuinely needs to be told things. A new employee, a visitor, a child asking questions. Their ignorance justifies explanation.

**3. Partial Information** — Don't dump everything at once. Let characters reference things casually, forcing the reader to piece information together. This creates intrigue.

**4. Emotional Revelation** — Exposition lands best when attached to emotion. A character confessing a secret, breaking bad news, or recounting a traumatic event delivers information with emotional weight.

**5. Contradiction** — Have one character state something, and another correct or contradict them. The correction delivers the real information while creating dynamic dialogue.`,
        examples: [
          {
            title: "Inception",
            source: "Film (2010)",
            text: "Nolan uses the newcomer technique: Ariadne (and through her, the audience) needs the rules of dream-sharing explained. But each explanation comes through demonstration and conflict, not lecture. The rules are tested immediately — 'You mustn't be afraid to dream a little bigger, darling' — making exposition active and entertaining.",
          },
          {
            title: "The Social Network",
            source: "Film (2010)",
            text: "Sorkin delivers massive exposition through legal depositions — a structure where characters are literally required to explain events. But within that framework, every piece of information is contested, argued over, and emotionally charged. The exposition becomes the drama itself.",
          },
        ],
        quiz: [
          {
            question: "What is the 'As you know, Bob' problem?",
            options: [
              "Characters named Bob are overused",
              "Characters telling each other things they both already know",
              "Too much dialogue without action",
              "Starting every scene with the same character",
            ],
            correctIndex: 1,
            explanation: "The 'As you know, Bob' problem is when characters artificially explain information to each other that they would logically already know, purely for the audience's benefit.",
          },
          {
            question: "Which technique uses a character who genuinely needs information?",
            options: [
              "Contradiction",
              "Emotional revelation",
              "The newcomer technique",
              "Partial information",
            ],
            correctIndex: 2,
            explanation: "The newcomer technique introduces a character who legitimately needs to be told things — a new employee, a visitor — making exposition feel natural and justified.",
          },
        ],
        writingPrompt: "Write a scene that communicates three important pieces of backstory without any character directly explaining them. Use conflict, partial information, and emotional context to deliver exposition naturally.",
      },
      {
        id: "rhythm-and-pace",
        moduleId: "dialogue",
        title: "Rhythm & Pace in Dialogue",
        description: "How the music of dialogue — its beats, pauses, and tempo — creates emotional impact.",
        content: `Dialogue has rhythm, just like music. Short exchanges create staccato tension. Long monologues create contemplative space. The interplay between the two creates the **music** of a scene.

**Fast rhythm** (short lines, rapid exchange) conveys: urgency, anger, wit, flirtation, panic.
"Did you take it?" / "Take what?" / "You know what." / "I don't." / "The money, Sarah." / "..."

**Slow rhythm** (longer lines, pauses, interruptions) conveys: reflection, grief, revelation, intimacy.

**The Power of Silence:** A beat of silence in dialogue — the dash, the ellipsis, the "She didn't respond" — can be more powerful than any words. What's left unsaid hangs in the air.

**Interruption patterns** reveal power dynamics. Who interrupts whom? Who gets to finish their sentences? Who is silenced? Track the interruptions in a scene and you'll map the power structure.

**The Monologue:** Used sparingly, a monologue can be devastating. It works when a character is finally saying something they've been holding back — when the pressure has built to the point of eruption. Quint's USS Indianapolis speech in *Jaws* works because it comes after hours of banter and tension.`,
        examples: [
          {
            title: "Glengarry Glen Ross",
            source: "David Mamet (1984)",
            text: "Mamet's dialogue is pure rhythm. Characters constantly interrupt, overlap, and circle back. The staccato exchanges — fragments, half-sentences, repeated words — create a feeling of desperation and competition. The rhythm IS the characterization: these are people so busy talking they never listen.",
          },
          {
            title: "Quint's USS Indianapolis Speech",
            source: "Jaws — Film (1975)",
            text: "After an hour of fast-paced shark hunting and witty banter, Quint delivers a quiet monologue about surviving a shark attack at sea. The sudden shift from rapid exchange to slow, measured storytelling is devastating. The rhythm change signals: this is real, this matters. Everyone stops. The audience stops.",
          },
        ],
        quiz: [
          {
            question: "What do interruption patterns in dialogue reveal?",
            options: [
              "Which character is funniest",
              "Power dynamics between characters",
              "How long the scene will last",
              "The time period of the story",
            ],
            correctIndex: 1,
            explanation: "Who interrupts whom, who gets silenced, and who controls the flow of conversation directly maps the power dynamics between characters in a scene.",
          },
          {
            question: "When is a monologue most effective?",
            options: [
              "At the beginning of a story to set the scene",
              "When a character has been holding something back and pressure finally erupts",
              "When you need to fill time",
              "At regular intervals throughout the story",
            ],
            correctIndex: 1,
            explanation: "Monologues work best when used sparingly, at moments of emotional eruption — when a character finally releases something they've been suppressing, giving the words explosive power.",
          },
        ],
        writingPrompt: "Write two versions of the same argument: one with rapid-fire short exchanges, one with long silences and slow responses. Notice how rhythm changes the emotional texture of the scene.",
      },
    ],
  },
  {
    id: "world-building",
    title: "World-Building",
    description: "Create immersive settings that feel lived-in, from sensory details to the invisible rules that govern your story's universe.",
    icon: "🌍",
    color: "from-amber-400 to-orange-600",
    order: 5,
    lessons: [
      {
        id: "setting-as-character",
        moduleId: "world-building",
        title: "Setting as Character",
        description: "When the world itself becomes a living, breathing presence in your story.",
        content: `The greatest settings aren't backdrops — they're **characters** in their own right, with moods, histories, and the power to shape events.

**Setting affects character behavior.** People act differently in a church than in a bar, in a penthouse than in a prison. The setting creates pressure, provides opportunities, and limits choices. A story set during a blizzard imposes different constraints than one set on a beach.

**Setting reflects theme.** The decaying mansion in a Gothic novel isn't just a building — it embodies moral decay. The vast emptiness of space in science fiction reflects isolation and insignificance. Choose settings that **echo** your story's deeper concerns.

**Setting has history.** A building has been lived in. A city has layers. A forest has seasons. When your setting carries visible signs of its past — the scratch marks on a doorframe, the abandoned factory on the edge of town — it feels three-dimensional.

**The Specificity Principle:** "A room" is nothing. "A room with one flickering fluorescent light, a coffee ring on the desk from three days ago, and a plant that someone once cared about" is a place that tells a story before any character speaks.`,
        examples: [
          {
            title: "Hogwarts",
            source: "Harry Potter — J.K. Rowling (1997)",
            text: "Hogwarts isn't just a school — it's a character with moods (the castle changes with the seasons), secrets (hidden rooms, moving staircases), and a will of its own. It reflects the story's themes: the beauty of discovery (hidden passages), the danger of forbidden knowledge (the Restricted Section), and the idea that home is where you choose to belong.",
          },
          {
            title: "The Overlook Hotel",
            source: "The Shining — Stephen King (1977)",
            text: "King's Overlook Hotel is more antagonist than setting. It has moods (the boiler as its heartbeat), a history (the ghosts of past violence), and agency (it manipulates Jack). The hotel's isolation mirrors Jack's mental deterioration. Setting and character arc become inseparable — as Jack descends into madness, the hotel comes alive.",
          },
        ],
        quiz: [
          {
            question: "How can setting reflect a story's themes?",
            options: [
              "By being described in long paragraphs",
              "By echoing the story's deeper concerns through its qualities",
              "By being based on a real place",
              "By being mentioned at the start of every chapter",
            ],
            correctIndex: 1,
            explanation: "Settings become thematically powerful when their qualities echo the story's deeper concerns — decay for moral corruption, vast emptiness for isolation, etc.",
          },
          {
            question: "What makes the 'Specificity Principle' effective?",
            options: [
              "Generic descriptions work for any story",
              "Specific, telling details create a place that tells its own story",
              "More adjectives make better descriptions",
              "Settings should always be based on real places",
            ],
            correctIndex: 1,
            explanation: "Specific, telling details — a coffee ring from three days ago, a neglected plant — create settings that feel lived-in and tell their own stories before characters even appear.",
          },
        ],
        writingPrompt: "Describe a setting that reveals its history through physical details alone. Don't tell us what happened — let the reader figure it out from what they see, hear, smell, and touch.",
      },
      {
        id: "rules-of-the-world",
        moduleId: "world-building",
        title: "Rules of the World",
        description: "How internal consistency creates believability in any genre.",
        content: `Every story world has rules — explicit or implicit — and the audience's trust depends on those rules being **consistent**. This applies to fantasy magic systems as much as to the social dynamics of a realistic drama.

**Establish rules early.** If magic can heal wounds, show it before the climactic battle. If your world has flying cars, establish that in act one. Audiences forgive the impossible but not the inconsistent.

**Rules create limitations, and limitations create drama.** If your wizard can do anything, there's no tension. If magic costs something — energy, sanity, years of life — every spell becomes a dramatic choice.

**Soft vs. Hard World-Building:**
- **Hard** world-building (Sanderson's Laws of Magic) — rules are clearly defined, explained, and consistently applied. The audience can predict what's possible.
- **Soft** world-building (Tolkien's approach) — rules are implied, mysterious, and partially hidden. The world feels vast and unknowable.

Both work. The key is consistency within your chosen approach. A hard magic system that suddenly has unexplained powers breaks trust. A soft system that suddenly demands technical explanation feels wrong.

**Social rules** are just as important as physical ones. What's taboo? What's celebrated? What can't be said aloud? The unwritten rules of your story's society create pressure that drives character behavior.`,
        examples: [
          {
            title: "Mistborn",
            source: "Brandon Sanderson (2006)",
            text: "Sanderson's Allomancy is the gold standard of hard world-building. Each metal grants a specific power with specific limitations. Because the audience understands the rules, the creative ways characters use (and combine) metals become thrilling puzzle solutions rather than convenient magic. Limitations drive innovation.",
          },
          {
            title: "The Handmaid's Tale",
            source: "Margaret Atwood (1985)",
            text: "Atwood's Gilead runs on social rules: who can read, who can speak, who can touch whom. These rules aren't magical, but they function identically — creating constraints that characters must navigate, subvert, or submit to. The story's tension comes entirely from the gap between human desire and social prohibition.",
          },
        ],
        quiz: [
          {
            question: "Why do limitations in world-building create better drama?",
            options: [
              "Because audiences prefer weaker characters",
              "Because every ability or action becomes a meaningful choice with consequences",
              "Because it makes stories shorter",
              "Because unlimited power is unrealistic",
            ],
            correctIndex: 1,
            explanation: "When abilities and actions have costs and constraints, every use becomes a dramatic choice — characters must weigh consequences, creating tension and meaningful decision-making.",
          },
          {
            question: "What is 'soft' world-building?",
            options: [
              "World-building that is poorly done",
              "Rules that are implied, mysterious, and partially hidden",
              "World-building with only physical descriptions",
              "Fantasy settings without magic",
            ],
            correctIndex: 1,
            explanation: "Soft world-building keeps rules implied and mysterious, creating a sense of vastness and wonder. Tolkien's approach: we see magic's effects but never receive a rulebook.",
          },
        ],
        writingPrompt: "Create a world with one unusual rule (physical, social, or magical) and write a scene where a character must navigate its consequences. Show, don't tell, how the rule works.",
      },
      {
        id: "immersion-techniques",
        moduleId: "world-building",
        title: "Immersion Techniques",
        description: "How to make readers forget they're reading and feel they've stepped into another world.",
        content: `Immersion is the holy grail of world-building: the moment a reader forgets they're reading and feels physically present in your world. Here's how to achieve it.

**1. Enter Through Specificity** — Don't describe "a market." Describe the fish vendor shouting prices over the whine of a saw cutting ice blocks, while someone's radio plays yesterday's cricket score. Specificity is the gateway to immersion.

**2. Use Casual References** — Characters in your world don't explain their world. They reference it casually: "hand me the spanner" (not "hand me the tool used to tighten bolts in our world where..."). Casual reference implies a world too vast and lived-in to explain.

**3. Show the Mundane** — The most immersive worlds include boring details: what people eat for breakfast, how they commute, what they complain about at work. The mundane makes the extraordinary believable.

**4. Engage Multiple Senses** — Most writers default to sight. Add sound, smell, texture, and taste. A world you can smell is a world you believe in.

**5. Reveal Through Interaction** — Don't describe the world in a separate paragraph. Reveal it through characters interacting with it: someone stumbling on uneven cobblestones tells us more about the street than a description ever could.`,
        examples: [
          {
            title: "Blade Runner 2049",
            source: "Film (2017)",
            text: "Villeneuve creates immersion through the mundane: K's routine of unlocking his door with a retinal scan, his holographic girlfriend preparing (virtual) dinner, the graffiti on his apartment wall. The extraordinary technology is treated casually, making the world feel lived-in rather than showcased.",
          },
          {
            title: "Dune",
            source: "Frank Herbert (1965)",
            text: "Herbert achieves immersion through casual reference. Characters discuss 'stillsuits,' 'sandworms,' and 'the Bene Gesserit' without explanation. The reader pieces together meaning from context, creating the feeling of visiting a real place with its own history and terminology, rather than being lectured about an invented one.",
          },
        ],
        quiz: [
          {
            question: "What is the 'casual reference' technique?",
            options: [
              "Using informal language in narration",
              "Characters referencing world elements without explaining them",
              "Mentioning other books within your story",
              "Using real-world brand names",
            ],
            correctIndex: 1,
            explanation: "Casual reference means characters mention world elements — technology, customs, history — without explaining them, implying a world too vast and lived-in to need explanation.",
          },
          {
            question: "Why does showing the mundane increase immersion?",
            options: [
              "Because boring details make stories feel longer",
              "Because everyday details make extraordinary elements feel believable",
              "Because readers prefer mundane stories",
              "Because it pads the word count",
            ],
            correctIndex: 1,
            explanation: "Mundane details (breakfast, commutes, complaints) create a texture of normalcy that makes the extraordinary elements of your world feel grounded and believable.",
          },
        ],
        writingPrompt: "Describe an alien or fantastical location entirely through a character's mundane morning routine there. Never explain anything — let the reader deduce the world from casual interactions.",
      },
      {
        id: "sensory-detail",
        moduleId: "world-building",
        title: "Sensory Detail",
        description: "Writing that activates all five senses and puts the reader physically inside the scene.",
        content: `Most writers describe what things **look** like. Great writers describe what things **feel, sound, smell, and taste** like. The difference is the difference between watching a place through glass and stepping inside it.

**The Hierarchy of Senses:** Sight is the weakest sense for immersion because it's the most passive. Smell is the most evocative — it triggers memory and emotion directly. Sound creates atmosphere. Touch creates intimacy. Taste creates visceral reaction.

**Unexpected sensory pairings** create the most vivid writing. Not just "the room was cold" but "the cold had a taste — metallic, like biting tinfoil." Synesthesia in writing (mixing senses) creates startling vividness.

**The One-Detail Rule:** You don't need to describe every sense in every scene. Often, one perfectly chosen sensory detail does more than five adequate ones. Find the detail that captures the **essence** of the moment and commit to it fully.

**Avoid sensory clichés:** "The sun beat down." "A chill ran down her spine." "His blood ran cold." These are dead metaphors that activate no sensory response. Replace them with specific, original observations that make the reader genuinely **feel** something.`,
        examples: [
          {
            title: "Perfume: The Story of a Murderer",
            source: "Patrick Süskind (1985)",
            text: "Süskind's opening describes 18th-century Paris entirely through smell: 'the streets stank of manure, the courtyards of urine, the stairwells stank of moldering wood and rat droppings, the kitchens of spoiled cabbage and mutton fat.' No visual description is needed — the reader is transported by scent alone.",
          },
          {
            title: "Blood Meridian",
            source: "Cormac McCarthy (1985)",
            text: "McCarthy engages all senses with brutal specificity: 'They rode through a region of tall dead trees... the trees... ashen and trembling.' The landscape is felt through sound (trembling), sight (ashen), and implied temperature (dead, cold). Each sentence creates a visceral, multisensory experience.",
          },
        ],
        quiz: [
          {
            question: "Which sense is most evocative for immersion, according to the lesson?",
            options: ["Sight", "Sound", "Smell", "Touch"],
            correctIndex: 2,
            explanation: "Smell is the most evocative sense — it triggers memory and emotion directly and more powerfully than any other sense, making it the most immersive tool for writers.",
          },
          {
            question: "What is the 'One-Detail Rule'?",
            options: [
              "Only describe one thing per scene",
              "One perfectly chosen detail does more than five adequate ones",
              "Each paragraph should have exactly one adjective",
              "Characters should only notice one sense at a time",
            ],
            correctIndex: 1,
            explanation: "The One-Detail Rule suggests that a single perfectly chosen sensory detail, fully committed to, is more powerful and immersive than attempting to cover all five senses inadequately.",
          },
        ],
        writingPrompt: "Describe a location using every sense EXCEPT sight. The reader should be able to picture the place from sound, smell, touch, and taste alone.",
      },
    ],
  },
  {
    id: "pacing-structure",
    title: "Pacing & Structure",
    description: "Control the speed, rhythm, and architecture of your narrative to maximize emotional impact.",
    icon: "⏱️",
    color: "from-cyan-400 to-blue-600",
    order: 6,
    lessons: [
      {
        id: "scene-vs-summary",
        moduleId: "pacing-structure",
        title: "Scene vs. Summary",
        description: "Knowing when to zoom in and when to zoom out is the key to pacing.",
        content: `Every moment in a story exists on a spectrum between **scene** (real-time, moment-by-moment) and **summary** (compressed time, rapid overview). Mastering the balance between these is the fundamental skill of pacing.

**Scene:** Time slows to match the reader's experience. We see dialogue in real-time, observe actions moment by moment, and feel the character's immediate sensations. Scenes are **expensive** in word count but create maximum emotional intensity.

**Summary:** Time compresses. Hours, days, or years pass in a sentence: "The next three months were a blur of training." Summaries are **efficient** and cover ground quickly but create less emotional connection.

**The Rule:** Render as scene any moment that is **dramatic, emotional, or plot-changing**. Summarize transitions, routine, and preparation. The dramatic moments earn the slow, detailed treatment.

**Pacing problems** usually stem from the wrong mode:
- **Too slow:** Scenes for moments that should be summary (detailed description of a character driving to work when nothing happens)
- **Too fast:** Summary for moments that should be scene (a character's emotional breakthrough described in one sentence)

The most powerful technique: **alternating between modes**. A long, tense scene followed by a quick summary creates rhythm and gives the reader breathing room.`,
        examples: [
          {
            title: "One Hundred Years of Solitude",
            source: "Gabriel García Márquez (1967)",
            text: "Márquez masterfully shifts between scene and summary across generations. A detailed, scene-by-scene portrayal of Colonel Buendía's execution (which takes pages) sits alongside summaries that compress decades: 'Many years later...' The alternation creates a dreamlike rhythm where time itself becomes elastic.",
          },
          {
            title: "Mad Max: Fury Road",
            source: "Film (2015)",
            text: "Miller uses scene mode for nearly the entire film — the extended chase sequences are rendered in real-time, moment-by-moment. The rare moments of summary (brief respites, nighttime scenes) feel like gasps for air, making the return to scene mode even more intense. Pacing through relentless scene creates visceral exhaustion.",
          },
        ],
        quiz: [
          {
            question: "When should a moment be rendered as a full scene?",
            options: [
              "Any time a character speaks",
              "When the moment is dramatic, emotional, or plot-changing",
              "At the beginning of every chapter",
              "For all action sequences",
            ],
            correctIndex: 1,
            explanation: "Full scenes should be reserved for moments that are dramatic, emotional, or plot-changing — these earn the detailed, real-time treatment that maximizes their impact.",
          },
          {
            question: "What causes a 'too slow' pacing problem?",
            options: [
              "Not enough dialogue",
              "Rendering as scene moments that should be summary",
              "Too many characters",
              "Short chapters",
            ],
            correctIndex: 1,
            explanation: "Stories feel sluggish when routine, transitional moments get the full scene treatment instead of being compressed into summary, creating a mismatch between importance and attention.",
          },
        ],
        writingPrompt: "Write a passage covering 24 hours of a character's life. Use full scene mode for two key moments and summary for everything else. Make the transitions seamless.",
      },
      {
        id: "chapter-structure",
        moduleId: "pacing-structure",
        title: "Chapter Structure",
        description: "How to use chapters as units of meaning that pull readers through your story.",
        content: `Chapters are not arbitrary breaks — they're **units of meaning** with their own internal structure. Each chapter should feel like a complete mini-story while advancing the larger narrative.

**The chapter as promise and payoff:** Each chapter implicitly promises the reader something: a question will be answered, a situation will change, a mystery will deepen. The end of a chapter should **deliver** on that promise while creating a new one.

**Opening hooks:** The first line of a chapter should re-engage the reader. You can't assume momentum from the previous chapter — the reader may have put the book down. Start with action, a question, a surprising statement, or a change in situation.

**Ending hooks:** The last line of a chapter determines whether the reader keeps reading. End mid-action ("The door burst open—"), mid-revelation ("That's when she realized who he really was"), or with a new question ("But the letter said something else entirely").

**Chapter length as pacing tool:** Short chapters (James Patterson, Dan Brown) create urgency. Long chapters (literary fiction) create immersion. Varying chapter length creates rhythm — a series of short, punchy chapters followed by a long, contemplative one can be devastatingly effective.

**Multi-POV chapters:** In stories with multiple viewpoints, chapters become a tool for dramatic irony. End one character's chapter with them trusting the wrong person; begin the next chapter from that person's sinister perspective.`,
        examples: [
          {
            title: "The Da Vinci Code",
            source: "Dan Brown (2003)",
            text: "Brown uses extremely short chapters (many under 3 pages), each ending on a cliffhanger, to create a page-turning rhythm. It's mechanical but effective: each chapter ends mid-action or with a revelation, making it impossible to stop reading. The short length means 'just one more chapter' never feels like a big commitment.",
          },
          {
            title: "A Game of Thrones",
            source: "George R.R. Martin (1996)",
            text: "Martin uses character-named chapters to create a distinctive structure. Each chapter is a complete POV experience, and the gaps between visits to each character create anticipation. Ending Ned's chapter with him discovering a secret, then switching to Daenerys across the world, creates two types of tension simultaneously.",
          },
        ],
        quiz: [
          {
            question: "What should a chapter ending accomplish?",
            options: [
              "Wrap up all loose ends",
              "Deliver on the chapter's promise while creating a new question or hook",
              "Always end on a cliffhanger",
              "Summarize what happened",
            ],
            correctIndex: 1,
            explanation: "Chapter endings should satisfy the reader by delivering on the chapter's implicit promise, while simultaneously creating a new question or hook that compels continued reading.",
          },
          {
            question: "How do short chapters affect pacing?",
            options: [
              "They slow the story down",
              "They have no effect on pacing",
              "They create urgency and make the story feel fast",
              "They confuse readers",
            ],
            correctIndex: 2,
            explanation: "Short chapters create urgency because they feel quick to read and their frequent endpoints (each with hooks) create a rapid rhythm that propels readers forward.",
          },
        ],
        writingPrompt: "Write three mini-chapters (200 words each) that follow three different characters during the same event. End each chapter with a hook that makes the reader desperate to return to that character.",
      },
      {
        id: "cliffhangers",
        moduleId: "pacing-structure",
        title: "Cliffhangers",
        description: "The art of strategic incompletion — leaving readers desperate for more.",
        content: `A cliffhanger is a narrative interruption at a moment of high tension — leaving the outcome unresolved to compel the audience to continue. It's one of storytelling's most powerful and most abused techniques.

**Types of cliffhangers:**

**The Physical Cliffhanger** — A character is in immediate danger. The classic: hanging from an actual cliff. Effective but shallow if overused.

**The Revelation Cliffhanger** — Information is revealed that changes everything: "The DNA results were in. The killer was her brother." This type works because it creates questions rather than just tension.

**The Decision Cliffhanger** — A character must make an impossible choice, and we cut away before they decide. Effective because it forces the audience to imagine both outcomes.

**The Emotional Cliffhanger** — A relationship shifts dramatically: a confession, a betrayal, a goodbye that might be final. These resonate longest because they're about people, not situations.

**When cliffhangers fail:**
- When they're immediately resolved (a cheat that destroys trust)
- When they're overused (fatigue sets in)
- When the stakes aren't established (we need to care first)
- When the resolution doesn't match the buildup (anti-climax)

**The best cliffhangers don't just create tension — they create questions.** "Will they survive?" is tension. "How did she know?" is a question. Questions are more durable than tension.`,
        examples: [
          {
            title: "The Empire Strikes Back",
            source: "Film (1980)",
            text: "The ultimate cliffhanger: Han frozen in carbonite, Luke's hand severed and his identity shattered, the Rebel Alliance in retreat. It works because every cliffhanger is emotional, not just physical. The revelation ('I am your father') creates questions that persist. Three years of wondering didn't diminish the payoff — it amplified it.",
          },
          {
            title: "Breaking Bad — Season 4 Finale",
            source: "TV Series (2011)",
            text: "The final shot of the Lily of the Valley plant reveals that Walt poisoned Brock — a revelation cliffhanger that recontextualizes everything we just watched. It doesn't create danger (the season's conflict is resolved) but creates a devastating question: what kind of person has Walter White become?",
          },
        ],
        quiz: [
          {
            question: "What makes a revelation cliffhanger more durable than a physical cliffhanger?",
            options: [
              "It's more exciting",
              "It creates questions rather than just tension",
              "It involves more characters",
              "It's easier to write",
            ],
            correctIndex: 1,
            explanation: "Revelation cliffhangers create questions ('How did she know?' 'What does this mean?') that persist in the audience's mind longer than physical tension ('Will they survive?').",
          },
          {
            question: "When do cliffhangers fail?",
            options: [
              "When they involve important characters",
              "When they're immediately resolved in a way that feels like a cheat",
              "When they occur at the end of a chapter",
              "When the reader has to wait",
            ],
            correctIndex: 1,
            explanation: "Cliffhangers fail when they're immediately resolved without real consequence — this teaches the audience that the tension isn't real, destroying trust in future cliffhangers.",
          },
        ],
        writingPrompt: "Write three different cliffhanger endings for the same scene: one physical, one revelation, one emotional. Notice which one makes you most want to keep writing.",
      },
      {
        id: "non-linear-narrative",
        moduleId: "pacing-structure",
        title: "Non-Linear Narrative",
        description: "When and how to break chronology for maximum storytelling impact.",
        content: `Linear storytelling (beginning → middle → end) is the default, but some of the most powerful stories break chronological order. Non-linear narrative isn't a gimmick — it's a tool for **controlling information** and **creating meaning**.

**Reasons to go non-linear:**

**1. Dramatic Irony** — Starting at the end and working backward lets the audience see the journey knowing the destination. Every choice becomes charged with foreknowledge.

**2. Mystery** — Fragmenting the timeline creates puzzles the reader must assemble. Each new fragment changes the meaning of previous ones.

**3. Emotional Logic** — Sometimes a story's emotional truth doesn't follow chronological order. Memory jumps. Trauma echoes. A story structured by emotional association can feel more true than one structured by clocks.

**4. Juxtaposition** — Placing two non-adjacent time periods side by side highlights parallels and contrasts. Past and present illuminate each other.

**The Anchor Principle:** Non-linear stories need an anchor — a primary timeline or character perspective that the reader can hold onto. Without it, fragmented timelines become confusion, not art.

**Warning:** Non-linear structure should reveal meaning, not hide it. If rearranging the timeline back to chronological order would make the story better, your non-linear structure isn't earning its complexity.`,
        examples: [
          {
            title: "Slaughterhouse-Five",
            source: "Kurt Vonnegut (1969)",
            text: "Billy Pilgrim is 'unstuck in time,' experiencing his life out of order. Vonnegut's non-linear structure isn't a gimmick — it mirrors PTSD, where traumatic memories intrude without warning. The firebombing of Dresden keeps recurring because trauma doesn't follow chronological order. The structure IS the meaning.",
          },
          {
            title: "Memento",
            source: "Film (2000)",
            text: "Nolan tells the story backward — each scene ends where the previous one began. This isn't just clever: it puts the audience in Leonard's position, unable to trust memory or context. We experience his condition rather than observing it. The structure creates empathy through disorientation.",
          },
        ],
        quiz: [
          {
            question: "What is the 'Anchor Principle' in non-linear narratives?",
            options: [
              "Every story needs a boat scene",
              "The story needs a primary timeline the reader can hold onto",
              "The main character should be named Anchor",
              "Non-linear stories should always start at the end",
            ],
            correctIndex: 1,
            explanation: "The Anchor Principle states that non-linear stories need a primary timeline, character, or perspective that grounds the reader, preventing fragmentation from becoming confusion.",
          },
          {
            question: "When should you NOT use non-linear structure?",
            options: [
              "When writing literary fiction",
              "When the story is about memory",
              "When chronological order would actually make the story better",
              "When you have more than 5 characters",
            ],
            correctIndex: 2,
            explanation: "Non-linear structure should add meaning, not obscure it. If rearranging the timeline chronologically would improve the story, the non-linear structure isn't earning its complexity.",
          },
        ],
        writingPrompt: "Write a 500-word story in non-linear order. Start with the ending, jump to the middle, then the beginning. The reader should piece together the full story from fragments.",
      },
    ],
  },
  {
    id: "theme-meaning",
    title: "Theme & Meaning",
    description: "Discover how to weave deeper meaning into your stories through theme, symbolism, motif, and allegory.",
    icon: "💡",
    color: "from-yellow-400 to-gold-600",
    order: 7,
    lessons: [
      {
        id: "finding-your-theme",
        moduleId: "theme-meaning",
        title: "Finding Your Theme",
        description: "How to discover what your story is really about — and use it to unify every element.",
        content: `Theme is the **underlying meaning** of your story — the question it asks or the statement it makes about human experience. It's not a moral lesson or a bumper sticker. It's the deep current that runs beneath the surface of plot and character.

**Theme vs. Subject:** The subject is what your story is about on the surface. The theme is what it's about beneath that surface. *The Great Gatsby*'s subject is a man's pursuit of a woman. Its theme is the corruption of the American Dream and the impossibility of recapturing the past.

**Finding your theme:** Many writers discover their theme during writing, not before. Ask yourself:
- What question does my story ask?
- What do my characters argue about at the deepest level?
- What does my protagonist learn (or fail to learn)?
- If a reader had to state what my story is "really about," what would they say?

**Theme as question, not answer:** The best themes are explored, not preached. "Revenge is wrong" is a morality lesson. "What does the pursuit of revenge cost the pursuer?" is a theme — it invites exploration rather than dictating a conclusion.

**Theme as unifier:** Once you know your theme, it becomes a filter for every decision. Which scenes to include, what dialogue to write, which subplots to develop — everything should echo or interrogate the theme.`,
        examples: [
          {
            title: "To Kill a Mockingbird",
            source: "Harper Lee (1960)",
            text: "The subject is a trial in the American South. The theme explores the coexistence of good and evil in people and institutions. Every element — the trial, Boo Radley, the children's games, the rabid dog — explores this theme from different angles. The 'mockingbird' metaphor crystallizes it: innocence exists, and destroying it is the ultimate sin.",
          },
          {
            title: "Parasite",
            source: "Film (2019)",
            text: "Bong Joon-ho's film explores class inequality not through moral lectures but through spatial metaphor: above and below, upstairs and downstairs, sunshine and flooding basements. The theme (inequality as structural violence) emerges from the story's architecture rather than from any character's speech.",
          },
        ],
        quiz: [
          {
            question: "What is the difference between subject and theme?",
            options: [
              "There is no difference",
              "Subject is the surface topic; theme is the deeper meaning beneath it",
              "Theme is the plot; subject is the setting",
              "Subject is for fiction; theme is for non-fiction",
            ],
            correctIndex: 1,
            explanation: "Subject is what the story is about on the surface (a man pursuing a woman); theme is the deeper meaning (the impossibility of recapturing the past).",
          },
          {
            question: "Why are the best themes questions rather than answers?",
            options: [
              "Because readers prefer confusion",
              "Because questions invite exploration rather than preaching",
              "Because answers are always wrong",
              "Because editors prefer ambiguity",
            ],
            correctIndex: 1,
            explanation: "Themes phrased as questions invite exploration and multiple perspectives, while themes phrased as answers tend toward preachiness and oversimplification.",
          },
        ],
        writingPrompt: "Write a one-page scene where two characters argue. On the surface, they're arguing about something specific (where to eat, what to do this weekend). But their argument should embody a deeper theme about human nature.",
      },
      {
        id: "symbolism",
        moduleId: "theme-meaning",
        title: "Symbolism",
        description: "How objects, images, and actions can carry meaning beyond their literal significance.",
        content: `A symbol is anything that represents something beyond itself. A rose isn't just a flower — it can represent love, beauty, mortality, or secrecy, depending on context. Effective symbolism enriches a story without requiring the reader to "decode" it.

**Natural vs. Forced Symbolism:** The best symbols emerge organically from the story. If a character's mother always wore a particular necklace, that necklace naturally becomes symbolic when the character inherits it. You don't need to force meaning onto objects — let the story's emotional logic create it.

**How symbols work:**
- **Repetition** builds symbolic weight. An object mentioned once is just an object. Mentioned three times with increasing significance, it becomes a symbol.
- **Context** determines meaning. A knife in a kitchen is a tool. A knife at a reunion is a threat. A knife buried in a garden is a secret. Same object, different meanings.
- **Transformation** creates power. A wedding ring thrown into the ocean. A childhood toy given away. When a symbol changes state, the meaning shifts dramatically.

**The Author's Dilemma:** If the symbol is too obvious, it feels heavy-handed. If it's too subtle, it's missed entirely. Aim for symbols that work on two levels: they function literally in the story AND carry deeper meaning for attentive readers.`,
        examples: [
          {
            title: "The Green Light",
            source: "The Great Gatsby — F. Scott Fitzgerald (1925)",
            text: "The green light at the end of Daisy's dock begins as a literal light Gatsby stares at, becomes symbolic of his desire for Daisy, and ultimately represents the American Dream itself — always visible, always out of reach. Fitzgerald builds its meaning through repetition and context, from the first chapter to the final line.",
          },
          {
            title: "The Mockingjay Pin",
            source: "The Hunger Games — Suzanne Collins (2008)",
            text: "The mockingjay pin transforms from a personal keepsake to a symbol of rebellion. Collins builds its meaning gradually — first it's Katniss's personal token, then it's adopted by allies, then by entire districts. The symbol's power grows as more people invest meaning in it, mirroring real-world symbol creation.",
          },
        ],
        quiz: [
          {
            question: "What builds symbolic weight most effectively?",
            options: [
              "Explaining the symbol's meaning",
              "Using unusual objects",
              "Repetition with increasing significance",
              "Having characters discuss the symbol",
            ],
            correctIndex: 2,
            explanation: "Repetition builds symbolic weight naturally — an object mentioned once is just an object, but mentioned three times with increasing emotional significance, it becomes a symbol.",
          },
          {
            question: "What determines a symbol's meaning?",
            options: [
              "The dictionary definition of the object",
              "The author's stated intention",
              "The context in which it appears in the story",
              "Universal cultural associations",
            ],
            correctIndex: 2,
            explanation: "Context determines symbolic meaning — the same object (a knife, a ring, a letter) carries different symbolic weight depending on the situation, characters, and emotional context.",
          },
        ],
        writingPrompt: "Write a short story where a single object appears three times. Each appearance should add a new layer of meaning. The object should mean something very different by the end than it did at the beginning.",
      },
      {
        id: "motif",
        moduleId: "theme-meaning",
        title: "Motif",
        description: "Recurring elements that create patterns of meaning throughout a story.",
        content: `A motif is a recurring element — an image, phrase, action, or idea — that appears throughout a work, creating a pattern of meaning. While a symbol is a single object with deeper significance, a motif is a **pattern** that develops through repetition.

**Motif vs. Symbol:** A symbol is a specific thing (the green light). A motif is a recurring pattern (the color green appearing in clothes, money, envy, nature throughout the story). Symbols are moments. Motifs are threads.

**Types of motifs:**
- **Visual motifs** — recurring images (water, mirrors, doors)
- **Verbal motifs** — repeated phrases, words, or sounds
- **Action motifs** — recurring behaviors (a character always washing their hands)
- **Thematic motifs** — recurring ideas or situations (characters being trapped)

**How motifs create meaning:** Each repetition adds a layer. The first appearance establishes the motif. The second creates a connection. The third confirms the pattern. Subsequent appearances can then play with expectations — inverting, subverting, or transforming the motif.

**Motifs unify a work.** They create coherence across scenes that may seem unrelated, weaving a subliminal thread that the reader feels even if they can't consciously identify it. Like a musical theme, the motif gives the work its distinctive emotional signature.`,
        examples: [
          {
            title: "Blood in Macbeth",
            source: "William Shakespeare (1606)",
            text: "Blood appears repeatedly in Macbeth: in the prophecy, on the daggers, on Lady Macbeth's hands ('Out, damned spot!'). Each appearance deepens the motif — from literal blood to guilt to madness. The motif tracks the characters' psychological descent, making invisible guilt visible.",
          },
          {
            title: "Water in The Shape of Water",
            source: "Film (2017)",
            text: "Del Toro uses water as a motif throughout: rain, baths, flooding, aquariums, tears. Water represents connection, freedom, and transformation. The motif creates a subliminal pattern — every time water appears, it reinforces the theme of finding beauty and love in places society considers monstrous.",
          },
        ],
        quiz: [
          {
            question: "What is the difference between a symbol and a motif?",
            options: [
              "Symbols are visual; motifs are verbal",
              "A symbol is a single object with meaning; a motif is a recurring pattern",
              "Symbols are in literature; motifs are in film",
              "There is no difference",
            ],
            correctIndex: 1,
            explanation: "A symbol is a specific thing with deeper significance (the green light), while a motif is a recurring pattern (the color green appearing throughout) that builds meaning through repetition.",
          },
          {
            question: "How many repetitions typically establish a motif as a pattern?",
            options: ["One", "Two", "Three or more", "At least ten"],
            correctIndex: 2,
            explanation: "The 'rule of three' applies to motifs: the first appearance introduces, the second creates connection, the third confirms the pattern. After that, the audience actively watches for it.",
          },
        ],
        writingPrompt: "Write a short piece that uses a single motif (water, light, doors, hands — choose one) at least four times. Each appearance should add a new dimension to the motif's meaning.",
      },
      {
        id: "allegory",
        moduleId: "theme-meaning",
        title: "Allegory",
        description: "Stories that operate on two levels — the surface narrative and a parallel deeper meaning.",
        content: `An allegory is a story that works on two parallel levels: the literal surface narrative and a deeper, often political, philosophical, or moral meaning. Every element in an allegory corresponds to something in the real world or the world of ideas.

**Allegory vs. Theme:** All stories have themes. An allegory goes further — its characters, settings, and events systematically represent real-world equivalents. In Orwell's *Animal Farm*, the pigs aren't just characters who happen to illustrate themes about power; they ARE specific political figures.

**Types of allegory:**
- **Political allegory** — stories that mirror real political events (Animal Farm, The Crucible)
- **Moral allegory** — stories that embody ethical principles (Pilgrim's Progress, most fairy tales)
- **Philosophical allegory** — stories that explore abstract concepts (Plato's Cave, The Matrix)

**The challenge of allegory:** Too transparent, and it becomes a sermon. Too opaque, and the parallel is lost. The best allegories work as compelling stories first — you can enjoy *Animal Farm* without knowing about the Russian Revolution, but knowing adds a devastating second layer.

**Modern allegory** tends to be subtler than classical forms. Rather than one-to-one correspondences, contemporary writers create worlds that **rhyme** with reality rather than directly mirror it, allowing for more nuanced exploration.`,
        examples: [
          {
            title: "Animal Farm",
            source: "George Orwell (1945)",
            text: "Orwell's fable directly allegorizes the Russian Revolution: Old Major is Marx/Lenin, Napoleon is Stalin, Snowball is Trotsky, the dogs are the secret police, and Boxer represents the exploited working class. Yet it also works as a universal story about how revolutions betray their ideals — the specific allegory opens into a timeless theme.",
          },
          {
            title: "District 9",
            source: "Film (2009)",
            text: "Blomkamp's film allegorizes South African apartheid through an alien refugee narrative. The 'prawns' (aliens) confined to shanty towns mirror the treatment of Black South Africans. By using science fiction, the film makes the familiar strange — forcing viewers to see real-world injustice from a new angle.",
          },
        ],
        quiz: [
          {
            question: "What distinguishes allegory from theme?",
            options: [
              "Allegory is older than theme",
              "In allegory, characters and events systematically represent real-world equivalents",
              "Theme is more complex than allegory",
              "Allegory is only used in poetry",
            ],
            correctIndex: 1,
            explanation: "While all stories have themes, allegory goes further — its characters, settings, and events systematically correspond to real-world equivalents, creating a parallel second narrative.",
          },
          {
            question: "What is the main risk of writing allegory?",
            options: [
              "It's too expensive",
              "Readers don't understand allegory",
              "It can become too transparent and feel like a sermon",
              "It always needs to be about politics",
            ],
            correctIndex: 2,
            explanation: "If the allegorical parallels are too obvious, the story feels like a sermon or political pamphlet rather than compelling fiction. The best allegories work as stories first.",
          },
        ],
        writingPrompt: "Write a short fable (an animal story or fairy tale) that allegorizes a real-world situation you feel strongly about. The story should work on its own, but a reader who knows the reference should see the parallel.",
      },
    ],
  },
  {
    id: "narrative-voice",
    title: "Narrative Voice",
    description: "Find and refine the distinctive voice that makes your writing unmistakably yours.",
    icon: "🎭",
    color: "from-pink-400 to-rose-600",
    order: 8,
    lessons: [
      {
        id: "pov-choices",
        moduleId: "narrative-voice",
        title: "POV Choices",
        description: "How the choice of narrative perspective shapes every aspect of your story.",
        content: `Point of view (POV) is one of the most consequential decisions a writer makes. It determines what the reader can know, who they empathize with, and what kind of story is possible.

**First Person ("I"):** The reader experiences the story through one character's consciousness. Strengths: deep intimacy, strong voice, natural unreliability. Limitations: can only know what the narrator knows, risks monotony.

**Third Person Limited ("She/He"):** A narrator follows one character closely, accessing their thoughts but maintaining slight distance. Strengths: intimacy with flexibility, can shift between characters (in different chapters). Limitations: must still respect knowledge boundaries.

**Third Person Omniscient ("The narrator knows all"):** A godlike narrator who can enter any character's mind and comment on events. Strengths: panoramic scope, dramatic irony, thematic authority. Limitations: can feel distant, harder to create intimacy.

**Second Person ("You"):** Rare but powerful. Makes the reader a character. Strengths: immediate immersion, urgency. Limitations: can feel gimmicky if not earned, exhausting over long works.

**The secret:** POV isn't just about pronouns — it's about **distance**. Even within first person, you can be deep inside a character's stream of consciousness or narrating from years later with retrospective wisdom. Control the distance, and you control the reader's experience.`,
        examples: [
          {
            title: "The Catcher in the Rye",
            source: "J.D. Salinger (1951)",
            text: "Holden Caulfield's first-person narration IS the novel. His voice — skeptical, digressive, achingly vulnerable beneath the bravado — makes the reader experience his alienation from inside. The POV choice means we see everyone through Holden's unreliable filter, and the gap between his perceptions and reality is the story's engine.",
          },
          {
            title: "Beloved",
            source: "Toni Morrison (1987)",
            text: "Morrison shifts between multiple third-person limited perspectives, occasionally plunging into stream of consciousness. The shifting POV lets her reveal different facets of trauma — each character carries a different piece of the story, and the reader must assemble the full picture from fragments, mirroring how memory and community hold shared pain.",
          },
        ],
        quiz: [
          {
            question: "What is the main advantage of first-person POV?",
            options: [
              "The reader can see everything",
              "Deep intimacy and strong voice",
              "It's the easiest to write",
              "It allows multiple perspectives",
            ],
            correctIndex: 1,
            explanation: "First person creates deep intimacy — the reader lives inside the character's consciousness, experiencing their voice, thoughts, and perceptions directly.",
          },
          {
            question: "What does 'narrative distance' control?",
            options: [
              "The physical distance between characters",
              "How many pages the story spans",
              "How close or far the reader feels from the character's experience",
              "The geographical setting of the story",
            ],
            correctIndex: 2,
            explanation: "Narrative distance controls the reader's proximity to the character — from deep interior consciousness to distant observation — regardless of which person (first, third) is used.",
          },
        ],
        writingPrompt: "Write the same scene three times: once in first person, once in close third person, once in omniscient. Notice how each POV changes what the reader knows and feels.",
      },
      {
        id: "unreliable-narrators",
        moduleId: "narrative-voice",
        title: "Unreliable Narrators",
        description: "When the voice telling the story can't be trusted — and why that creates powerful fiction.",
        content: `An unreliable narrator is a storyteller whose account cannot be taken at face value. They may lie, misremember, lack understanding, or be psychologically incapable of telling the truth. Unreliable narration is one of fiction's most powerful tools because it turns **reading into detective work**.

**Types of unreliable narrators:**

**The Liar** — Deliberately deceives the reader. Rare in its pure form, but devastating when revealed (Amy Dunne in *Gone Girl*).

**The Self-Deceiver** — Believes their own distortions. They're not lying to the reader — they're lying to themselves (Stevens in *The Remains of the Day*).

**The Naïf** — Tells the truth as they understand it, but lacks the knowledge or maturity to understand fully (Scout in *To Kill a Mockingbird*, Huckleberry Finn).

**The Madman** — Their perception of reality is fundamentally distorted by mental illness, obsession, or substance abuse (the narrator of *Fight Club*).

**How to signal unreliability:** Drop clues that the narrator's version doesn't add up. Contradictions, defensive over-explanations, gaps in the story, other characters reacting strangely to the narrator's claims. The reader should gradually suspect, then confirm, the unreliability.

**The payoff:** When unreliability is revealed, the reader re-reads the entire story mentally, discovering new meaning in every scene. This creates a deeply interactive reading experience.`,
        examples: [
          {
            title: "Gone Girl",
            source: "Gillian Flynn (2012)",
            text: "Flynn uses dual unreliable narrators: Nick's account is incomplete and self-serving, while Amy's diary is revealed to be a deliberate fabrication. The reader's trust is manipulated by both, creating a story about the stories we tell about ourselves. The mid-novel revelation forces a complete reassessment of everything read so far.",
          },
          {
            title: "Fight Club",
            source: "Chuck Palahniuk (1996)",
            text: "The narrator's unreliability is so extreme that he doesn't know he IS Tyler Durden. Palahniuk plants clues throughout — Tyler appearing at impossible times, characters addressing the narrator as Tyler — that only make sense on rereading. The twist recontextualizes the entire story as one man's internal war.",
          },
        ],
        quiz: [
          {
            question: "What type of unreliable narrator believes their own distortions?",
            options: [
              "The Liar",
              "The Self-Deceiver",
              "The Naïf",
              "The Madman",
            ],
            correctIndex: 1,
            explanation: "The Self-Deceiver narrator isn't deliberately lying to the reader — they've constructed a version of events they genuinely believe, but which the reader can see through.",
          },
          {
            question: "What makes the revelation of unreliability powerful?",
            options: [
              "It surprises the reader once",
              "It forces the reader to mentally re-read the entire story, finding new meaning",
              "It makes the story shorter",
              "It means the author can change the plot",
            ],
            correctIndex: 1,
            explanation: "When unreliability is revealed, every previous scene gains new meaning, forcing a mental re-read that creates a deeply interactive, layered experience unique to unreliable narration.",
          },
        ],
        writingPrompt: "Write a first-person scene where the narrator describes a 'wonderful' memory. But plant three subtle clues that suggest the memory is actually painful or traumatic, and the narrator is deceiving themselves.",
      },
      {
        id: "tone-and-style",
        moduleId: "narrative-voice",
        title: "Tone & Style",
        description: "The music of prose — how word choice, sentence structure, and rhythm create emotional atmosphere.",
        content: `Tone is the **emotional atmosphere** of a piece of writing. Style is the **how** — the specific techniques a writer uses to create that tone. Together, they form the "music" of prose that readers feel before they can articulate it.

**Elements of tone:**
- **Word choice (diction):** "Walked" vs. "trudged" vs. "sauntered" vs. "crept." Each carries emotional weight beyond its literal meaning.
- **Sentence length:** Short sentences create tension. Long sentences create flowing reflection. Varying between them creates rhythm.
- **Level of formality:** "The deceased expired at approximately 0300 hours" vs. "He died around three in the morning." Same event, different worlds.

**Finding your style:** Style isn't something you choose — it's something you **discover** through practice. Write enough, and patterns emerge: you'll gravitate toward certain sentence structures, certain kinds of images, certain rhythms. These patterns are your voice.

**The imitation exercise:** One of the best ways to discover your voice is to imitate others. Write a page in Hemingway's spare style, then Faulkner's ornate style, then Didion's precise style. What feels natural? What feels forced? The answer reveals your instincts.

**Consistency matters:** Tone shifts should be intentional, not accidental. A comic scene in a serious novel works if it's designed to provide relief. A sudden shift to portentous prose in a light comedy feels like a different writer took over.`,
        examples: [
          {
            title: "Raymond Carver's Minimalism",
            source: "What We Talk About When We Talk About Love (1981)",
            text: "Carver's style is famously spare: short sentences, common words, minimal description. But this simplicity creates devastating emotional weight. When characters in a Carver story say 'I love you,' the plainness of the language — surrounded by so much that's unsaid — makes the words vibrate with meaning. The style IS the tone: restrained, aching, quietly desperate.",
          },
          {
            title: "Toni Morrison's Lyrical Power",
            source: "Beloved (1987)",
            text: "Morrison's prose is the opposite of minimalism — rich, rhythmic, incantatory. 'Beloved, she my daughter. She mine.' The broken grammar carries the weight of unspeakable history. Her style blends folklore, history, and poetry into a voice that sounds like collective memory made audible.",
          },
        ],
        quiz: [
          {
            question: "What is the relationship between tone and style?",
            options: [
              "They are the same thing",
              "Tone is the emotional atmosphere; style is the technique used to create it",
              "Style is more important than tone",
              "Tone applies only to dialogue; style to narration",
            ],
            correctIndex: 1,
            explanation: "Tone is the emotional atmosphere (dark, comic, melancholy) while style is the specific techniques (word choice, sentence structure, rhythm) used to create that atmosphere.",
          },
          {
            question: "How do you discover your writing style?",
            options: [
              "Choose one from a list",
              "Copy your favorite author exactly",
              "Through practice — patterns emerge naturally over time",
              "Take a quiz",
            ],
            correctIndex: 2,
            explanation: "Style is discovered through practice, not chosen. As you write more, you naturally gravitate toward certain structures, images, and rhythms that become your distinctive voice.",
          },
        ],
        writingPrompt: "Write the same scene (a person sitting alone in a café) in three different tones: ominous, comic, and melancholic. Use only tone techniques — word choice, sentence length, and detail selection — to create each atmosphere.",
      },
      {
        id: "breaking-the-rules",
        moduleId: "narrative-voice",
        title: "Breaking the Rules",
        description: "When to shatter conventions — and how to do it in a way that creates meaning, not mess.",
        content: `Every technique in this course is a convention — a pattern that works because audiences recognize and respond to it. But some of the most powerful storytelling comes from **deliberately breaking these patterns**.

**The Golden Rule of Rule-Breaking:** You must understand a rule before you can meaningfully break it. A writer who ignores the three-act structure out of ignorance creates a confusing story. A writer who deliberately subverts it creates something revolutionary.

**Productive rule-breaking:**

**1. Breaking structure** — Pulp Fiction scrambles chronology. Memento runs backward. *Fleabag* breaks the fourth wall. Each of these works because the break serves the story's meaning — chronological chaos in *Pulp Fiction* reflects the randomness of violence; backward narrative in *Memento* creates empathy for a man without memory.

**2. Breaking expectations** — Killing a protagonist unexpectedly (Hitchcock's *Psycho*), revealing the villain as the hero, ending without resolution. Expectation breaks work when they force the audience to question assumptions.

**3. Breaking form** — Mixing genres, inserting non-fictional elements into fiction, changing POV mid-sentence, using unconventional formatting. *House of Leaves* uses page layout as a storytelling tool. These breaks work when form becomes meaning.

**When rule-breaking fails:** When it's done for novelty rather than purpose. Every broken convention should **earn its rebellion** — it should create meaning that couldn't exist within the convention. If you can't explain why the break makes the story better, it's probably not working.`,
        examples: [
          {
            title: "Fleabag (Fourth Wall Breaks)",
            source: "TV Series (2016-2019)",
            text: "Phoebe Waller-Bridge's direct addresses to camera break the fundamental rule that characters shouldn't acknowledge the audience. But this isn't gimmick — it reveals character. Fleabag's asides are her defense mechanism, her way of maintaining control and distance. When she finally CAN'T look at the camera (during genuine vulnerability), the broken rule's absence becomes the most powerful moment.",
          },
          {
            title: "No Country for Old Men (No Resolution)",
            source: "Cormac McCarthy (2005)",
            text: "McCarthy breaks the fundamental rule of protagonist survival — the hero doesn't just fail, he dies offscreen. The reader never even witnesses it. This refusal to satisfy conventional expectations IS the theme: violence in McCarthy's world is random, meaningless, and doesn't care about narrative structure. The broken rule creates meaning a conventional ending couldn't.",
          },
        ],
        quiz: [
          {
            question: "What is the 'Golden Rule' of rule-breaking in writing?",
            options: [
              "Break all rules all the time",
              "Never break any rules",
              "You must understand a rule before you can meaningfully break it",
              "Only break rules in the final chapter",
            ],
            correctIndex: 2,
            explanation: "You must understand conventions before breaking them — ignorant rule-breaking creates confusion, while informed, deliberate rule-breaking creates innovation and meaning.",
          },
          {
            question: "When does rule-breaking fail?",
            options: [
              "When readers notice it",
              "When it's done for novelty rather than purpose",
              "When the story is too long",
              "When more than one rule is broken",
            ],
            correctIndex: 1,
            explanation: "Rule-breaking fails when it's done for novelty or shock value rather than to create meaning that couldn't exist within the convention. Every break should earn its rebellion.",
          },
        ],
        writingPrompt: "Choose one 'rule' from this course (three-act structure, chronological order, reliable narrator, etc.) and deliberately break it in a short scene. Write a brief note explaining why the break serves the story.",
      },
    ],
  },
];

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getLessonById(
  moduleId: string,
  lessonId: string
): Lesson | undefined {
  const mod = getModuleById(moduleId);
  return mod?.lessons.find((l) => l.id === lessonId);
}

export interface TechniqueExample {
  title: string;
  source: string;
  description: string;
}

export interface Technique {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  examples: TechniqueExample[];
  relatedTechniques: string[];
  tips: string[];
}

export const categories = [
  "Structure",
  "Character",
  "Language",
  "Narrative",
  "Advanced",
] as const;

export type Category = (typeof categories)[number];

export const techniques: Technique[] = [
  // ---------------------------------------------------------------------------
  // STRUCTURE
  // ---------------------------------------------------------------------------
  {
    id: "foreshadowing",
    name: "Foreshadowing",
    category: "Structure",
    description:
      "A literary device in which a writer gives an advance hint of what is to come later in the story, building anticipation and tension.",
    longDescription: `Foreshadowing is one of the most fundamental tools in a storyteller's arsenal. It involves planting subtle clues, symbols, or statements early in a narrative that hint at events, revelations, or outcomes that will unfold later. When executed well, foreshadowing creates a sense of inevitability -- readers feel, upon reflection, that the ending was always woven into the beginning. It operates on two levels simultaneously: on a first reading it generates subconscious tension, and on a re-read it rewards attentive audiences with a satisfying sense of cohesion.

There are several forms of foreshadowing. Direct foreshadowing makes an overt statement or prediction about the future ("Something terrible was about to happen"). Indirect foreshadowing is far more subtle, relying on imagery, dialogue, setting, or mood to suggest what lies ahead without stating it explicitly. Symbolic foreshadowing uses recurring motifs -- a withering flower, a cracked mirror, a gathering storm -- to telegraph thematic developments. The best writers layer multiple forms together so that the narrative feels both surprising and earned.

The key danger with foreshadowing is calibration. Too heavy-handed and the audience predicts the twist long before it arrives, draining the story of surprise. Too subtle and the payoff feels random or unearned. The ideal foreshadowing is invisible on first encounter and unmistakable in hindsight. Writers should revisit their foreshadowing during revision, adjusting intensity until the clues feel like natural parts of the story rather than signposts.`,
    examples: [
      {
        title: "The storm and the green light",
        source: "The Great Gatsby by F. Scott Fitzgerald",
        description:
          "The green light at the end of Daisy's dock, introduced in Chapter 1, foreshadows Gatsby's unattainable dream and the tragic conclusion of his obsessive pursuit.",
      },
      {
        title: "The opening prophecy",
        source: "Macbeth by William Shakespeare",
        description:
          "The witches' prophecy in Act 1 foreshadows the entire trajectory of Macbeth's rise and fall, planting seeds of ambition that grow into tyranny and self-destruction.",
      },
      {
        title: "Rosebud",
        source: "Citizen Kane (1941)",
        description:
          "The dying whisper of 'Rosebud' in the film's opening scene foreshadows the revelation that Kane's deepest longing was for the innocent childhood torn away from him.",
      },
    ],
    relatedTechniques: ["chekhov-gun", "bookending", "in-medias-res"],
    tips: [
      "Plant foreshadowing details early enough that readers have time to forget them consciously but retain them subconsciously -- the middle of an unrelated scene is often the best hiding spot.",
      "Use sensory details and atmosphere rather than direct statements to keep foreshadowing subtle; a change in weather, an offhand remark, or an unexplained object can all serve as quiet signals.",
      "During revision, read your ending first, then go back to the beginning and ask: does the story feel inevitable? Add or adjust hints until it does.",
    ],
  },
  {
    id: "in-medias-res",
    name: "In Medias Res",
    category: "Structure",
    description:
      "A narrative technique that begins the story in the middle of the action, rather than at the chronological beginning, immediately immersing the audience.",
    longDescription: `In medias res -- Latin for "into the middle of things" -- is a structural technique in which the narrative opens at a critical or dramatic point in the storyline, bypassing the conventional exposition that would normally precede it. The audience is dropped into a moment of tension, conflict, or consequence, and the backstory is filled in later through flashbacks, dialogue, or gradual revelation. This approach has roots stretching back to Homer's Iliad and Odyssey, and it remains one of the most effective ways to hook an audience from the very first line.

The power of in medias res lies in its ability to generate immediate engagement. By starting with action, emotion, or mystery, the writer sidesteps the risk of slow, exposition-heavy openings that can lose readers before the story gains momentum. It also creates a natural structural tension: the audience knows something important has already happened, and they read forward both to discover what happens next and to understand what came before. This dual curiosity drives the narrative with remarkable efficiency.

However, in medias res demands careful management of information. The writer must reveal backstory at precisely the right moments -- enough to keep the audience oriented, but not so much that the pacing stalls. There is also a risk of disorientation if the opening is too chaotic or if the characters and stakes are not quickly established. The most successful uses of this technique balance the thrill of the plunge with small anchoring details that give the reader just enough context to care about what is happening.`,
    examples: [
      {
        title: "Opening with the plane crash",
        source: "Lost (TV Series, 2004-2010)",
        description:
          "The pilot episode opens with Jack Shephard waking up in a bamboo grove after a plane crash, immediately immersing viewers in chaos and survival before gradually revealing the characters' backstories.",
      },
      {
        title: "The Odyssey's structure",
        source: "The Odyssey by Homer",
        description:
          "Homer begins the epic not at the fall of Troy but with Odysseus stranded on Calypso's island, years into his journey home, and recounts earlier adventures through retrospective narration.",
      },
      {
        title: "Opening with Walter White in the desert",
        source: "Breaking Bad (TV Series, 2008-2013)",
        description:
          "The pilot opens with a pantsless Walter White driving an RV through the desert with unconscious bodies in the back, then rewinds to show how a mild-mannered chemistry teacher reached this point.",
      },
    ],
    relatedTechniques: ["foreshadowing", "frame-narrative", "unreliable-narrator"],
    tips: [
      "Choose your opening moment carefully -- it should be dramatic enough to hook the reader but not so far into the story that the audience has no foothold for understanding characters or stakes.",
      "Resist the urge to dump exposition immediately after the opening scene; let the reader sit with questions for a while before answering them.",
      "Use brief sensory anchors in the opening (a smell, a sound, a physical sensation) to ground the reader in the scene even before they understand the full context.",
    ],
  },
  {
    id: "chekhov-gun",
    name: "Chekhov's Gun",
    category: "Structure",
    description:
      "The principle that every element introduced in a story must be relevant; if a gun is shown in Act 1, it must be fired by Act 3.",
    longDescription: `Chekhov's Gun is a dramatic principle derived from the advice of Russian playwright Anton Chekhov, who stated: "If in the first act you have hung a pistol on the wall, then in the following one it should be fired. Otherwise don't put it there." At its core, the principle asserts that every detail in a narrative should serve a purpose. Objects, characters, dialogue, and settings that are introduced with emphasis should eventually pay off in a meaningful way. This creates a tight, economical narrative where nothing is wasted and every element contributes to the whole.

The principle operates as a contract between writer and audience. When a storyteller draws attention to something -- a locked drawer, a character's unusual skill, a seemingly throwaway line of dialogue -- the audience registers it as potentially important. If the detail never pays off, the audience feels cheated or confused. If it pays off brilliantly, the audience experiences a deep sense of satisfaction. This is why Chekhov's Gun is closely related to foreshadowing, but it is more prescriptive: foreshadowing hints at future events, while Chekhov's Gun demands that introduced elements must become relevant.

Writers can also use this principle in reverse as a tool for revision. After completing a draft, examine every significant detail, prop, skill, or character trait that receives narrative emphasis. If it does not contribute to the plot, theme, or character development, either remove it or find a way to make it matter. Conversely, if a critical plot point relies on something that was never properly set up, go back and plant it. This bidirectional application of the principle is one of the most powerful editing strategies available to any storyteller.`,
    examples: [
      {
        title: "The Maltese Falcon itself",
        source: "The Maltese Falcon by Dashiell Hammett",
        description:
          "The titular falcon statuette is introduced early as the object of obsessive desire for multiple characters, and the entire plot revolves around its pursuit, delivery, and ultimate reveal.",
      },
      {
        title: "The time-turner",
        source: "Harry Potter and the Prisoner of Azkaban by J.K. Rowling",
        description:
          "Hermione's time-turner is introduced as an explanation for her impossible class schedule, then becomes the pivotal device that allows Harry and Hermione to save Sirius Black and Buckbeak.",
      },
      {
        title: "The pen in the pocket",
        source: "The Bourne Identity (2002)",
        description:
          "Early scenes show Jason Bourne reflexively assessing threats and improvising weapons from ordinary objects, setting up that any item in his environment -- including a pen -- can become a lethal tool.",
      },
    ],
    relatedTechniques: ["foreshadowing", "macguffin", "bookending"],
    tips: [
      "During revision, make a list of every object, skill, or detail you have emphasized and verify that each one plays a role later -- if it does not, cut it or connect it.",
      "Introduce your 'guns' casually, embedded in scenes that serve other purposes, so they feel like natural parts of the world rather than obvious setups.",
      "Remember that Chekhov's Gun applies to character traits and relationships too, not just physical objects -- an established fear, skill, or grudge should eventually matter to the plot.",
    ],
  },
  {
    id: "macguffin",
    name: "The MacGuffin",
    category: "Structure",
    description:
      "An object, device, or event that is necessary to the plot and the motivation of the characters, but insignificant or irrelevant in itself.",
    longDescription: `The MacGuffin is a concept popularized by filmmaker Alfred Hitchcock, who described it as the thing the characters care about but the audience need not. It is the briefcase everyone is chasing, the secret formula the spies are after, the treasure map the pirates are following. The MacGuffin's specific nature is often unimportant -- what matters is that the characters want it badly enough to drive the plot forward. Its function is purely motivational: it sets characters in motion, creates conflict, and provides stakes, but the story's true substance lies in the characters' actions, relationships, and transformations.

The beauty of the MacGuffin lies in its versatility. It can be a physical object (a glowing briefcase, a ring of power, a stolen necklace), a piece of information (launch codes, a secret identity, a hidden location), or even an abstract goal (world domination, the meaning of "Rosebud"). What unites all MacGuffins is that they could often be swapped for something entirely different without fundamentally changing the story's emotional or thematic core. The audience follows the story not because they care about the object but because they care about the people pursuing it.

However, the MacGuffin is not an excuse for lazy plotting. Even though the audience does not need to care about the MacGuffin itself, the characters must care about it convincingly. If the characters' desire for the MacGuffin feels arbitrary or unmotivated, the entire plot collapses. The writer's job is to make the pursuit feel urgent and the stakes feel real, even while the specific nature of the prize remains secondary to the human drama surrounding it.`,
    examples: [
      {
        title: "The glowing briefcase",
        source: "Pulp Fiction (1994)",
        description:
          "The contents of the briefcase Vincent and Jules are retrieving are never revealed. It does not matter what is inside -- what matters is the chain of events and character interactions its pursuit triggers.",
      },
      {
        title: "The One Ring",
        source: "The Lord of the Rings by J.R.R. Tolkien",
        description:
          "While the Ring has thematic significance as a symbol of corrupting power, it also functions as a MacGuffin that motivates the entire quest, driving characters across Middle-earth.",
      },
      {
        title: "The stolen money",
        source: "Psycho (1960)",
        description:
          "Marion Crane's theft of $40,000 drives the first act and brings her to the Bates Motel, but after her death the money becomes irrelevant -- its only purpose was to set the real story in motion.",
      },
    ],
    relatedTechniques: ["chekhov-gun", "foreshadowing", "in-medias-res"],
    tips: [
      "Do not spend excessive time explaining the MacGuffin's mechanics or backstory -- keep the focus on how the characters react to it and what they are willing to do to obtain it.",
      "Make sure every major character has a clear, emotionally grounded reason for wanting (or fearing) the MacGuffin, even if the object itself is vague or abstract.",
      "Consider whether your MacGuffin could carry additional thematic weight; the best MacGuffins work on multiple levels, serving as both a plot engine and a symbol.",
    ],
  },
  {
    id: "bookending",
    name: "Bookending",
    category: "Structure",
    description:
      "A structural technique where the story opens and closes with similar or mirrored scenes, images, or phrases, creating a sense of completeness and thematic resonance.",
    longDescription: `Bookending, also known as a frame or envelope structure, is the practice of beginning and ending a story with parallel scenes, images, phrases, or situations. The closing scene echoes or mirrors the opening, but the intervening narrative has transformed the meaning of what we see. A character may return to the same physical location, repeat the same words, or face the same choice -- but because of everything that has happened, the repetition carries entirely different weight. This creates a powerful sense of closure and circularity, signaling to the audience that the story's journey is complete.

The technique works because human beings are pattern-recognition creatures. When we encounter a familiar element at the end of a story, our minds automatically compare it to its first appearance, and the contrast between the two instances becomes the emotional payload of the ending. A protagonist who begins the story sitting alone in a bar and ends the story sitting alone in the same bar has not simply returned to the starting point -- the audience reads into that repetition everything the character has gained, lost, or failed to change. The bookend becomes a lens through which the entire narrative is refocused.

Bookending can operate at many scales. It can be as large as an entire framing device (a character telling the story to someone, then returning to the present) or as small as a repeated phrase or visual motif. It can be used to show growth (the same situation handled differently), tragedy (the same mistake repeated), or irony (the same words meaning something entirely different). The technique is especially effective when combined with thematic development, as the bookend can crystallize the story's central argument in a single, resonant moment of comparison.`,
    examples: [
      {
        title: "The snow globe and 'Rosebud'",
        source: "Citizen Kane (1941)",
        description:
          "The film opens with Kane's death and his whispered 'Rosebud,' then closes with the revelation of what Rosebud was -- a sled from his childhood -- bringing the story full circle from mystery to melancholy understanding.",
      },
      {
        title: "The Shire, beginning and end",
        source: "The Lord of the Rings by J.R.R. Tolkien",
        description:
          "The story begins and ends in the Shire, but the returning hobbits are profoundly changed. The peaceful setting is the same, but the characters' relationship to it has been transformed by war and loss.",
      },
      {
        title: "'My name is Forrest Gump'",
        source: "Forrest Gump (1994)",
        description:
          "The film opens and closes with a feather drifting on the wind and Forrest sitting on a bench. The visual symmetry reinforces the film's themes of chance, destiny, and the passage of time.",
      },
    ],
    relatedTechniques: ["foreshadowing", "chekhov-gun", "frame-narrative"],
    tips: [
      "Write your opening and closing scenes side by side during revision and look for opportunities to create deliberate parallels in setting, dialogue, imagery, or action.",
      "The most powerful bookends show contrast, not just repetition -- the same situation should feel fundamentally different because of the journey between the two moments.",
      "Avoid being too on-the-nose; a bookend that is too identical to the opening can feel mechanical. Introduce small but meaningful variations that reflect the story's transformation.",
    ],
  },

  // ---------------------------------------------------------------------------
  // CHARACTER
  // ---------------------------------------------------------------------------
  {
    id: "antihero",
    name: "The Antihero",
    category: "Character",
    description:
      "A protagonist who lacks conventional heroic attributes such as idealism, morality, or courage, yet remains compelling through complexity and relatability.",
    longDescription: `The antihero is a protagonist who defies the traditional mold of the noble, virtuous, selfless hero. Antiheroes may be morally ambiguous, self-interested, cowardly, dishonest, or even cruel -- yet they occupy the center of the narrative and command the audience's attention, sympathy, or fascination. They exist on a spectrum: some antiheroes are fundamentally decent people with significant flaws (a reluctant detective with a drinking problem), while others are deeply immoral figures whose intelligence, charisma, or circumstances make them compelling despite their actions (a drug kingpin, a contract killer). What unites all antiheroes is the tension between their role as protagonist and their departure from heroic virtue.

The antihero has become one of the defining character types of modern storytelling, particularly in the era of prestige television and literary fiction. This is because antiheroes offer something that traditional heroes often cannot: moral complexity. Audiences are drawn to characters who reflect the messy, contradictory nature of real human beings -- people who do terrible things for understandable reasons, who want to be good but keep failing, or who have simply abandoned the pretense of goodness altogether. The antihero forces the audience to examine their own moral boundaries and ask uncomfortable questions about who they are willing to root for and why.

Writing an effective antihero requires a delicate balance. The character must be flawed enough to be genuinely transgressive -- if their "flaws" are too mild or charming, they become a conventional hero with quirks rather than a true antihero. At the same time, the writer must provide enough humanity, vulnerability, or understandable motivation to keep the audience engaged. This can be achieved through backstory (showing how the character was shaped by trauma or injustice), through relationships (showing who the character cares about despite their ruthlessness), or through glimpses of self-awareness (the character knowing they are wrong but being unable to stop). The antihero's power lies in the audience's conflicted response to them.`,
    examples: [
      {
        title: "Walter White",
        source: "Breaking Bad (TV Series, 2008-2013)",
        description:
          "Walter White begins as a sympathetic, terminally ill teacher but progressively transforms into a ruthless drug lord, forcing the audience to grapple with when -- and whether -- they stop rooting for him.",
      },
      {
        title: "Jay Gatsby",
        source: "The Great Gatsby by F. Scott Fitzgerald",
        description:
          "Gatsby is charismatic and romantic but also a liar, a bootlegger, and a man so obsessed with recapturing the past that he destroys himself and those around him.",
      },
      {
        title: "Amy Dunne",
        source: "Gone Girl by Gillian Flynn",
        description:
          "Amy Dunne is manipulative, vindictive, and willing to frame her husband for murder, yet her intelligence and the novel's exploration of toxic gender dynamics make her a riveting antihero.",
      },
    ],
    relatedTechniques: ["foil-characters", "character-revelation", "unreliable-narrator"],
    tips: [
      "Give your antihero at least one quality or relationship that humanizes them -- a love for their child, a code of honor, a moment of genuine vulnerability -- to prevent them from becoming a villain protagonist that the audience cannot invest in.",
      "Let the audience see the antihero's internal conflict; even if they choose wrongly every time, the fact that they wrestle with the choice makes them more compelling than someone who never considers morality at all.",
      "Track the audience's sympathy like a meter: push it too far in the negative direction and readers will disengage, but push it too far positive and you lose the transgressive edge that makes the antihero interesting.",
    ],
  },
  {
    id: "foil-characters",
    name: "Foil Characters",
    category: "Character",
    description:
      "A character who contrasts with the protagonist in order to highlight particular qualities, traits, or themes through juxtaposition.",
    longDescription: `A foil character is one whose qualities -- personality, values, background, choices -- are set in deliberate contrast to another character, usually the protagonist, in order to throw the protagonist's traits into sharper relief. The term comes from the practice of placing a thin sheet of metal foil behind a gemstone to make it shine more brightly, and literary foils serve exactly the same function: they make the central character's defining qualities more visible and vivid through comparison. Foils do not need to be antagonists; they can be friends, siblings, mentors, or even minor characters whose brief appearances illuminate something important about the lead.

The power of the foil lies in implicit characterization. Rather than telling the audience that a protagonist is brave, the writer can show a foil character who is cowardly in the same situation. Rather than explaining that a character values family above all else, the writer can present a foil who has abandoned theirs. The contrast does the expository work without a word of direct description, and it engages the audience's analytical mind -- they draw the comparison themselves and feel clever for noticing it. This makes foil-based characterization feel more organic and sophisticated than explicit statement.

Effective foils share enough common ground with the protagonist to make the comparison meaningful. Two characters who have nothing in common are simply different; two characters who share a background, a goal, or a situation but diverge in their responses to it are true foils. The most memorable foils in literature are those who could have become the protagonist under different circumstances -- or who represent the path the protagonist chose not to take. This "there but for the grace of God" quality gives the foil relationship its emotional and thematic depth.`,
    examples: [
      {
        title: "Draco Malfoy and Harry Potter",
        source: "Harry Potter series by J.K. Rowling",
        description:
          "Both boys are the same age, attend the same school, and come from notable wizarding families, but their opposite choices regarding loyalty, courage, and prejudice define each other through contrast.",
      },
      {
        title: "Tom Buchanan and Jay Gatsby",
        source: "The Great Gatsby by F. Scott Fitzgerald",
        description:
          "Both men are wealthy and pursuing Daisy, but Tom's inherited, careless privilege contrasts with Gatsby's self-made, desperate romanticism, illuminating the novel's critique of the American Dream.",
      },
      {
        title: "Sherlock Holmes and Dr. Watson",
        source: "Sherlock Holmes stories by Arthur Conan Doyle",
        description:
          "Watson's warmth, practicality, and emotional intelligence serve as a foil to Holmes's cold brilliance, making Holmes's extraordinary mind more apparent by contrast with a relatable, ordinary perspective.",
      },
    ],
    relatedTechniques: ["antihero", "character-revelation", "mentor-archetype"],
    tips: [
      "Give your foil and protagonist a shared starting point -- the same school, the same event, the same choice -- so the audience can clearly see where their paths diverge and why.",
      "Avoid making the foil a one-dimensional opposite; foils are most effective when they are fully realized characters in their own right, not just mirrors designed to reflect the protagonist.",
      "Use scenes where the foil and protagonist are in the same situation and respond differently to let the contrast emerge through action rather than through narration or exposition.",
    ],
  },
  {
    id: "character-revelation",
    name: "Character Revelation",
    category: "Character",
    description:
      "The technique of gradually revealing a character's true nature, backstory, or motivations through carefully timed disclosures rather than upfront exposition.",
    longDescription: `Character revelation is the art of peeling back layers of a character over the course of a narrative, allowing the audience to discover who the character truly is through a series of carefully orchestrated disclosures. Rather than introducing a character with a comprehensive biography and psychological profile, the writer withholds key information -- a hidden motivation, a secret past, a concealed identity, a suppressed emotion -- and reveals it at moments of maximum dramatic impact. Each revelation reshapes the audience's understanding of the character and, by extension, the story itself.

This technique works because it mirrors how we come to know real people. In life, we form first impressions based on surface behavior, then gradually revise our understanding as we learn more about someone's history, fears, desires, and contradictions. Fiction that replicates this process feels psychologically authentic. It also creates an addictive narrative rhythm: each revelation answers one question while raising others, pulling the reader forward with the promise of deeper understanding. The most satisfying character revelations are those that recontextualize earlier scenes -- moments that seemed straightforward are suddenly revealed to have been charged with hidden significance.

The timing and sequencing of revelations is critical. Reveal too much too early and the character loses their mystery; withhold too much for too long and the audience becomes frustrated or disengaged. The ideal approach is to provide enough information at each stage for the audience to form a working theory about the character, then periodically upend that theory with new information. This creates a dynamic relationship between audience and character, one defined by evolving understanding rather than static knowledge. Writers should map out their revelation arc as carefully as they map out their plot arc, ensuring that each disclosure serves both character development and narrative momentum.`,
    examples: [
      {
        title: "Severus Snape's true allegiance",
        source: "Harry Potter series by J.K. Rowling",
        description:
          "Across seven books, Snape appears to be an antagonist, a bully, and possibly a traitor, but the final revelation of his enduring love for Lily Potter reframes every action he has taken throughout the series.",
      },
      {
        title: "The Darth Vader reveal",
        source: "Star Wars: The Empire Strikes Back (1980)",
        description:
          "The revelation that Darth Vader is Luke's father is one of cinema's most famous character revelations, fundamentally transforming the audience's understanding of both characters and the entire saga.",
      },
      {
        title: "Amy's diary entries",
        source: "Gone Girl by Gillian Flynn",
        description:
          "The novel's midpoint revelation that Amy's diary entries were fabricated forces the reader to completely reassess her character, transforming her from apparent victim to calculating manipulator.",
      },
    ],
    relatedTechniques: ["unreliable-narrator", "antihero", "foil-characters"],
    tips: [
      "Map your character's revelations on a timeline alongside your plot outline and ensure that each major disclosure coincides with a turning point or moment of high tension.",
      "After writing a revelation scene, go back through earlier chapters and plant subtle details that will take on new meaning once the revelation is known -- this rewards re-readers and deepens the narrative.",
      "Let characters reveal themselves through choices under pressure rather than through confession or flashback; what a character does when cornered tells the audience more than any backstory monologue.",
    ],
  },
  {
    id: "mentor-archetype",
    name: "The Mentor Archetype",
    category: "Character",
    description:
      "A wise, experienced character who guides the protagonist, providing knowledge, training, or moral direction before the hero must face challenges alone.",
    longDescription: `The mentor archetype is one of the oldest and most enduring character types in storytelling, identified by mythologist Joseph Campbell as a key figure in the "Hero's Journey" framework. The mentor is a character who possesses knowledge, wisdom, or skills that the protagonist lacks and who serves as a guide, teacher, or protector during the early stages of the hero's transformation. Mentors may be wizards, teachers, parents, coaches, or even unlikely figures like bartenders and strangers on trains -- what defines them is their function in the narrative: they prepare the protagonist for the challenges ahead.

The mentor serves multiple narrative purposes simultaneously. On a practical level, the mentor provides exposition -- they explain the rules of the story's world, the nature of the threat, and the skills the protagonist will need. On an emotional level, the mentor represents safety, authority, and the comfort of having someone more capable to rely on. This is precisely why the mentor must eventually step aside, be incapacitated, or die: the protagonist's growth requires them to face the final challenge without the mentor's protection. The removal of the mentor is one of the most emotionally powerful beats in storytelling because it forces both the hero and the audience to confront the terrifying possibility that the student may not be ready.

The most compelling mentors are those who are flawed, conflicted, or carrying burdens of their own. A mentor who is perfect and all-knowing can feel more like a plot device than a character. But a mentor who has failed before, who carries guilt or regret, who sees in the protagonist a chance to correct their own past mistakes -- this is a mentor who resonates on a human level. The mentor's own arc, even if it is secondary to the protagonist's, should reflect the story's themes. Their sacrifice or departure should feel not just narratively necessary but emotionally inevitable, the completion of a journey that began long before the protagonist entered their life.`,
    examples: [
      {
        title: "Gandalf",
        source: "The Lord of the Rings by J.R.R. Tolkien",
        description:
          "Gandalf guides Frodo and the Fellowship, providing wisdom and protection, but his apparent death in Moria forces the hobbits to find courage and leadership within themselves.",
      },
      {
        title: "Obi-Wan Kenobi",
        source: "Star Wars: A New Hope (1977)",
        description:
          "Obi-Wan introduces Luke to the Force and his father's legacy, then sacrifices himself in the confrontation with Vader, forcing Luke to complete his journey without his guide.",
      },
      {
        title: "Haymitch Abernathy",
        source: "The Hunger Games by Suzanne Collins",
        description:
          "Haymitch is a deeply flawed mentor -- an alcoholic and a cynic -- but his own traumatic experience as a Games victor gives his guidance authenticity and his investment in Katniss emotional weight.",
      },
    ],
    relatedTechniques: ["antihero", "foil-characters", "character-revelation"],
    tips: [
      "Give your mentor a personal stake in the protagonist's success that goes beyond duty -- guilt, love, a desire for redemption -- so that their mentorship feels emotionally motivated rather than purely functional.",
      "Plan the mentor's exit carefully; whether they die, betray, or simply step aside, the timing should coincide with the moment the protagonist is ready to be tested alone, but not so ready that the loss feels painless.",
      "Avoid the trap of the infallible mentor; give them blind spots, old wounds, or outdated assumptions that the protagonist must eventually see past, allowing the student to surpass the teacher.",
    ],
  },

  // ---------------------------------------------------------------------------
  // LANGUAGE
  // ---------------------------------------------------------------------------
  {
    id: "show-dont-tell",
    name: "Show Don't Tell",
    category: "Language",
    description:
      "The principle of conveying information through action, sensory detail, and dialogue rather than through direct exposition or summary.",
    longDescription: `"Show, don't tell" is perhaps the most frequently cited principle in creative writing instruction, and for good reason: it addresses the fundamental challenge of engaging an audience's imagination rather than merely informing their intellect. To "tell" is to state facts directly -- "She was angry," "The room was old," "He was a kind man." To "show" is to present evidence from which the reader can draw those conclusions independently -- "She slammed the door so hard the hinges rattled," "Dust motes hung in the bars of light that filtered through cracked shutters," "He stayed after closing to help the janitor stack chairs." Showing transforms the reader from a passive recipient of information into an active participant in the story.

The principle works because of how human cognition processes narrative. When readers are told something, they register it as information. When they are shown something, they experience it -- they see, hear, feel, and interpret. This experiential engagement creates stronger emotional responses, more vivid mental images, and better retention. It also builds trust between writer and reader: showing demonstrates confidence in the reader's intelligence and rewards their attention, while excessive telling can feel condescending or lazy. The best writing trusts the reader to understand a character's emotion from their behavior rather than labeling it.

However, "show, don't tell" is a guideline, not an absolute law. There are moments when telling is the right choice: transitional passages, summaries of less important events, conveying information that would be awkward to dramatize, or establishing context quickly so the narrative can move to a more important scene. The skill lies in knowing when to show and when to tell. As a general rule, show the moments that matter most -- emotional turning points, key decisions, revelations -- and tell the connective tissue between them. A story that shows everything is exhausting; a story that tells everything is lifeless. The ideal narrative is a dynamic interplay of both.`,
    examples: [
      {
        title: "The opening paragraph",
        source: "1984 by George Orwell",
        description:
          "Instead of stating 'The society was oppressive,' Orwell shows a clock striking thirteen, the smell of boiled cabbage, and a poster of Big Brother with eyes that follow you -- sensory details that let the reader feel the dystopia.",
      },
      {
        title: "The dinner scene",
        source: "Revolutionary Road by Richard Yates",
        description:
          "Yates never tells the reader that Frank and April Wheeler's marriage is disintegrating; instead, he shows their strained silences, forced smiles, and the way they perform happiness for their neighbors.",
      },
      {
        title: "Conveying grief through action",
        source: "Manchester by the Sea (2016)",
        description:
          "Lee Chandler's overwhelming grief is never explicitly narrated; it is shown through his hunched posture, monosyllabic responses, and the way he flinches from any emotional connection.",
      },
    ],
    relatedTechniques: ["pathetic-fallacy", "stream-of-consciousness", "character-revelation"],
    tips: [
      "When you find yourself writing emotion words like 'angry,' 'sad,' or 'excited,' pause and ask: what does this character DO when they feel this way? Replace the label with the behavior.",
      "Engage multiple senses in your showing -- not just sight but sound, smell, touch, and taste -- to create a fully immersive experience that pulls the reader into the scene.",
      "After drafting a scene, highlight every instance of telling and evaluate each one: does this need to be dramatized, or is it efficiently handling transition or context? Keep the tells that serve pacing, and convert the ones that shortchange important moments.",
    ],
  },
  {
    id: "stream-of-consciousness",
    name: "Stream of Consciousness",
    category: "Language",
    description:
      "A narrative mode that attempts to capture the natural flow of a character's thoughts, impressions, and sensory experiences as they occur, often without conventional syntax or structure.",
    longDescription: `Stream of consciousness is a literary technique that seeks to reproduce the unfiltered, continuous flow of a character's mental experience on the page. Unlike conventional narration, which organizes thoughts into coherent sequences and grammatically correct sentences, stream of consciousness mimics the way the mind actually works: associatively, digressively, and often illogically. Thoughts bleed into memories, sensory impressions interrupt reasoning, emotions color perception, and the boundaries between past and present, self and world, become fluid. The technique was pioneered by modernist writers in the early twentieth century and remains one of the most ambitious methods of psychological realism available to fiction writers.

The power of stream of consciousness lies in its intimacy. No other narrative mode places the reader so deeply inside a character's subjective experience. Traditional narration describes a character's thoughts from a slight remove, even in first person; stream of consciousness eliminates that remove entirely. The reader does not learn what the character is thinking -- they think alongside the character, experiencing the same chaotic, unstructured flow of consciousness. This creates an extraordinarily powerful sense of empathy and identification, as the reader inhabits the character's perspective rather than observing it.

The technique is also one of the most challenging to execute well. Unstructured thought, recorded faithfully, can quickly become incomprehensible or tedious. The writer must find a balance between authentic cognitive chaos and narrative readability -- shaping the stream without appearing to shape it, selecting and arranging thoughts to create meaning and momentum while maintaining the illusion of spontaneous mental flow. Punctuation, syntax, paragraph structure, and even typography become expressive tools: long, unpunctuated passages convey rushing thought; fragmented sentences convey shock or dissociation; sudden shifts in tense or perspective convey memory intruding on the present. The technique demands enormous technical skill and a deep understanding of the character's psychology.`,
    examples: [
      {
        title: "Molly Bloom's soliloquy",
        source: "Ulysses by James Joyce",
        description:
          "The final chapter of Ulysses is a nearly unpunctuated, 24,000-word interior monologue that flows through Molly Bloom's memories, desires, and sensory impressions as she lies in bed, ending with the famous affirmation 'yes I said yes I will Yes.'",
      },
      {
        title: "Benjy's section",
        source: "The Sound and the Fury by William Faulkner",
        description:
          "The novel's first section is narrated through the stream of consciousness of Benjy Compson, a man with an intellectual disability, whose thoughts flow between past and present without warning, capturing a unique and disorienting cognitive experience.",
      },
      {
        title: "Mrs. Dalloway's walk through London",
        source: "Mrs Dalloway by Virginia Woolf",
        description:
          "Woolf follows Clarissa Dalloway's thoughts as she walks through London, with her mind flowing seamlessly between present sensory experience and memories of her youth, weaving together public and private worlds.",
      },
    ],
    relatedTechniques: ["show-dont-tell", "unreliable-narrator", "pathetic-fallacy"],
    tips: [
      "Anchor the stream of consciousness to sensory triggers -- a sound, a smell, a texture -- that naturally cause the character's mind to leap from the present moment to a memory or association, giving the reader a logic to follow even in apparent chaos.",
      "Use punctuation and sentence structure as expressive tools: longer, flowing sentences for relaxed or expansive thinking; fragments and abrupt breaks for anxiety, shock, or distraction.",
      "Do not sustain stream of consciousness for the entire narrative unless you are very confident in your ability to maintain readability; alternating between stream of consciousness passages and more conventionally narrated sections can give the reader breathing room.",
    ],
  },
  {
    id: "pathetic-fallacy",
    name: "Pathetic Fallacy",
    category: "Language",
    description:
      "The attribution of human emotions or responses to nature, weather, or inanimate objects, typically to mirror or amplify a character's inner state.",
    longDescription: `Pathetic fallacy, a term coined by Victorian critic John Ruskin, refers to the literary practice of projecting human emotions onto the non-human world -- making the weather, landscape, or objects reflect or amplify the emotional state of the characters or the mood of the narrative. When storm clouds gather as a villain approaches, when rain falls during a funeral, when spring blossoms accompany a love scene -- these are all instances of pathetic fallacy. The technique treats the natural world as an emotional mirror, creating a sense that the universe itself is participating in the story's drama.

The technique is effective because it works on the reader at an almost subconscious level. Even readers who would never consciously believe that nature responds to human emotion are conditioned by a lifetime of storytelling to associate certain weather and environmental conditions with certain moods. Darkness signals danger or mystery. Sunlight signals hope or clarity. Fog signals confusion or moral ambiguity. Winter signals death or stagnation; spring signals rebirth or renewal. By aligning the physical environment with the emotional content of a scene, the writer creates a unified sensory and emotional experience that reinforces the narrative's impact without drawing attention to itself.

The danger of pathetic fallacy lies in its overuse and its predictability. If every sad scene is accompanied by rain and every happy scene by sunshine, the technique becomes a cliche that distances the reader rather than immersing them. Skilled writers use pathetic fallacy selectively and sometimes subversively -- placing a moment of profound grief under a brilliant blue sky, for instance, so that the contrast between inner turmoil and outer indifference becomes the source of emotional power. They also use the technique with specificity, choosing environmental details that are evocative and original rather than relying on the most obvious weather-mood pairings.`,
    examples: [
      {
        title: "The storm on the heath",
        source: "King Lear by William Shakespeare",
        description:
          "The violent storm that rages while Lear descends into madness on the heath mirrors his inner turmoil, with the chaos of nature reflecting the chaos of a king losing his mind and his kingdom.",
      },
      {
        title: "The oppressive heat",
        source: "Do the Right Thing (1989)",
        description:
          "Spike Lee uses the relentless, escalating heat of a Brooklyn summer day as a physical manifestation of rising racial tensions, with the temperature and the conflict both building toward an explosive climax.",
      },
      {
        title: "The moors and the characters",
        source: "Wuthering Heights by Emily Bronte",
        description:
          "The wild, windswept Yorkshire moors mirror the passionate, untamed natures of Heathcliff and Catherine, while the cultivated Thrushcross Grange reflects the restrained civility of the Linton family.",
      },
    ],
    relatedTechniques: ["show-dont-tell", "foreshadowing", "stream-of-consciousness"],
    tips: [
      "Choose environmental details that are specific and fresh rather than defaulting to obvious pairings like rain for sadness; a buzzing fluorescent light, a wilting houseplant, or an empty parking lot can be just as emotionally evocative.",
      "Consider using pathetic fallacy in counterpoint -- cheerful weather during a tragic scene, or a beautiful landscape during a moment of moral corruption -- to create ironic tension that deepens the emotional complexity.",
      "Integrate environmental descriptions seamlessly into the action and the character's perception rather than pausing the narrative for a weather report; let the character notice the environment in ways that reveal their state of mind.",
    ],
  },

  // ---------------------------------------------------------------------------
  // NARRATIVE
  // ---------------------------------------------------------------------------
  {
    id: "unreliable-narrator",
    name: "Unreliable Narrator",
    category: "Narrative",
    description:
      "A narrator whose credibility is compromised, whether through intentional deception, limited knowledge, personal bias, or mental instability, forcing the reader to question the truth of the story.",
    longDescription: `An unreliable narrator is a first-person (or occasionally close third-person) narrator whose account of events cannot be taken at face value. The unreliability may stem from many sources: the narrator may be deliberately lying to the reader, may be self-deceived about their own motivations, may have incomplete information, may be too young or cognitively impaired to understand what they are witnessing, or may be psychologically unstable in ways that distort their perception. The term was coined by literary critic Wayne C. Booth in 1961, but the technique itself is as old as storytelling -- any narrative told from a subjective perspective carries at least the potential for unreliability.

The unreliable narrator transforms the act of reading from passive reception into active investigation. When readers suspect that the narrator is not telling the truth -- or not capable of perceiving it -- they begin to read against the text, looking for discrepancies between what the narrator says and what the evidence suggests. This creates a deeply engaging intellectual experience: the reader becomes a detective, piecing together the "real" story from the clues the narrator inadvertently provides. The gap between the narrator's version of events and the implied truth is where the story's deepest meanings reside, and the reader's discovery of that gap is one of the most satisfying experiences fiction can offer.

There are several degrees of unreliable narration. At one end are narrators who are mildly biased -- they present events accurately but interpret them self-servingly. In the middle are narrators who omit or distort key details, sometimes without realizing it. At the far end are narrators who fabricate entire events or whose perceptions are so distorted that their account bears little resemblance to reality. The writer's challenge is to make the unreliability discoverable without making it obvious. If the reader never suspects the narrator, the technique fails; if the reader sees through the narrator immediately, the mystery is lost. The ideal unreliable narrator is someone the reader wants to trust, struggles to trust, and eventually realizes they should never have trusted at all.`,
    examples: [
      {
        title: "Nick Carraway",
        source: "The Great Gatsby by F. Scott Fitzgerald",
        description:
          "Nick claims to be one of the few honest people he has ever known, yet his account is colored by his fascination with Gatsby, his class anxieties, and his selective omission of his own moral failings.",
      },
      {
        title: "Amy Dunne's diary",
        source: "Gone Girl by Gillian Flynn",
        description:
          "The first half of the novel presents Amy through her diary entries, which the reader accepts as genuine until the midpoint twist reveals that every entry was a calculated fiction designed to frame her husband.",
      },
      {
        title: "The narrator of Fight Club",
        source: "Fight Club by Chuck Palahniuk / Fight Club (1999)",
        description:
          "The unnamed narrator's account is revealed to be fundamentally unreliable when the reader discovers that Tyler Durden is a dissociative identity rather than a separate person, recontextualizing the entire narrative.",
      },
    ],
    relatedTechniques: ["character-revelation", "frame-narrative", "stream-of-consciousness"],
    tips: [
      "Establish the narrator's voice as confident and likable early on so the reader wants to trust them; the eventual discovery of unreliability is more impactful when it disrupts a relationship the reader has already formed.",
      "Plant discrepancies between the narrator's account and small verifiable details -- other characters' reactions, physical evidence, logical inconsistencies -- so that attentive readers can begin to sense the unreliability before it is confirmed.",
      "Decide early whether the narrator is aware of their unreliability (deliberately lying vs. genuinely self-deceived), as this distinction fundamentally shapes the narrative's tone, moral complexity, and the reader's emotional response.",
    ],
  },
  {
    id: "frame-narrative",
    name: "Frame Narrative",
    category: "Narrative",
    description:
      "A story within a story, where an outer narrative provides the context or occasion for an inner narrative to be told.",
    longDescription: `A frame narrative, also known as a frame story or embedded narrative, is a structural device in which an outer story serves as the setting or pretext for one or more inner stories. The outer frame typically introduces a narrator or situation that motivates the telling of the inner tale: a character recounting their past to a listener, a group of travelers sharing stories to pass the time, a researcher discovering a manuscript, or a journalist interviewing a subject. The inner story is the primary narrative, while the frame provides context, perspective, and often thematic commentary.

The frame narrative offers several powerful advantages. First, it creates a natural occasion for storytelling, which lends the narrative a sense of authenticity and purpose -- someone is telling this story to someone else for a reason, and that reason can add layers of meaning. Second, the frame allows the writer to control the reader's relationship with the inner story by filtering it through the frame narrator's perspective: the frame narrator can comment on, question, or react to the inner story, guiding the reader's interpretation. Third, the frame creates temporal and emotional distance that can be used to generate irony, suspense, or pathos -- the reader knows the story is being told in retrospect, which means the teller has survived, which means the tension lies not in whether they survived but in what happened to them along the way.

The frame narrative also introduces productive complications around reliability and perspective. The inner story is always mediated through at least one layer of subjectivity -- the frame narrator's. This raises questions about accuracy, bias, and intention that can enrich the narrative significantly. Why is the frame narrator telling this story? What are they omitting? What do they want the listener (and by extension the reader) to believe? The best frame narratives make the relationship between frame and inner story dynamic and thematically resonant, so that the two levels comment on and illuminate each other rather than one simply containing the other.`,
    examples: [
      {
        title: "The Canterbury Tales structure",
        source: "The Canterbury Tales by Geoffrey Chaucer",
        description:
          "A group of pilgrims traveling to Canterbury each tell stories to entertain one another, with the framing pilgrimage providing social context and the individual tales reflecting their tellers' personalities and biases.",
      },
      {
        title: "The Princess Bride framing device",
        source: "The Princess Bride (1987)",
        description:
          "A grandfather reads a story to his sick grandson, and the grandson's interruptions and reactions create a warm frame that comments on the adventure tale within, adding humor and emotional resonance.",
      },
      {
        title: "Marlow telling the story",
        source: "Heart of Darkness by Joseph Conrad",
        description:
          "Charles Marlow narrates his journey up the Congo River to a group of men on a boat in the Thames, and the frame emphasizes the act of storytelling itself, raising questions about what Marlow truly understood and what he is choosing to share.",
      },
    ],
    relatedTechniques: ["unreliable-narrator", "bookending", "epistolary-form"],
    tips: [
      "Give the frame narrative its own tension or question that the inner story answers -- the listener's curiosity, the narrator's reluctance to tell, a mystery about why the story matters now -- to keep the frame from feeling like mere scaffolding.",
      "Return to the frame at strategic moments to break the inner narrative's flow for effect: to build suspense, to provide commentary, or to remind the reader that this story is being shaped by its teller.",
      "Consider how the frame narrator's identity and circumstances color the inner story; a story told by a grieving widow will feel very different from the same events told by a detached historian, and this filtering is part of the technique's power.",
    ],
  },
  {
    id: "epistolary-form",
    name: "Epistolary Form",
    category: "Narrative",
    description:
      "A narrative told through documents -- letters, diary entries, emails, text messages, news articles, or other artifacts -- rather than through conventional narration.",
    longDescription: `The epistolary form is a narrative structure in which the story is conveyed entirely or primarily through documents produced by the characters themselves: letters, diary entries, journal entries, emails, text messages, social media posts, news clippings, transcripts, reports, or any other form of written or recorded communication. Rather than a traditional narrator describing events, the reader pieces the story together from these artifacts, becoming an active assembler of the narrative. The form dates back to early novels like Samuel Richardson's Pamela (1740) and has been continually reinvented to incorporate new communication technologies.

The epistolary form's greatest strength is its immediacy and intimacy. Because the documents are written by characters in the moment -- or close to it -- they carry the raw emotion, limited perspective, and subjective bias of their authors. A diary entry written in the aftermath of a betrayal vibrates with an urgency and honesty that retrospective narration might smooth away. A series of increasingly desperate text messages conveys panic more viscerally than a narrator describing the same escalation. The form also inherently creates multiple perspectives: when different characters write letters or journals about the same events, the reader sees how radically subjective experience shapes narrative, and the truth emerges from the gaps and contradictions between accounts.

The form also presents unique challenges. Without a traditional narrator to provide transitions, context, and connective tissue, the writer must find ways to convey essential information naturally within the documents themselves -- characters must have plausible reasons for writing what they write, and the documents must collectively cover the story's necessary ground without feeling contrived. There is also the risk of monotony if the documents become too uniform in style or function. The most successful epistolary narratives vary their document types, voices, and rhythms, and they exploit the form's inherent gaps -- the things that happen between documents, the events characters choose not to record, the lies they tell on paper -- as sources of tension and meaning.`,
    examples: [
      {
        title: "Letters between characters",
        source: "The Color Purple by Alice Walker",
        description:
          "Celie's letters to God and later to her sister Nettie form the novel's entire narrative, and the shift in their tone from submission to self-assertion charts her emotional liberation with devastating intimacy.",
      },
      {
        title: "Diary entries and found documents",
        source: "Dracula by Bram Stoker",
        description:
          "Stoker constructs his horror novel entirely from journal entries, letters, telegrams, and newspaper clippings from multiple characters, creating a mosaic of perspectives that heightens the mystery and dread.",
      },
      {
        title: "Emails and instant messages",
        source: "The Perks of Being a Wallflower by Stephen Chbosky",
        description:
          "Charlie's letters to an anonymous recipient give the novel its confessional, vulnerable tone, allowing the reader direct access to his thoughts as he navigates adolescence, trauma, and mental health.",
      },
    ],
    relatedTechniques: ["frame-narrative", "unreliable-narrator", "character-revelation"],
    tips: [
      "Vary the types of documents you use and the voices of their authors to prevent monotony; a novel that alternates between formal reports, casual texts, and anguished diary entries has a richer texture than one built from a single document type.",
      "Exploit the gaps between documents as a source of tension -- what happened between this letter and the next? Why is there a three-week gap in the diary? What is the character choosing not to write about? These silences can be as powerful as the text itself.",
      "Ensure that each document has a plausible reason to exist and a plausible audience; characters should not write diary entries that read like exposition dumps or letters that explain things the recipient would already know.",
    ],
  },
];

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

/**
 * Retrieve a single technique by its unique ID.
 * Returns undefined if no technique matches the given ID.
 */
export function getTechniqueById(id: string): Technique | undefined {
  return techniques.find((t) => t.id === id);
}

/**
 * Retrieve all techniques belonging to a specific category.
 * The comparison is case-insensitive.
 */
export function getTechniquesByCategory(category: string): Technique[] {
  const normalized = category.toLowerCase();
  return techniques.filter((t) => t.category.toLowerCase() === normalized);
}

/**
 * Search techniques by matching the query string against both
 * the technique name and its short description. The search is
 * case-insensitive and matches partial strings.
 */
export function searchTechniques(query: string): Technique[] {
  const normalized = query.toLowerCase();
  return techniques.filter(
    (t) =>
      t.name.toLowerCase().includes(normalized) ||
      t.description.toLowerCase().includes(normalized)
  );
}

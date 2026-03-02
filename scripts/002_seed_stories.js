import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL_NON_POOLING);

const stories = [
  // ANXIOUS (5)
  {
    mood_id: "anxious",
    title: "The 3am spiral that finally stopped",
    body: "I used to lie awake cataloguing everything that could go wrong. Job, relationships, health — my brain ran scenarios on all of them. One night I wrote every fear down on paper, folded it up, and put it in a drawer. Something about externalising it quieted the loop. The drawer is still full. I still sleep.",
    source: "Reddit r/Anxiety",
  },
  {
    mood_id: "anxious",
    title: "Panic attack at the grocery store",
    body: "Fluorescent lights, too many choices, a screaming toddler two aisles over. My chest tightened, my vision narrowed. I abandoned my cart and sat on the curb outside for twenty minutes. A stranger asked if I was okay, gave me a water bottle, and didn't ask any more questions. Sometimes that's all anyone needs.",
    source: "Shared by a community member",
  },
  {
    mood_id: "anxious",
    title: "I got the job and still felt dread",
    body: "Everyone congratulated me. I smiled and said thank you and felt a hollow terror I couldn't explain. Turned out the anxiety wasn't about failing — it was about succeeding and still not feeling okay. That was the day I finally called a therapist.",
    source: "Letters to Strangers",
  },
  {
    mood_id: "anxious",
    title: "My hands shook during the presentation",
    body: "I noticed my hands shaking and my mind started narrating it: they can all see, they think you're weak, this is a disaster. Then I slowed down, took one breath, and said out loud 'I'm a little nervous, bear with me.' The room softened. Three people nodded.",
    source: "Shared by a community member",
  },
  {
    mood_id: "anxious",
    title: "She asked me what I was so afraid of",
    body: "My therapist asked me that in our third session. I said everything. She said: can you be more specific? I sat with it for two weeks. When I came back I said: I'm afraid of being truly seen and found wanting. She said: you just were, and you're still here.",
    source: "Anonymous submission",
  },

  // SAD (5)
  {
    mood_id: "sad",
    title: "His chair at the table",
    body: "After my dad died we kept his chair at the dinner table for almost a year. No one sat in it. We'd pass things around it, talk around it. One day my mum moved it to the garage and cried for an hour. Then she came back in and said 'right, let's eat.' We still talk to him though. Just not to the chair.",
    source: "Grief journal submission",
  },
  {
    mood_id: "sad",
    title: "The dog understood before I did",
    body: "When my marriage ended I didn't cry for days. I went numb and functional. But my dog kept putting her head in my lap and staring up at me with this deep knowing look. I started crying so hard I couldn't breathe. She licked my face until I laughed. That was the turning point.",
    source: "Shared by a community member",
  },
  {
    mood_id: "sad",
    title: "I watched a funny video and felt guilty",
    body: "Three days after my mum's funeral I laughed at something stupid on YouTube. Really laughed, doubled over. Then immediately felt like a monster. My sister texted me the same video two hours later. We laughed together over the phone for five minutes. Grief doesn't cancel out the rest of you.",
    source: "Anonymous submission",
  },
  {
    mood_id: "sad",
    title: "Rainy Tuesday, nothing specific",
    body: "Sometimes the sadness doesn't have a reason. It just shows up. I used to fight it — busy myself, distract, push through. Now I make tea, sit with it, and wait. It always passes. Not because I fixed anything. Just because that's what feelings do.",
    source: "Letters to Strangers",
  },
  {
    mood_id: "sad",
    title: "The last voicemail",
    body: "I have a voicemail from my grandmother I've never deleted. She called to say she was proud of me. I've listened to it maybe a hundred times. I keep it in an app that backs up automatically, on three devices. One day I'll let it go. Today is not that day, and that's allowed.",
    source: "Shared by a community member",
  },

  // LONELY (5)
  {
    mood_id: "lonely",
    title: "New city, no one to call",
    body: "I moved for a job and knew exactly zero people. For three months I had dinner alone every night. I started going to the same coffee shop every Saturday. The barista started having my order ready before I reached the counter. It wasn't friendship yet, but it was something. Recognition. Proof I existed here.",
    source: "Reddit r/LonelyPeople",
  },
  {
    mood_id: "lonely",
    title: "Surrounded by people, completely alone",
    body: "I have a big family, a group chat, colleagues who like me. And I have felt profoundly lonely at every birthday party I've attended in the last four years. I've started telling people. Not everyone can meet you there, but some can. Find those ones.",
    source: "Anonymous submission",
  },
  {
    mood_id: "lonely",
    title: "The text I never sent",
    body: "I wrote 'hey, I've been thinking about you, how are you doing?' to an old friend at least a dozen times. Always deleted it. Felt too needy, too out of nowhere. Then one day I sent it. She replied in thirty seconds: 'I was literally just thinking about you. Can we call?'",
    source: "Shared by a community member",
  },
  {
    mood_id: "lonely",
    title: "Learning to enjoy my own company",
    body: "I started going to movies alone out of necessity. Then restaurants. Then overnight trips. Something shifted. I learned I was actually decent company — curious, unhurried, easy to be around. I still want deep connection. But I don't need to escape myself to find it.",
    source: "Letters to Strangers",
  },
  {
    mood_id: "lonely",
    title: "My online friends are real",
    body: "People sneer at internet friendships. I have people I've talked to daily for five years who have never seen my face. They knew when I lost my job, talked me through my diagnosis, celebrated my wins. When I was hospitalised one of them called my mum. That's not lesser. That's just friendship in a different form.",
    source: "Reddit r/MentalHealth",
  },

  // OVERWHELMED (5)
  {
    mood_id: "overwhelmed",
    title: "The list that never got shorter",
    body: "Every morning I wrote a to-do list. Every evening it was longer than when I started. I felt like I was running on a treadmill set too fast to ever actually go anywhere. A friend suggested I write an 'also done' list — things I did that weren't on the list. I wept at how long it was.",
    source: "Shared by a community member",
  },
  {
    mood_id: "overwhelmed",
    title: "I stopped for exactly 11 minutes",
    body: "I read that 11 minutes of stillness can reset the nervous system. I didn't believe it. I was in the middle of a brutal week — three deadlines, a sick kid, a broken furnace. I set a timer and sat on the kitchen floor. By minute four I was crying. By minute eleven I had a plan.",
    source: "Anonymous submission",
  },
  {
    mood_id: "overwhelmed",
    title: "My mum did one thing",
    body: "When my mum was overwhelmed she'd pick one thing. Not the most important, not the hardest — just one thing she could finish. She called it 'breaking the seal.' I still use it. Some days the one thing is washing a single dish. Some days that's enough to pull the rest with it.",
    source: "Grief journal submission",
  },
  {
    mood_id: "overwhelmed",
    title: "The day I asked for help",
    body: "I'd been carrying the household, the job, and my partner's depression alone for eight months. I finally said to a friend: I am not okay and I need someone to show up. She came over, cleaned my kitchen, and didn't ask anything of me. I cried the whole time. It helped more than anything I'd done alone.",
    source: "Shared by a community member",
  },
  {
    mood_id: "overwhelmed",
    title: "Permission to do less",
    body: "My therapist said something I've thought about every week since: you are not behind. There is no schedule you're failing to keep up with. Life is not a race someone else set the pace for. You get to decide what enough looks like.",
    source: "Anonymous submission",
  },

  // ANGRY (5)
  {
    mood_id: "angry",
    title: "I smashed a plate on purpose",
    body: "I bought a set of cheap plates specifically to smash one. When the rage came I went to the backyard, put on safety glasses, and threw it at a concrete block. The sound was magnificent. The feeling of doing something physical with something overwhelming was unlike anything. I have three plates left.",
    source: "Reddit r/Anger",
  },
  {
    mood_id: "angry",
    title: "The apology that never came",
    body: "I waited years for someone to acknowledge what they'd done. I rehearsed what I'd say, held space for it. It never came. My therapist helped me grieve the apology itself — mourn the acknowledgment I deserved and didn't get. Letting go of waiting wasn't forgiveness. It was just freedom.",
    source: "Anonymous submission",
  },
  {
    mood_id: "angry",
    title: "Running when I wanted to scream",
    body: "I started running not for fitness but because I needed somewhere to put the rage. No music, no podcast. Just my feet hitting pavement and the anger leaking out of me. By mile three, something shifted. Not gone — just smaller. Manageable.",
    source: "Shared by a community member",
  },
  {
    mood_id: "angry",
    title: "My anger was grief in disguise",
    body: "I was furious for almost two years after my brother died. At the hospital, at the doctors, at my family, at strangers. My counsellor said: what are you protecting under all that anger? I thought about it. I said: him. She said: of course you are.",
    source: "Grief journal submission",
  },
  {
    mood_id: "angry",
    title: "I said I was angry and it helped",
    body: "I'd been trained to say I was 'frustrated' or 'upset.' Those words never fit. One day I told my partner: I am genuinely angry about this. Not upset. Angry. Something about the honesty of the word cracked it open. We had the best conversation we'd had in months.",
    source: "Letters to Strangers",
  },

  // HOPELESS (5)
  {
    mood_id: "hopeless",
    title: "The smallest possible reason",
    body: "I was at my lowest point. I made a list of reasons to stay. It started with big ones and I couldn't feel them. Then I wrote: the second season of that show isn't out yet. A sunrise I haven't seen. A friend who would not recover from losing me. Small reasons held when the large ones couldn't.",
    source: "Anonymous submission",
  },
  {
    mood_id: "hopeless",
    title: "She called every day",
    body: "My friend called me every single day for three months when I was deep in it. Not to fix anything. Not to talk me into feeling better. Just to say: I'm here, you're not alone, I'll call again tomorrow. She kept calling. I kept answering. It mattered more than she knows.",
    source: "Shared by a community member",
  },
  {
    mood_id: "hopeless",
    title: "The light didn't come all at once",
    body: "Recovery from depression wasn't a morning I woke up better. It was a Tuesday I ate breakfast. A Wednesday I showered. A Thursday I replied to a text. A month later I noticed I'd been outside three days in a row. It came in pieces so small I almost missed it.",
    source: "Reddit r/Depression",
  },
  {
    mood_id: "hopeless",
    title: "My psychiatrist changed my medication",
    body: "I'd been on the same meds for four years, still struggling. I finally told my psychiatrist the truth about how bad it was. We tried something new. Six weeks later I noticed I was humming while I cooked. I hadn't hummed in years. It wasn't magic, but it was a door opening.",
    source: "Anonymous submission",
  },
  {
    mood_id: "hopeless",
    title: "Just until morning",
    body: "I didn't try to feel better. I didn't try to fix anything. I just tried to make it to morning. Then I tried to make it to noon. Then dinner. Then bed. Nobody told me you could break time into pieces that small. That it counts as surviving if all you do is get to the next one.",
    source: "Shared by a community member",
  },

  // STRESSED (5)
  {
    mood_id: "stressed",
    title: "My body knew before I did",
    body: "My jaw hurt for a month. My shoulders lived somewhere near my ears. I kept getting headaches. My doctor asked if I was under stress and I said 'not really' — and then listed six major life events that had happened in four months. She looked at me. I looked at her. I booked a therapist that afternoon.",
    source: "Shared by a community member",
  },
  {
    mood_id: "stressed",
    title: "The Sunday dread",
    body: "I named it. Sunday Dread: the specific anxiety of the coming week landing on me at 4pm every Sunday. Once I named it, I could talk back to it. I started doing one small enjoyable thing at exactly 4pm on Sundays. Over months, the dread got quieter. It still shows up. But now I'm ready for it.",
    source: "Anonymous submission",
  },
  {
    mood_id: "stressed",
    title: "I cancelled something and nothing collapsed",
    body: "I was double-booked, stretched to breaking, and I cancelled something I'd committed to. I expected consequences — judgment, damage, fallout. Instead: 'no worries, feel better.' I'd been carrying the weight of my obligations as if cancelling one would undo everything. It didn't.",
    source: "Letters to Strangers",
  },
  {
    mood_id: "stressed",
    title: "Three breaths, not ten",
    body: "Every breathwork thing says 'ten deep breaths.' I can never do ten. My mind wanders by four. I started doing three. Really slow, really conscious, one hand on my chest. Just three. It turns out three is enough to change the tide. I do it at traffic lights, in elevator lobbies, in bathroom stalls.",
    source: "Reddit r/Anxiety",
  },
  {
    mood_id: "stressed",
    title: "My inbox was not an emergency",
    body: "I had 4,200 unread emails. I treated every notification like a fire alarm. My therapist asked: how many of those emails were actual emergencies? I counted. Over a year of tracking: zero. I turned off notifications. The world did not end. My cortisol did.",
    source: "Shared by a community member",
  },

  // NUMB (5)
  {
    mood_id: "numb",
    title: "I forgot how to cry",
    body: "There was a period where I just... couldn't feel anything. Not sad, not happy. Just flat. I watched films that used to wreck me. Nothing. I worried I was broken. My therapist said it was protection — my nervous system had decided feeling was too dangerous. Slowly, sensation came back. First boredom. Then irritation. Then finally tears. I was grateful for every one.",
    source: "Anonymous submission",
  },
  {
    mood_id: "numb",
    title: "Ice on my wrists",
    body: "My counsellor suggested holding ice when I needed to feel something that wouldn't hurt me. I was sceptical. But at my worst, at 2am, I held ice cubes until they melted and cried from the cold. Something cracked. Not fixed, but cracked open. Sometimes that's the first step.",
    source: "Shared by a community member",
  },
  {
    mood_id: "numb",
    title: "The texture of bread",
    body: "I started baking bread in the depths of the numb period. Not because I cared about bread — I didn't care about anything. But the kneading required pressure and repetition and it forced me to be in my body for twenty minutes. The smell when it baked made something flicker. I baked every week for a year.",
    source: "Letters to Strangers",
  },
  {
    mood_id: "numb",
    title: "She held my hand and I felt it",
    body: "I'd been dissociating for weeks. Everything felt distant, like watching my life through glass. My grandmother took my hand at dinner and squeezed it once, just once, and said 'you're still here.' I don't know how she knew. But something pulled me back into the room.",
    source: "Grief journal submission",
  },
  {
    mood_id: "numb",
    title: "The diagnosis helped",
    body: "Finding out I had ADHD at 34 explained the emotional blunting, the dissociation, the years of going through motions. Knowing it had a name and a mechanism made me less afraid of it. Not cured — just less alone in it. Understanding your own wiring is its own kind of relief.",
    source: "Reddit r/ADHD",
  },

  // RESTLESS (5)
  {
    mood_id: "restless",
    title: "I couldn't sit still for any of it",
    body: "My leg bounced through every meeting, every dinner, every quiet moment. The restlessness was relentless. Someone finally asked me what I was waiting for. I didn't have an answer. I realised I'd been living in anticipation of a life that was supposed to start once things settled. Things don't settle. I had to start anyway.",
    source: "Anonymous submission",
  },
  {
    mood_id: "restless",
    title: "3am and the city",
    body: "When I can't sleep I walk. City at 3am is its own world — quieter, stranger, strangely honest. I've met a night baker, a man crying on a bench who needed exactly one minute of acknowledgment, a fox. The restlessness doesn't disappear, but it finds direction. Walking turns it into something.",
    source: "Letters to Strangers",
  },
  {
    mood_id: "restless",
    title: "I changed everything and changed nothing",
    body: "New job. New city. New relationship. The restlessness came with me. I finally understood it wasn't about circumstances. It was internal. The urge to escape was trying to protect me from sitting with myself. I started meditating not to calm down but to get curious about the thing underneath.",
    source: "Shared by a community member",
  },
  {
    mood_id: "restless",
    title: "Cold water fixed ten minutes of it",
    body: "I started ending every shower cold. Thirty seconds at first. Then longer. Something about the shock of it reset the restlessness — forced me fully into my body. It's not a cure. But it's a pause. And sometimes a pause is enough to take the next step with intention.",
    source: "Reddit r/MentalHealth",
  },
  {
    mood_id: "restless",
    title: "The thing I was running from",
    body: "My therapist asked me to sit in silence for five minutes and write down every thought that came. The list was a map. Almost everything on it was something I was avoiding. Not pursuing — avoiding. The restlessness was the cost of the avoidance. Once I could see it, I could begin to do something about it.",
    source: "Anonymous submission",
  },

  // LOST (5)
  {
    mood_id: "lost",
    title: "I didn't know what I wanted anymore",
    body: "I'd spent fifteen years being good at my job and one day woke up unable to remember why it had ever mattered to me. Nothing felt like mine. I started keeping a notebook of small moments that made me feel alive — not happy exactly, just alive. Music at a certain volume. The smell after rain. A specific kind of conversation. The list became a map.",
    source: "Anonymous submission",
  },
  {
    mood_id: "lost",
    title: "Wrong path, right lessons",
    body: "I spent seven years in a career I chose for other people's reasons. When I finally left, I worried I'd wasted the time. My mentor said: you didn't waste it, you eliminated it. Knowing what you don't want with certainty is valuable data. I knew far more clearly what I was looking for because of what I'd had to leave.",
    source: "Letters to Strangers",
  },
  {
    mood_id: "lost",
    title: "I stopped pretending to have a plan",
    body: "I'd been performing certainty for years — to my parents, my colleagues, myself. One day I stopped. I admitted to a close friend that I had no idea what I was doing or who I was becoming. She said: neither do I, can we not know together? That conversation started the most honest chapter of my adult life.",
    source: "Shared by a community member",
  },
  {
    mood_id: "lost",
    title: "The compass was always pointing inward",
    body: "I read every book about finding your purpose. Did the exercises, made the vision boards. Nothing clicked until I asked a different question: not 'what do I want to do' but 'who do I want to be when no one is watching.' The answer came quickly. It's been guiding me since.",
    source: "Anonymous submission",
  },
  {
    mood_id: "lost",
    title: "I moved back home and it was the right call",
    body: "At 31 I moved back to my parents' house. It felt like failure for about three weeks. Then it felt like a base camp. I paid off debt, figured out what I actually cared about, had dinners with my dad where we talked like adults for the first time. I left again eighteen months later with a direction. Not a plan — a direction.",
    source: "Reddit r/Adulting",
  },
];

async function main() {
  console.log("[v0] Seeding 50 stories...");

  for (const story of stories) {
    await sql`
      INSERT INTO public.stories (mood_id, title, body, source)
      VALUES (${story.mood_id}, ${story.title}, ${story.body}, ${story.source})
    `;
  }

  console.log(`[v0] Seeded ${stories.length} stories successfully!`);
}

main().catch((err) => {
  console.error("[v0] Seeding failed:", err);
  process.exit(1);
});

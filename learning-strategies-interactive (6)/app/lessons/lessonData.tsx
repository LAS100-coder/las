import { understandingLessons } from './understandingData';
import { revisionLessons } from './revisionData';
import { toteLesson } from './toteData';
import { mathLessons } from './mathData';
import { mathLessons2 } from './mathData2';
import { mathLessons3 } from './mathData3';

export const lessonData: { [key: string]: { title: string; content: string; exercise?: string; moduleId: string; activityLink?: string } } = {
  // Beliefs Module (Module 1)
  '1-0': {
    title: 'What Are Beliefs?',
    content: 'Your beliefs are the way in which you understand your experiences about what you can or can\'t do. They shape how much time and energy you invest in a task—and whether you even try in the first place.\n\n1. Why beliefs matter\n• If you believe "This is too hard," you may not start or you may give up quickly.\n• If you believe "I can do this," you\'ll stick with it and keep practicing.\n\n2. Beliefs as self fulfilling prophecies\n• Negative belief ("I can\'t do math") → You avoid math class → You fall further behind.\n• Average belief ("Just pass") → You aim for 50% → You miss the other 50% of the key ideas → Next year\'s work becomes much harder.\n• Empowering belief ("I want 80–100%") → You practice more → You build strong foundations → You keep succeeding.\n\n3. Example\n"I used to think I\'d never get past 50% in history. My grades stuck there until I decided, \'I can learn this—so I\'ll try a new learning strategy.\' A month later my test score was 75%!"',
    exercise: 'What belief do you hold about your favourite (or least favourite) subject? Write it down in your app journal today.',
    moduleId: '1'
  },
  '1-1': {
    title: 'How Beliefs Are Structured',
    content: 'Beliefs don\'t appear out of nowhere—they are built from three kinds of reasons. Think of building a table: your beliefs are the Table top, and the reasons are the legs.\n\nThe 3 Types of Reasons:\n\n1. Past Experience ("I did it before")\n• Remember a time you succeeded at something difficult\n• Use that memory as proof you can do it again\n• Example: "I learned to ride a bike, so I can learn algebra too"\n\n2. Affirmations ("I tell myself I can")\n• Positive statements you repeat to yourself\n• They rewire your brain over time\n• Example: "I am getting better at math every day"\n\n3. Expectations ("I will do it")\n• Clear picture of your future success\n• Specific goals with deadlines\n• Example: "I will get 80% on my next test"\n\nWhen you have all three types of reasons supporting your belief, it becomes unshakeable.',
    exercise: 'Write 3 reasons why you believe you can achieve your goal. One from your past experience, one affirmation and one expectation',
    moduleId: '1'
  },
  '1-2': {
    title: 'Your Daily Beliefs Exercise',
    content: 'Consistency is key. Doing this every morning builds a huge library of reasons to believe in yourself.\n\nDaily Beliefs Practice:\n\n1. Morning Routine (5 minutes)\n• Write down one past success\n• Say one positive affirmation\n• Visualize one future achievement\n\n2. Evidence Collection\n• Notice small wins throughout the day\n• Write them down before bed\n• Use them as new "past experiences"\n\n3. Belief Strength Check\n• Rate your belief from 1-10\n• If below 7, add more reasons\n• Celebrate when it reaches 8+\n\nRemember: Beliefs are like muscles—they get stronger with daily exercise.',
    exercise: 'Start your daily beliefs practice today. Write down one past success, one affirmation, and one future goal.',
    moduleId: '1'
  },
  '1-3': {
    title: 'From Beliefs to Action',
    content: 'Beliefs alone aren\'t enough—you need a simple plan that turns belief into real study habits.\n1.\tWrite one inspiring goal\no\tE.g., "I want to master solving Multiplication."\n2.\tList 3 action steps\no\tWatch one tutorial video each day.\no\tSolve three practice problems.\no\tAsk one question to my teacher or a friend.\n3.\tConnect belief to Reason/legs\no\tBecause you believe "I learn quickly when I practice," you\'ll stick to your three reason/legs daily.\n4.\tApp activity:\no\tEnter your goal and action steps. Set a reminder to review them every morning. You should write one affirmation, one experience, and one expectation every day. Just imagine how powerful your belief in yourself will be after a month or even a year!',
    exercise: 'Create your inspiring goal and 3 action steps. Set up your daily reminder to review them each morning.',
    moduleId: '1'
  },
  
  ...revisionLessons,
  
  // How the Mind Works Module (Module 2)
  '2-0': {
    title: 'Brain vs. Mind',
    content: 'You can think of your body like a super computer.\n\n• Your brain is like the hardware (the body part in your head)\n• Your mind is like the software (how you think, feel, remember, and imagine)\n• Just like a smart phone needs apps, your brain needs the right strategies to do its best\n\nYour Super Powerful Brain:\n• You have about 86 billion brain cells (neurons).\n• Each cell connects to thousands of others—trillions of links!\n• Your brain grows stronger the more you practice new skills.\n• This is called neuroplasticity: your brain changes as you learn.\n• By using all of your senses you can make these connections stronger.',
    moduleId: '2'
  },
  '2-1': {
    title: 'The Five Senses',
    content: 'Your mind works through five senses:\n1. Seeing\n2. Hearing (includes talking inside your head)\n3. Feeling (touch and how you feel)\n4. Taste\n5. Smell\n\nOutside vs. Inside Senses:\n\nSee:\n• Outside: Spotting your desk and chair\n• Inside Memory: Remembering your bedroom\'s colours\n• Inside Imagination: Imagining your room painted blue\n\nHear:\n• Outside: Listening to birds outside\n• Inside Memory: Remembering your friend\'s voice\n• Inside Imagination: Pretending your friend sounds like a robot\n\nFeel:\n• Outside: Touching your backpack\n• Inside Memory: Remembering how soft your pillow is\n• Inside Imagination: Imagining lying on a bed of sand\n\nTaste/Smell:\n• Outside: Tasting your lunch\n• Inside Memory: Remembering your favourite snack smell\n• Inside Imagination: Imagining your snack tastes like pickles',
    exercise: 'Try This Mind Game: Think about your room—but don\'t see, hear, feel, taste, or smell anything. Notice: you can\'t think without your senses.',
    moduleId: '2'
  },
  '2-2': {
    title: 'Achievers vs. Non Achievers',
    content: 'What\'s the difference between someone who does well, and someone who tries hard but still doesn\'t do well in school? It really is only about how they use their senses!\n\nLet\'s use spelling as an example:\n• If you try to spell "bought" by using the hearing sense, you might write it like "bawt." No matter how hard you try if you keep sounding the word out it will come out wrong.\n• If you see it the way it is spelt correctly in your mind, you get "bought" right.\n\nQuick trick:\n1. Picture the word "BOUGHT" in big letters.\n2. Count the letters (6).\n3. If you see it clearly, you can spell it forwards and even backwards by looking at the last letter and then the one before that and so on till you get to the first letter.\n4. This trains your brain to use seeing memory, which helps you spell correctly and do other things well like mathematics and many other things.',
    exercise: 'Practice with the word "BOUGHT": Picture it clearly, count the letters, then try spelling it backwards using your visual memory.',
    moduleId: '2'
  },
  
  // Reading and Conceptualizing Module (Module 3)
  '3-0': {
    title: 'Conceptualising Through Reading',
    content: 'Conceptualising means being able to understand, picture and use the information you are reading.\n\nUsing your mind to read with understanding:\nStep 1: See the words written on the page/board, etc.\nStep 2: Say the words to yourself using their inner voice. It is very important that they say the words with correct pronunciation.\nStep 3: This is where the conceptualisation (understanding) process occurs. Create a picture in your mind about what you are reading.\nStep 4: Describe the pictures you created in your mind.\n\nExample: "The feline jumped through the window."\n\nUsing the steps:\n1. When you read the above sentence, see the words written on the page.\n2. Pronounce the words properly using your inner voice. When you get very good at pronunciation, eventually your brain will do this automatically.\n3. Create a picture in your mind of a cat jumping through the window. (If you do not understand what a word being used means, for example "window" you will not be able to create an accurate picture. If this happens, you should stop reading, identify the word you don\'t understand and apply all the steps of the understanding strategy.\n4. Describe the picture to someone else, or you could even draw the picture if you like',
    exercise: 'Practice with "The feline jumped through the window." Follow all 4 steps and describe your mental picture in detail.',
    moduleId: '3'
  },
  '3-1': {
    title: 'The Power of Mental Pictures',
    content: 'Words exist because people experience ideas and concepts. The only way to experience anything is through our senses. When you read, you should connect as closely as possible to the experience being communicated.\n\nIf you only pronounce the words without creating any pictures in your mind, you will not really understand or even remember what you are reading.\n\nWhen you read and create pictures in your mind about the information – for example, seeing a cat that just jumped through the window – your mind will be focused on the text, improving concentration.\n\nThe "cat jumped through the window" sentence, leaves a great deal of detail out. For example, no description is given regarding the cat, the window, how the cat jumped or how the cat landed etc. You are free to add those kinds of details yourself, as long as it doesn\'t move away from the original meaning of the text.\n\nThere is often a big difference between reading novels and technical information.',
    exercise: 'Read this sentence: "The dog ran across the field." Create a detailed mental picture adding your own details about the dog, field, and how it ran.',
    moduleId: '3'
  },
  '3-2': {
    title: 'Novels vs Technical Information',
    content: 'Novels tend to use words which paint the picture for you, using language that is easy to understand. Technical information requires that you paint the pictures yourself with having a good understanding of what the words being used mean.\n\nConsider this example:\n"A polyhedron whose surface consists of six rectangles is called a cuboid."\n\nIf you don\'t understand the language contained in the above sentence, you may not even try to read it. Furthermore, how can you possible conceptualise it? To conceptualise what is written, you will need to work through the understanding strategy.\n\nIf you continue to improve your vocabulary, you will increase your ability to conceptualise when you read and even listen.\n\nIn the beginning, your reading speed will probably slow down. It is far better for you to read slowly and really conceptualise than to read quickly and have very little or moderate understanding.\n\nAs you improve your vocabulary and practice creating pictures in your mind when reading you will begin to read faster and conceptualise automatically.\n\nConceptualisation as a habit:\nIdeally, you should conceptualise whenever you read without any effort. To reach this level of skill, you should create pictures in your mind whenever you read.',
    exercise: 'Practice with technical text: "A triangle has three sides and three angles." Create a mental picture of different types of triangles.',
    moduleId: '3'
  },
  
  // Virtual Reading Module (Module 4)
  '4-0': {
    title: 'Virtual Reading Technique',
    content: 'This reading technique evolves from reading and conceptualising and it improves memory. With practice, you will be able to virtual read the information once and remember it long term.\n\nThe virtual reading sensory strategy is as follows:\n\nStep 1: See the words on the page: "The feline jumped through the window".\n\nStep 2: Create a picture in your mind relating to the words, for example: "Imagine a lion jumping through your bedroom window".\n\nStep 3: Add sounds to the picture: "Imagine the lion ROARING as it jumps through your bedroom window".\n\nStep 4: Add strong emotions to the picture. Imagine feeling terrified as you see the lion jumping towards you through your bedroom window, while you are lying on your bed.\n\nStep 5: Describe to somebody else the picture you created or write it down.\n\nAs you can see, when you read this way, you will most certainly remember what you have read. It does take a little bit longer to read this way but, with practice, your reading speed will improve. It\'s even more time consuming to read through the same, partially understood text several times than to virtual read.',
    exercise: 'Practice the virtual reading technique with "The feline jumped through the window." Follow all 5 steps, adding vivid imagery, sounds, and emotions.',
    activityLink: '/virtual-reading-builder',
    moduleId: '4'
  },
  
  // How to Understand Anything Module (Module 5)
  '5-0': {
    title: 'Your Potential to Understand',
    content: 'Understanding is when you know something well enough that you can explain it to someone else and you can use what you have learned. When you develop the skill in understanding, you can apply that skill to anything and therefore understand anything.\n\n1. Your understanding potential\nYou have the ability to understand anything, provided you use your mind (senses) correctly. If you believe and have a way of understanding any type of information, irrespective of what it is, you may set higher goals for yourself.\n\n2. The purpose of communication\nYou will find that, when you do not understand something, it is because you do not understand the language/terminology being used. If someone is describing a concept and you do not understand what is being said, it is because you don\'t know the words being used. If you read and you do not understand, it will be because you do not understand some of the words being used.',
    moduleId: '5'
  },
  
  ...understandingLessons,
  ...toteLesson,
  ...mathLessons,
  ...mathLessons2,
  ...mathLessons3
};
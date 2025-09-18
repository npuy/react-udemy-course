export interface ScrambleWordsState {
  words: string[];
  currentWord: string;
  scrambledWord: string;
  guess: string;
  points: number;
  errorCounter: number;
  maxAllowErrors: number;
  skipCounter: number;
  maxSkips: number;
  isGameOver: boolean;
  totalWords: number;
}

const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export const getScrambleWordsInitialState = (): ScrambleWordsState => {
  const words = shuffleArray(GAME_WORDS);
  return {
    words,
    currentWord: words[0],
    scrambledWord: scrambleWord(words[0]),
    guess: "",
    points: 0,
    errorCounter: 0,
    maxAllowErrors: 3,
    skipCounter: 0,
    maxSkips: 3,
    isGameOver: false,
    totalWords: words.length,
  };
};

export type ScrambleWordsAction =
  | { type: "SET_GUESS"; payload: string }
  | { type: "CHECK_ANSWER" }
  | { type: "SKIP-WORD" }
  | { type: "START_NEW_GAME"; payload: ScrambleWordsState };

export const scrambleWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction
): ScrambleWordsState => {
  switch (action.type) {
    case "SET_GUESS":
      return { ...state, guess: action.payload.trim().toUpperCase() };

    case "CHECK_ANSWER": {
      if (state.guess !== state.currentWord) {
        return {
          ...state,
          errorCounter: state.errorCounter + 1,
          guess: "",
          isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
        };
      }

      const newWords = state.words.slice(1);
      const newCurrentWord = newWords[0];

      return {
        ...state,
        points: state.points + 1,
        guess: "",
        words: newWords,
        currentWord: newCurrentWord,
        scrambledWord: scrambleWord(newCurrentWord),
      };
    }

    case "SKIP-WORD": {
      if (state.skipCounter + 1 >= state.maxSkips) return state;

      const newWords = state.words.slice(1);
      const newCurrentWord = newWords[0];

      return {
        ...state,
        skipCounter: state.skipCounter + 1,
        guess: "",
        words: newWords,
        currentWord: newCurrentWord,
        scrambledWord: scrambleWord(newCurrentWord),
      };
    }

    case "START_NEW_GAME":
      return action.payload;

    default:
      return state;
  }
};

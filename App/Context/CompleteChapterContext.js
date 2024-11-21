import { createContext } from "react";

export const CompleteChapterContext = createContext({
    isChapterComplete: false,
    completedChapters: [],
    setIsChapterComplete: () => {},
    setCompletedChapters: () => {}
});
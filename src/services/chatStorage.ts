const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
}

const STORAGE_KEY = "genesa_ai_chats";

export const chatStorage = {
  getSessions: (): ChatSession[] => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading chat history", e);
      return [];
    }
  },

  saveSessions: (sessions: ChatSession[]) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error("Error saving chat history", e);
    }
  },

  getSession: (id: string): ChatSession | undefined => {
    return chatStorage.getSessions().find((s) => s.id === id);
  },

  createSession: (initialMessage?: ChatMessage): ChatSession => {
    const newSession: ChatSession = {
      id: generateId(),
      title: "Nuevo Chat",
      updatedAt: Date.now(),
      messages: initialMessage ? [initialMessage] : [],
    };
    const sessions = chatStorage.getSessions();
    chatStorage.saveSessions([newSession, ...sessions]);
    return newSession;
  },

  updateSession: (id: string, messages: ChatMessage[], newTitle?: string) => {
    const sessions = chatStorage.getSessions();
    const index = sessions.findIndex((s) => s.id === id);
    if (index !== -1) {
      sessions[index].messages = messages;
      sessions[index].updatedAt = Date.now();
      if (newTitle) sessions[index].title = newTitle;
      
      // Sort by updatedAt descending
      sessions.sort((a, b) => b.updatedAt - a.updatedAt);
      chatStorage.saveSessions(sessions);
    }
  },

  deleteSession: (id: string) => {
    const sessions = chatStorage.getSessions();
    const filtered = sessions.filter((s) => s.id !== id);
    chatStorage.saveSessions(filtered);
  },

  clearAll: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};

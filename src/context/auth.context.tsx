import React, { createContext, useState } from "react";

export type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
};

type AuthContextType = {
  isLogin: string | null;
  setLogin: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const authContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setLogin] = useState<string | null>(() =>
    localStorage.getItem("tkn")
  );

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null; // corrupted JSON in storage
    }
  });

  return (
    <authContext.Provider value={{ isLogin, setLogin, user, setUser }}>
      {children}
    </authContext.Provider>
  );
}
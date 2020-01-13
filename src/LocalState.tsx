import React, { createContext, FC, useContext, useState } from 'react';

interface LocalState {
  isTeacher: boolean;
  setIsTeacher: (updatedIsTeacher: boolean) => void;
}

const LocalStateContext = createContext<LocalState | null>(null);

const AppStateProvider: FC = ({ children }) => {
  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  const localState: LocalState = {
    isTeacher,
    setIsTeacher,
  };

  return (
    <LocalStateContext.Provider value={localState}>
      {children}
    </LocalStateContext.Provider>
  );

};

const useAppContext = (): LocalState => {
  const context = useContext(LocalStateContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppStateProvider');
  }
  return context;
};

export { AppStateProvider, useAppContext };

import React from 'react';

interface LocalStateActions {
  setIsTeacher?(updatedIsTeacher: boolean): void;
}

interface LocalState {
  isTeacher: boolean;
  actions: LocalStateActions;
}

const LocalStateContext = React.createContext<LocalState>({ isTeacher: false, actions: {} });

const AppStateProvider: React.FC<{}> = ({ children }) => {

  const [ isTeacher, setIsTeacher ] = React.useState<boolean>(false);

  const localState: LocalState = {
    isTeacher,
    actions: {
      setIsTeacher(updatedIsTeacher: boolean): void {
        setIsTeacher(updatedIsTeacher);
      },
    },
  };

  return (
    <LocalStateContext.Provider value={localState}>
      {children}
    </LocalStateContext.Provider>
  );

};

const useAppContext = (): LocalState => {
  return React.useContext(LocalStateContext);
};

export { AppStateProvider, useAppContext };

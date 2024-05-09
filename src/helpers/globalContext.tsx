import { createContext, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode,
};

type ContextValueType = {
  isHomePage: boolean,
  isModalOpen: boolean,
  setIsModalOpen: (v:boolean) => void
  query: string,
  setQuery: (s: string) => void
}

const defaultValue = {
  isHomePage: true,
  isModalOpen: false,
  setIsModalOpen: () => { },
  query: '',
  setQuery: () => { },
};

export const globalContext = createContext < ContextValueType>(defaultValue);

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  const value = useMemo(() => ({
    isHomePage,
    isModalOpen,
    setIsModalOpen,
    query,
    setQuery,
  }), [location.pathname, isModalOpen, 
    query
  ])

  return (
    <globalContext.Provider value={value}>
      {children}
    </globalContext.Provider>
  )
}

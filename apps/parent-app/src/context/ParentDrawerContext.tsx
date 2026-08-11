import React, { createContext, useContext } from 'react';

interface DrawerContextType {
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ParentDrawerContext = createContext<DrawerContextType>({
  openDrawer: () => {},
  closeDrawer: () => {},
});

export const ParentDrawerProvider = ParentDrawerContext.Provider;

export const useParentDrawer = () => useContext(ParentDrawerContext);

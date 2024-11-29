import { useContext } from 'react';
import { create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { StoreSelector } from '../global/types';
import { ProjectStoreContext } from './ProjectStoreProvider';
import { ProjectState, ProjectStore } from './types';

export const createProjectStore = (initialState: ProjectState) =>
  create<ProjectStore>()(
    immer((set) => ({
      ...initialState,
      actions: {
        setProject: (project) => set({ project }),
      },
    })),
  );

const useProjectStore = <T>(selector: (store: ProjectStore) => T): T => {
  const projectStoreContext = useContext(ProjectStoreContext);

  if (!projectStoreContext) {
    throw new Error('useProjectStore must be used within ProjectStoreProvider');
  }

  return useStore(projectStoreContext, selector);
};

export const useProject: StoreSelector<ProjectState> = (selector) =>
  useProjectStore(selector);

export const useProjectActions = () =>
  useProjectStore((state) => state.actions);

import { create } from "zustand";

interface ProjectsState {
  // Video player state
  currentVideoTime: number;
  isPlaying: boolean;
  playbackRate: number;
  isLoading: boolean;

  // UI state
  isShowControls: boolean;
  isDragging: boolean;
  isHovering: boolean;
}

interface ProjectsActions {
  // Video player actions
  setCurrentVideoTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  setIsLoading: (loading: boolean) => void;

  // UI actions
  setIsShowControls: (show: boolean) => void;
  setIsDragging: (dragging: boolean) => void;
  setIsHovering: (hovering: boolean) => void;

  // Combined actions
  reset: () => void;
}

type ProjectsStore = ProjectsState & ProjectsActions;

const initialState: ProjectsState = {
  currentVideoTime: 0,
  isPlaying: false,
  playbackRate: 1,
  isLoading: false,
  isShowControls: true,
  isDragging: false,
  isHovering: false
};

export const useVideoStore = create<ProjectsStore>((set, get) => ({
  ...initialState,

  // Video player actions
  setCurrentVideoTime: (time: number) => set({ currentVideoTime: time }),

  setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),

  setPlaybackRate: (rate: number) => set({ playbackRate: rate }),

  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  // UI actions
  setIsShowControls: (show: boolean) => set({ isShowControls: show }),

  setIsDragging: (dragging: boolean) => set({ isDragging: dragging }),

  setIsHovering: (hovering: boolean) => set({ isHovering: hovering }),

  reset: () => set(initialState)
}));

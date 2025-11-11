import { atom, type PreinitializedWritableAtom } from 'nanostores';

export const navIsOpen = atom(false);

export const toggle = (state: PreinitializedWritableAtom<boolean>) => state.set(!state.get());

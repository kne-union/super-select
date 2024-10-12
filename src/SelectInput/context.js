import { createContext } from '@kne/global-context';

export const context = createContext();

export const { Provider, useContext } = context;

export default context;

import { MOCK_USERS } from '../data/users';
import { serverConfig } from '../config/server';
import { socialsConfig } from '../config/socials';
import { MOCK_KINGDOMS } from '../data/kingdoms';

const INITIAL_MEDIA: any[] = [];
const INITIAL_ANNOUNCEMENTS: any[] = [];
const INITIAL_APPLICATIONS: any[] = [];
const INITIAL_EVENTS: any[] = [];

// Initialize local storage with default values if they don't exist
export const initializeStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(MOCK_USERS));
  }
  if (!localStorage.getItem('serverConfig')) {
    localStorage.setItem('serverConfig', JSON.stringify(serverConfig));
  }
  if (!localStorage.getItem('socialsConfig')) {
    localStorage.setItem('socialsConfig', JSON.stringify(socialsConfig));
  }
  if (!localStorage.getItem('media')) {
    localStorage.setItem('media', JSON.stringify(INITIAL_MEDIA));
  }
  if (!localStorage.getItem('announcements')) {
    localStorage.setItem('announcements', JSON.stringify(INITIAL_ANNOUNCEMENTS));
  }
  if (!localStorage.getItem('applications')) {
    localStorage.setItem('applications', JSON.stringify(INITIAL_APPLICATIONS));
  }
  if (!localStorage.getItem('kingdoms')) {
    localStorage.setItem('kingdoms', JSON.stringify(MOCK_KINGDOMS));
  }
  if (!localStorage.getItem('events')) {
    localStorage.setItem('events', JSON.stringify(INITIAL_EVENTS));
  }
  if (!localStorage.getItem('activityLogs')) {
    localStorage.setItem('activityLogs', JSON.stringify([]));
  }
};

export const logActivity = (action: string, user: string) => {
  const logs = getData<any[]>('activityLogs', []);
  const newLog = {
    action,
    user,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };
  saveData('activityLogs', [newLog, ...logs]);
};

export const saveData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage key "${key}":`, error);
  }
};

export const getData = <T>(key: string, defaultValue?: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item) as T;
    }
  } catch (error) {
    console.error(`Error reading data from localStorage key "${key}":`, error);
  }
  
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  
  throw new Error(`No data found for key "${key}" and no default value provided.`);
};

export const removeData = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data from localStorage key "${key}":`, error);
  }
};

// Auto-initialize when the file is imported
initializeStorage();


export type Trimester = 1 | 2 | 3;

export interface UserProfile {
  name: string;
  phone: string;
  dueDate: string;
  trimester: Trimester;
  weeksPregnant: number;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  smsReminder: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Tip {
  title: string;
  content: string;
  category: 'Nutrition' | 'Lifestyle' | 'Safety';
  trimester: Trimester;
}

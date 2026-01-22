
import { Trimester } from './types';

export const calculatePregnancyStats = (dueDate: string) => {
  const due = new Date(dueDate);
  const now = new Date();
  
  // Pregnancy is roughly 280 days (40 weeks)
  const totalPregnancyDurationDays = 280;
  const msInDay = 24 * 60 * 60 * 1000;
  
  const conceptionDate = new Date(due.getTime() - (totalPregnancyDurationDays * msInDay));
  const diffTime = Math.abs(now.getTime() - conceptionDate.getTime());
  const diffDays = Math.ceil(diffTime / msInDay);
  const weeksPregnant = Math.max(1, Math.min(40, Math.floor(diffDays / 7)));
  
  let trimester: Trimester = 1;
  if (weeksPregnant >= 27) trimester = 3;
  else if (weeksPregnant >= 13) trimester = 2;
  
  return { weeksPregnant, trimester };
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

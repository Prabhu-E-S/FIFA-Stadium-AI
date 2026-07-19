export interface NavigationItem {
  name: string;
  href: string;
  icon: string; // Lucide icon name or React component
}

export interface StatCardData {
  title: string;
  value: string | number;
  change: string; // e.g., "+4.5%" or "-1.2%"
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  status: 'success' | 'warning' | 'danger' | 'info';
  description?: string;
}

export interface AlertData {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  location?: string;
  status: 'active' | 'resolved' | 'pending';
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  category: 'crowd' | 'security' | 'access' | 'system' | 'weather';
  status: 'resolved' | 'ongoing' | 'alert';
}

export interface MatchInfo {
  id: string;
  teams: {
    home: { name: string; flag: string };
    away: { name: string; flag: string };
  };
  time: string; // Time of the match
  date: string;
  location: string;
  attendance: string;
  safetyLevel: 'high' | 'normal' | 'attention';
}

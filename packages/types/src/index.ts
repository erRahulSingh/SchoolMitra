export type Role = 
  | 'SuperAdmin'
  | 'SchoolAdmin'
  | 'Principal'
  | 'Teacher'
  | 'Driver'
  | 'Parent'
  | 'TransportManager'
  | 'Accountant'
  | 'Receptionist'
  | 'Security';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  schoolId?: string;
  createdAt: string;
}

export interface SchoolTenant {
  id: string;
  code: string;
  name: string;
  city: string;
  address: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Suspended' | 'Pending';
  studentsCount: number;
  busesCount: number;
  mrr: number;
}

export interface GPSCoordinates {
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: string;
}

export interface LiveBusLocation {
  busId: string;
  busNumber: string;
  routeId: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  currentStop: string;
  eta: string;
  speed: string;
  status: 'On Route' | 'At School' | 'Delayed' | 'Completed';
  coordinates: GPSCoordinates;
}

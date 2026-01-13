
import React from 'react';

export enum AppView {
  ORDERS = 'ORDERS',
  SETTINGS = 'SETTINGS',
  SYNC_ORDERS = 'SYNC_ORDERS'
}

export interface SidebarItem {
  id: AppView;
  label: string;
  icon: React.ReactNode;
}

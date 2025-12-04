import { IconName } from '../icons/Icon';

export interface MenuItem {
  id: string;
  name: string;
  href?: string;
  icon: IconName;
  children?: MenuItem[];
}

export interface SidebarProps {
  menu: MenuItem[];
  className?: string;
}
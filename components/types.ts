import type { UseNavigationPanelProps } from './useNavigationPanel';

export interface NavigationPanelProps
  extends Omit<UseNavigationPanelProps, 'ref'> {
  disablePagesAmountManagement?: boolean;
}

export type LogsPanelProps = Pick<NavigationPanelProps, 'logs'>;

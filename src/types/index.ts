
export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
  label?: string;
}

export interface MainNavItem extends NavItem {}

export type WidgetType = "security-score" | "attack-chart" | "threat-map" | "live-traffic" | "metrics" | "network-status" | "system-health" | "attack-types";

export interface WidgetDefinition {
  id: string;
  type: WidgetType;
  title: string;
  defaultSize: "small" | "medium" | "large";
}

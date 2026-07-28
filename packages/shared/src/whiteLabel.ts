export interface WhiteLabelBrandingConfig {
  schoolId: string;
  schoolName: string;
  schoolLogoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  customSubdomain: string;
  customReceiptHeader: string;
  customMobileAppName: string;
}

export const DEFAULT_WHITE_LABEL_CONFIG: WhiteLabelBrandingConfig = {
  schoolId: "sch-101",
  schoolName: "Delhi Public School",
  schoolLogoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80",
  primaryColor: "#6366f1",
  secondaryColor: "#06b6d4",
  customSubdomain: "dps.schoolmitra.com",
  customReceiptHeader: "DELHI PUBLIC SCHOOL - OFFICIAL FEE RECEIPT",
  customMobileAppName: "DPS Parent Portal"
};

export const applyWhiteLabelTheme = (config: WhiteLabelBrandingConfig) => {
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--primary", config.primaryColor);
    document.documentElement.style.setProperty("--secondary", config.secondaryColor);
  }
};

import SiteSettingsTypes "../types/sitesettings";

module {
  public type SiteSettings = SiteSettingsTypes.SiteSettings;

  public func defaultSettings() : SiteSettings {
    {
      heroText = "Master Commerce. Shape Your Future.";
      heroSubtext = "Arthashastra Classes — Bhopal's premier commerce coaching institute. Expert faculty, proven results, and a digital-first learning experience built for your success.";
      ctaText = "Explore Courses";
      contactEmail = "info@arthashastraclasses.com";
      contactPhone = "+91 98765 43210";
      contactAddress = "Arthashastra Classes, MP Nagar, Bhopal, Madhya Pradesh 462011, India";
      instagramUrl = "https://instagram.com/arthashastraclasses";
      youtubeUrl = "https://youtube.com/@arthashastraclasses";
      telegramUrl = "https://t.me/arthashastraclasses";
      linkedinUrl = "https://linkedin.com/company/arthashastraclasses";
      whatsappNumber = "+919876543210";
    };
  };

  public func updateSettings(
    current : SiteSettings,
    updates : SiteSettings,
  ) : SiteSettings {
    updates;
  };
};

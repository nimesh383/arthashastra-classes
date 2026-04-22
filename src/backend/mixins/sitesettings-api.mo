import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import SiteSettingsTypes "../types/sitesettings";
import SiteSettingsLib "../lib/sitesettings";

mixin () {
  var siteSettings : SiteSettingsTypes.SiteSettings = SiteSettingsLib.defaultSettings();

  public query func getSiteSettings() : async SiteSettingsTypes.SiteSettings {
    siteSettings;
  };

  public shared ({ caller }) func updateSiteSettings(settings : SiteSettingsTypes.SiteSettings) : async SiteSettingsTypes.SiteSettings {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    siteSettings := SiteSettingsLib.updateSettings(siteSettings, settings);
    siteSettings;
  };
};

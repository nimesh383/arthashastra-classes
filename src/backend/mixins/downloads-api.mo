import List "mo:core/List";
import Time "mo:core/Time";
import DownloadTypes "../types/downloads";
import DownloadsLib "../lib/downloads";

mixin (downloadItems : List.List<DownloadsLib.DownloadItem>) {
  var nextDownloadId : Nat = 1;

  public query func getDownloadItems(category : ?DownloadTypes.DownloadCategory) : async [DownloadTypes.DownloadItem] {
    DownloadsLib.getDownloadItems(downloadItems, category);
  };

  public shared query ({ caller }) func getMyDownloads(category : ?DownloadTypes.DownloadCategory) : async [DownloadTypes.DownloadItem] {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    DownloadsLib.getMyDownloads(downloadItems, category);
  };

  public shared ({ caller }) func incrementDownloadCount(id : Nat) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    DownloadsLib.incrementDownloadCount(downloadItems, id);
  };

  public shared ({ caller }) func createDownloadItem(input : DownloadTypes.DownloadItemInput) : async DownloadTypes.DownloadItem {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    let item = DownloadsLib.createDownloadItem(downloadItems, nextDownloadId, input, Time.now());
    nextDownloadId += 1;
    item;
  };

  public shared ({ caller }) func updateDownloadItem(id : Nat, input : DownloadTypes.DownloadItemInput) : async ?DownloadTypes.DownloadItem {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    DownloadsLib.updateDownloadItem(downloadItems, id, input);
  };

  public shared ({ caller }) func deleteDownloadItem(id : Nat) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    DownloadsLib.deleteDownloadItem(downloadItems, id);
  };
};

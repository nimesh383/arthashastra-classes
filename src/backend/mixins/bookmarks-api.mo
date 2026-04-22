import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import BookmarkTypes "../types/bookmarks";
import BookmarksLib "../lib/bookmarks";

mixin (bookmarks : List.List<BookmarksLib.Bookmark>) {
  var nextBookmarkId : Nat = 1;

  public shared ({ caller }) func addBookmark(input : BookmarkTypes.BookmarkInput) : async BookmarkTypes.Bookmark {
    if (caller.isAnonymous()) Runtime.trap("Must be logged in");
    let id = "bm" # nextBookmarkId.toText();
    nextBookmarkId += 1;
    BookmarksLib.addBookmark(bookmarks, id, caller, input, Time.now());
  };

  public shared ({ caller }) func removeBookmark(itemId : Text) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Must be logged in");
    BookmarksLib.removeBookmark(bookmarks, caller, itemId);
  };

  public shared query ({ caller }) func getMyBookmarks() : async [BookmarkTypes.Bookmark] {
    if (caller.isAnonymous()) Runtime.trap("Must be logged in");
    BookmarksLib.getMyBookmarks(bookmarks, caller);
  };
};

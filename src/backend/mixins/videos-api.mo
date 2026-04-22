import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import VideoTypes "../types/videos";
import VideoLib "../lib/videos";
import EnrollmentsLib "../lib/enrollments";

mixin (
  videos : List.List<VideoLib.Video>,
  enrollments : List.List<EnrollmentsLib.Enrollment>,
) {
  var nextVideoSeq : Nat = 1;

  // ── Admin endpoints ────────────────────────────────────────────────────────

  public shared ({ caller }) func createVideo(input : VideoTypes.VideoInput) : async { #ok : VideoTypes.Video; #err : Text } {
    let id = "video-" # nextVideoSeq.toText();
    nextVideoSeq += 1;
    let video = VideoLib.createVideo(videos, id, caller, input, Time.now());
    #ok(video);
  };

  public query ({ caller }) func getVideos() : async [VideoTypes.Video] {
    VideoLib.getVideos(videos);
  };

  public shared func deleteVideo(id : Text) : async { #ok; #err : Text } {
    if (VideoLib.deleteVideo(videos, id)) #ok else #err("Video not found");
  };

  // ── Student / public endpoints ─────────────────────────────────────────────

  public query func getVideosByCourse(courseId : Text) : async [VideoTypes.Video] {
    VideoLib.getVideosByCourse(videos, courseId);
  };

  public query func getPreviewVideos() : async [VideoTypes.Video] {
    VideoLib.getPreviewVideos(videos);
  };

  public shared query ({ caller }) func getMyVideosForCourse(courseId : Text) : async { #ok : [VideoTypes.Video]; #err : Text } {
    VideoLib.getVideosForEnrolledCourse(videos, enrollments, caller, courseId);
  };
};

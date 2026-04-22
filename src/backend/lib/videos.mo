import List "mo:core/List";
import Principal "mo:core/Principal";
import VideoTypes "../types/videos";
import EnrollmentsLib "enrollments";

module {
  public type Video = VideoTypes.Video;
  public type VideoInput = VideoTypes.VideoInput;
  public type Enrollment = EnrollmentsLib.Enrollment;

  public func createVideo(
    videos : List.List<Video>,
    id : Text,
    caller : Principal,
    input : VideoInput,
    now : Int,
  ) : Video {
    let video : Video = {
      id;
      title = input.title;
      description = input.description;
      courseId = input.courseId;
      thumbnailUrl = input.thumbnailUrl;
      videoUrl = input.videoUrl;
      isPreview = input.isPreview;
      order = input.order;
      createdBy = caller;
      createdAt = now;
    };
    videos.add(video);
    video;
  };

  public func getVideos(videos : List.List<Video>) : [Video] {
    videos.toArray();
  };

  public func getVideosByCourse(videos : List.List<Video>, courseId : Text) : [Video] {
    videos.filter(func(v) { v.courseId == courseId }).toArray();
  };

  public func getPreviewVideos(videos : List.List<Video>) : [Video] {
    videos.filter(func(v) { v.isPreview }).toArray();
  };

  public func getVideosForEnrolledCourse(
    videos : List.List<Video>,
    enrollments : List.List<Enrollment>,
    caller : Principal,
    courseId : Text,
  ) : { #ok : [Video]; #err : Text } {
    // Check if caller is enrolled in this course (courseId as Text matches Nat.toText)
    let enrolled = switch (
      enrollments.find(func(e) {
        Principal.equal(e.studentId, caller) and
        e.courseId.toText() == courseId and
        e.status == #Completed;
      })
    ) {
      case (?_) true;
      case null false;
    };
    if (not enrolled) {
      return #err("Not enrolled in this course");
    };
    #ok(videos.filter(func(v) { v.courseId == courseId }).toArray());
  };

  public func deleteVideo(videos : List.List<Video>, id : Text) : Bool {
    var found = false;
    switch (videos.findIndex(func(v) { v.id == id })) {
      case (?_) {
        found := true;
        let kept = videos.filter(func(v) { v.id != id });
        videos.clear();
        videos.append(kept);
      };
      case null {};
    };
    found;
  };

  // ── Seed ────────────────────────────────────────────────────────────────────

  public func seedVideos(videos : List.List<Video>, adminPrincipal : Principal, now : Int) {
    if (not videos.isEmpty()) return;
    let seed : [Video] = [
      {
        id = "video-1";
        title = "Introduction to Accountancy — Journal Entries";
        description = "Learn the fundamentals of journal entries, debit and credit rules, and the accounting equation with clear examples.";
        courseId = "1";
        thumbnailUrl = "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg";
        videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
        isPreview = true;
        order = 1;
        createdBy = adminPrincipal;
        createdAt = now;
      },
      {
        id = "video-2";
        title = "Accountancy — Ledger and Trial Balance";
        description = "Step-by-step walkthrough of posting journal entries to ledger accounts and preparing a trial balance for Class 11.";
        courseId = "1";
        thumbnailUrl = "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg";
        videoUrl = "https://www.youtube.com/embed/9bZkp7q19f0";
        isPreview = false;
        order = 2;
        createdBy = adminPrincipal;
        createdAt = now;
      },
      {
        id = "video-3";
        title = "Business Studies — Forms of Business Organisation";
        description = "Comprehensive overview of sole proprietorship, partnership, and company forms for Class 12 Board Exam preparation.";
        courseId = "2";
        thumbnailUrl = "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg";
        videoUrl = "https://www.youtube.com/embed/kJQP7kiw5Fk";
        isPreview = true;
        order = 1;
        createdBy = adminPrincipal;
        createdAt = now;
      },
      {
        id = "video-4";
        title = "Economics — Theory of Demand and Supply";
        description = "In-depth explanation of demand, supply, elasticity, and market equilibrium for Class 12 Economics.";
        courseId = "2";
        thumbnailUrl = "https://img.youtube.com/vi/oT3arQnLCfU/maxresdefault.jpg";
        videoUrl = "https://www.youtube.com/embed/oT3arQnLCfU";
        isPreview = false;
        order = 2;
        createdBy = adminPrincipal;
        createdAt = now;
      },
    ];
    for (v in seed.values()) {
      videos.add(v);
    };
  };
};

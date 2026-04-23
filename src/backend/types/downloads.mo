import CommonTypes "common";

module {
  public type DownloadCategory = {
    #study_notes;
    #admit_card;
    #hall_ticket;
    #certificate;
  };

  public type DownloadItem = {
    id : Nat;
    title : Text;
    description : Text;
    fileUrl : Text;
    fileSize : Text;
    category : DownloadCategory;
    subject : Text;
    batchYear : Text;
    isPublic : Bool;
    downloadCount : Nat;
    createdAt : CommonTypes.Timestamp;
  };

  public type DownloadItemInput = {
    title : Text;
    description : Text;
    fileUrl : Text;
    fileSize : Text;
    category : DownloadCategory;
    subject : Text;
    batchYear : Text;
    isPublic : Bool;
  };
};

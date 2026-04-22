import CommonTypes "common";

module {
  public type Subject = {
    #Commerce;
    #Accountancy;
    #Economics;
    #BST;
    #Maths;
  };

  public type MaterialType = {
    #PDF;
    #PYQ;
    #Notes;
  };

  public type FileType = {
    #PDF;
    #Image;
  };

  public type StudyMaterial = {
    id : Nat;
    courseId : Nat;
    title : Text;
    description : Text;
    fileUrl : Text;
    fileType : FileType;
    fileSize : ?Text;
    uploadedAt : CommonTypes.Timestamp;
    isDeleted : Bool;

    // Legacy fields for backward compatibility
    subject : Subject;
    materialType : MaterialType;
    uploadDate : CommonTypes.Timestamp;
    fileKey : Text;
  };

  public type MaterialInput = {
    courseId : Nat;
    title : Text;
    description : Text;
    fileUrl : Text;
    fileType : FileType;
    fileSize : ?Text;
  };
};

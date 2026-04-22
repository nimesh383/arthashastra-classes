import CommonTypes "common";

module {
  public type EnquiryStatus = {
    #Pending;
    #Contacted;
  };

  public type Enquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    course : ?Text;
    timestamp : CommonTypes.Timestamp;
    status : EnquiryStatus;
  };
};

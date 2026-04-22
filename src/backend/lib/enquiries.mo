import List "mo:core/List";
import EnquiryTypes "../types/enquiries";
import CommonTypes "../types/common";

module {
  public type Enquiry = EnquiryTypes.Enquiry;
  public type EnquiryInput = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    course : ?Text;
  };

  public func submitEnquiry(
    enquiries : List.List<Enquiry>,
    nextId : Nat,
    input : EnquiryInput,
    now : CommonTypes.Timestamp,
  ) : Nat {
    enquiries.add({
      id = nextId;
      name = input.name;
      email = input.email;
      phone = input.phone;
      message = input.message;
      course = input.course;
      timestamp = now;
      status = #Pending;
    });
    nextId;
  };

  public func getAll(enquiries : List.List<Enquiry>) : [Enquiry] {
    enquiries.toArray();
  };
};

import List "mo:core/List";
import Time "mo:core/Time";
import EnquiriesLib "../lib/enquiries";

mixin (
  enquiries : List.List<EnquiriesLib.Enquiry>,
) {
  var nextEnquiryId : Nat = 1;

  public shared func submitEnquiry(input : EnquiriesLib.EnquiryInput) : async Nat {
    let id = EnquiriesLib.submitEnquiry(enquiries, nextEnquiryId, input, Time.now());
    nextEnquiryId += 1;
    id;
  };

  public query func getEnquiries() : async [EnquiriesLib.Enquiry] {
    EnquiriesLib.getAll(enquiries);
  };
};

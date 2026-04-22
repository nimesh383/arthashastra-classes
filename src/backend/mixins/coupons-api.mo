import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import CouponTypes "../types/coupons";
import CouponsLib "../lib/coupons";

mixin (coupons : List.List<CouponsLib.Coupon>) {
  var nextCouponId : Nat = 1;

  public query func validateCoupon(code : Text) : async ?CouponTypes.Coupon {
    CouponsLib.validateCoupon(coupons, code, Time.now());
  };

  public query ({ caller }) func getAdminCoupons() : async [CouponTypes.Coupon] {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    CouponsLib.getAdminCoupons(coupons);
  };

  public shared ({ caller }) func createCoupon(input : CouponTypes.CouponInput) : async CouponTypes.Coupon {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    let id = "cpn" # nextCouponId.toText();
    nextCouponId += 1;
    CouponsLib.createCoupon(coupons, id, input, Time.now());
  };

  public shared ({ caller }) func updateCoupon(id : Text, input : CouponTypes.CouponInput) : async ?CouponTypes.Coupon {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    CouponsLib.updateCoupon(coupons, id, input);
  };

  public shared ({ caller }) func deleteCoupon(id : Text) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    CouponsLib.deleteCoupon(coupons, id);
  };
};

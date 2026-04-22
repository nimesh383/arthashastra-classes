import List "mo:core/List";
import CouponTypes "../types/coupons";
import CommonTypes "../types/common";

module {
  public type Coupon = CouponTypes.Coupon;
  public type CouponInput = CouponTypes.CouponInput;

  public func validateCoupon(
    coupons : List.List<Coupon>,
    code : Text,
    now : CommonTypes.Timestamp,
  ) : ?Coupon {
    coupons.find(func(c) {
      if (c.code != code) return false;
      if (not c.isActive) return false;
      if (c.usedCount >= c.maxUses) return false;
      switch (c.expiresAt) {
        case (?exp) exp > now;
        case null true;
      };
    });
  };

  public func getAdminCoupons(coupons : List.List<Coupon>) : [Coupon] {
    coupons.toArray();
  };

  public func createCoupon(
    coupons : List.List<Coupon>,
    id : Text,
    input : CouponInput,
    now : CommonTypes.Timestamp,
  ) : Coupon {
    let c : Coupon = {
      id;
      code = input.code;
      discountType = input.discountType;
      value = input.value;
      maxUses = input.maxUses;
      usedCount = 0;
      expiresAt = input.expiresAt;
      isActive = input.isActive;
      createdAt = now;
    };
    coupons.add(c);
    c;
  };

  public func updateCoupon(
    coupons : List.List<Coupon>,
    id : Text,
    input : CouponInput,
  ) : ?Coupon {
    var updated : ?Coupon = null;
    coupons.mapInPlace(
      func(c) {
        if (c.id == id) {
          let u : Coupon = {
            c with
            code = input.code;
            discountType = input.discountType;
            value = input.value;
            maxUses = input.maxUses;
            expiresAt = input.expiresAt;
            isActive = input.isActive;
          };
          updated := ?u;
          u;
        } else c;
      }
    );
    updated;
  };

  public func deleteCoupon(
    coupons : List.List<Coupon>,
    id : Text,
  ) : Bool {
    let sizeBefore = coupons.size();
    let filtered = coupons.filter(func(c) { c.id != id });
    coupons.clear();
    coupons.append(filtered);
    coupons.size() < sizeBefore;
  };
};

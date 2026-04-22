import CommonTypes "common";

module {
  public type DiscountType = {
    #percent;
    #flat;
  };

  public type Coupon = {
    id : Text;
    code : Text;
    discountType : DiscountType;
    value : Float;
    maxUses : Nat;
    usedCount : Nat;
    expiresAt : ?CommonTypes.Timestamp;
    isActive : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type CouponInput = {
    code : Text;
    discountType : DiscountType;
    value : Float;
    maxUses : Nat;
    expiresAt : ?CommonTypes.Timestamp;
    isActive : Bool;
  };
};

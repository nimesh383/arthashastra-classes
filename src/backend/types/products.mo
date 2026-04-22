import CommonTypes "common";

module {
  public type Category = {
    #Book;
    #Notes;
    #Merchandise;
    #DigitalResource;
  };

  public type Product = {
    id : Nat;
    title : Text;
    description : Text;
    price : Float;
    category : Category;
    imageUrl : Text;
    isAvailable : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type ProductInput = {
    title : Text;
    description : Text;
    price : Float;
    category : Category;
    imageUrl : Text;
    isAvailable : Bool;
  };
};

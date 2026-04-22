import List "mo:core/List";
import Time "mo:core/Time";
import ProductTypes "../types/products";
import ProductsLib "../lib/products";

mixin (products : List.List<ProductsLib.Product>) {
  var nextProductId : Nat = 1;

  // ── Public query endpoints ─────────────────────────────────────────────────

  public query func getProducts() : async [ProductTypes.Product] {
    ProductsLib.getProducts(products);
  };

  public query func getProductDetail(id : Nat) : async ?ProductTypes.Product {
    ProductsLib.getProductById(products, id);
  };

  // ── Admin endpoints ────────────────────────────────────────────────────────

  public shared ({ caller }) func createProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    let product = ProductsLib.createProduct(products, nextProductId, input, Time.now());
    nextProductId += 1;
    product;
  };

  public shared ({ caller }) func updateProduct(id : Nat, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    ProductsLib.updateProduct(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    ProductsLib.deleteProduct(products, id);
  };

  public query ({ caller }) func getAdminProducts() : async [ProductTypes.Product] {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    ProductsLib.getAdminProducts(products);
  };
};

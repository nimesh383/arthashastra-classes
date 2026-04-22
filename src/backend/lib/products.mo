import List "mo:core/List";
import Time "mo:core/Time";
import ProductTypes "../types/products";
import CommonTypes "../types/common";

module {
  public type Product = ProductTypes.Product;
  public type ProductInput = ProductTypes.ProductInput;

  // ── Query API ─────────────────────────────────────────────────────────────

  public func getProducts(products : List.List<Product>) : [Product] {
    products.filter(func(p) { p.isAvailable }).toArray();
  };

  public func getProductById(products : List.List<Product>, id : Nat) : ?Product {
    products.find(func(p) { p.id == id });
  };

  // ── Admin API ─────────────────────────────────────────────────────────────

  public func getAdminProducts(products : List.List<Product>) : [Product] {
    products.toArray();
  };

  public func createProduct(
    products : List.List<Product>,
    nextId : Nat,
    input : ProductInput,
    now : CommonTypes.Timestamp,
  ) : Product {
    let product : Product = {
      id = nextId;
      title = input.title;
      description = input.description;
      price = input.price;
      category = input.category;
      imageUrl = input.imageUrl;
      isAvailable = input.isAvailable;
      createdAt = now;
    };
    products.add(product);
    product;
  };

  public func updateProduct(
    products : List.List<Product>,
    id : Nat,
    input : ProductInput,
  ) : ?Product {
    var updated : ?Product = null;
    products.mapInPlace(
      func(p) {
        if (p.id == id) {
          let u : Product = {
            p with
            title = input.title;
            description = input.description;
            price = input.price;
            category = input.category;
            imageUrl = input.imageUrl;
            isAvailable = input.isAvailable;
          };
          updated := ?u;
          u;
        } else p;
      }
    );
    updated;
  };

  public func deleteProduct(products : List.List<Product>, id : Nat) : Bool {
    var found = false;
    products.mapInPlace(
      func(p) {
        if (p.id == id and p.isAvailable) {
          found := true;
          { p with isAvailable = false };
        } else p;
      }
    );
    found;
  };

  // ── Seed data ─────────────────────────────────────────────────────────────

  public func seedProducts(products : List.List<Product>) {
    if (not products.isEmpty()) return;
    let now = Time.now();
    let seed : [Product] = [
      {
        id = 1;
        title = "Accountancy Class 11 — Complete Notes";
        description = "Comprehensive handwritten-style notes covering the full Class 11 Accountancy syllabus. Includes solved examples, shortcuts, and exam tips prepared by Arthashastra faculty.";
        price = 299.0;
        category = #Notes;
        imageUrl = "";
        isAvailable = true;
        createdAt = now;
      },
      {
        id = 2;
        title = "Class 12 Commerce Crash Course Book";
        description = "An all-in-one revision book for Class 12 Commerce students covering Accountancy, Business Studies, and Economics. Packed with past paper questions and model answers.";
        price = 499.0;
        category = #Book;
        imageUrl = "";
        isAvailable = true;
        createdAt = now;
      },
      {
        id = 3;
        title = "Economics Class 12 — Formula & Concept Cards";
        description = "A compact set of concept cards covering macroeconomics and microeconomics formulas, diagrams, and definitions — ideal for last-minute revision.";
        price = 199.0;
        category = #Notes;
        imageUrl = "";
        isAvailable = true;
        createdAt = now;
      },
      {
        id = 4;
        title = "Arthashastra Classes — Branded Diary";
        description = "A premium A5 ruled diary with the Arthashastra Classes logo. Perfect for notes, timetables, and goal-tracking. High-quality paper and durable cover.";
        price = 249.0;
        category = #Merchandise;
        imageUrl = "";
        isAvailable = true;
        createdAt = now;
      },
      {
        id = 5;
        title = "Arthashastra Classes — Polo T-Shirt";
        description = "Soft-cotton institute polo T-shirt with embroidered Arthashastra Classes branding. Available in navy blue. Sizes S, M, L, XL. Show your institute pride!";
        price = 599.0;
        category = #Merchandise;
        imageUrl = "";
        isAvailable = true;
        createdAt = now;
      },
    ];
    for (p in seed.values()) {
      products.add(p);
    };
  };
};

import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import TestimonialTypes "../types/testimonials";
import TestimonialsLib "../lib/testimonials";

mixin (testimonials : List.List<TestimonialsLib.Testimonial>) {
  var nextTestimonialId : Nat = 1;

  public query func getTestimonials() : async [TestimonialTypes.Testimonial] {
    TestimonialsLib.getTestimonials(testimonials);
  };

  public shared ({ caller }) func createTestimonial(input : TestimonialTypes.TestimonialInput) : async TestimonialTypes.Testimonial {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    let id = "t" # nextTestimonialId.toText();
    nextTestimonialId += 1;
    TestimonialsLib.createTestimonial(testimonials, id, input, Time.now());
  };

  public shared ({ caller }) func updateTestimonial(id : Text, input : TestimonialTypes.TestimonialInput) : async ?TestimonialTypes.Testimonial {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    TestimonialsLib.updateTestimonial(testimonials, id, input);
  };

  public shared ({ caller }) func deleteTestimonial(id : Text) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    TestimonialsLib.deleteTestimonial(testimonials, id);
  };

  public shared ({ caller }) func toggleTestimonialVisibility(id : Text) : async ?TestimonialTypes.Testimonial {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    TestimonialsLib.toggleTestimonialVisibility(testimonials, id);
  };
};

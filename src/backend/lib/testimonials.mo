import List "mo:core/List";
import TestimonialTypes "../types/testimonials";
import CommonTypes "../types/common";

module {
  public type Testimonial = TestimonialTypes.Testimonial;
  public type TestimonialInput = TestimonialTypes.TestimonialInput;

  public func getTestimonials(testimonials : List.List<Testimonial>) : [Testimonial] {
    testimonials.filter(func(t) { t.isVisible }).toArray();
  };

  public func createTestimonial(
    testimonials : List.List<Testimonial>,
    id : Text,
    input : TestimonialInput,
    now : CommonTypes.Timestamp,
  ) : Testimonial {
    let t : Testimonial = {
      id;
      studentName = input.studentName;
      rating = input.rating;
      text = input.text;
      marks = input.marks;
      subject = input.subject;
      photoUrl = input.photoUrl;
      isVideo = input.isVideo;
      isVisible = input.isVisible;
      createdAt = now;
    };
    testimonials.add(t);
    t;
  };

  public func updateTestimonial(
    testimonials : List.List<Testimonial>,
    id : Text,
    input : TestimonialInput,
  ) : ?Testimonial {
    var updated : ?Testimonial = null;
    testimonials.mapInPlace(
      func(t) {
        if (t.id == id) {
          let u : Testimonial = {
            t with
            studentName = input.studentName;
            rating = input.rating;
            text = input.text;
            marks = input.marks;
            subject = input.subject;
            photoUrl = input.photoUrl;
            isVideo = input.isVideo;
            isVisible = input.isVisible;
          };
          updated := ?u;
          u;
        } else t;
      }
    );
    updated;
  };

  public func deleteTestimonial(
    testimonials : List.List<Testimonial>,
    id : Text,
  ) : Bool {
    let sizeBefore = testimonials.size();
    let filtered = testimonials.filter(func(t) { t.id != id });
    testimonials.clear();
    testimonials.append(filtered);
    testimonials.size() < sizeBefore;
  };

  public func toggleTestimonialVisibility(
    testimonials : List.List<Testimonial>,
    id : Text,
  ) : ?Testimonial {
    var updated : ?Testimonial = null;
    testimonials.mapInPlace(
      func(t) {
        if (t.id == id) {
          let u : Testimonial = { t with isVisible = not t.isVisible };
          updated := ?u;
          u;
        } else t;
      }
    );
    updated;
  };

  public func seedTestimonials(
    testimonials : List.List<Testimonial>,
    now : CommonTypes.Timestamp,
  ) {
    if (not testimonials.isEmpty()) return;
    let seed : [Testimonial] = [
      {
        id = "t1";
        studentName = "Priya Sharma";
        rating = 5;
        text = "Arthashastra Classes transformed my understanding of Accountancy. The faculty explains each concept with such clarity. I scored 96 in my boards!";
        marks = "96/100";
        subject = "Accountancy";
        photoUrl = null;
        isVideo = false;
        isVisible = true;
        createdAt = now;
      },
      {
        id = "t2";
        studentName = "Rahul Verma";
        rating = 5;
        text = "Economics used to scare me, but the way it's taught here made it my strongest subject. Highly recommended for any commerce student.";
        marks = "94/100";
        subject = "Economics";
        photoUrl = null;
        isVideo = false;
        isVisible = true;
        createdAt = now;
      },
      {
        id = "t3";
        studentName = "Sneha Patel";
        rating = 5;
        text = "The study materials and test series here are exceptional. Business Studies became so interesting with their real-world examples.";
        marks = "92/100";
        subject = "Business Studies";
        photoUrl = null;
        isVideo = false;
        isVisible = true;
        createdAt = now;
      },
      {
        id = "t4";
        studentName = "Amit Joshi";
        rating = 5;
        text = "I was a dropper and Arthashastra Classes gave me the confidence and strategy to crack my boards with distinction. Best decision ever!";
        marks = "91/100";
        subject = "Accountancy";
        photoUrl = null;
        isVideo = false;
        isVisible = true;
        createdAt = now;
      },
      {
        id = "t5";
        studentName = "Kavya Singh";
        rating = 5;
        text = "The digital platform makes learning so convenient. I could access notes and videos anytime. My overall commerce percentage jumped by 15 marks.";
        marks = "95/100";
        subject = "Commerce";
        photoUrl = null;
        isVideo = false;
        isVisible = true;
        createdAt = now;
      },
    ];
    for (t in seed.values()) {
      testimonials.add(t);
    };
  };
};

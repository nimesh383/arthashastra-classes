import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Array "mo:core/Array";
import EventTypes "../types/events";
import CommonTypes "../types/common";

module {
  public type Event = EventTypes.Event;
  public type EventInput = EventTypes.EventInput;
  public type EventRegistration = EventTypes.EventRegistration;
  public type EventRegistrationInput = EventTypes.EventRegistrationInput;

  func compareByDate(a : Event, b : Event) : { #less; #equal; #greater } {
    Int.compare(a.eventDate, b.eventDate)
  };

  public func getEvents(events : List.List<Event>) : [Event] {
    let visible = events.filter(func(e) { e.isVisible });
    visible.toArray().sort(compareByDate);
  };

  public func getUpcomingEvents(events : List.List<Event>) : [Event] {
    let upcoming = events.filter(func(e) { e.isVisible and e.status == #upcoming });
    upcoming.toArray().sort(compareByDate);
  };

  public func getPastEvents(events : List.List<Event>) : [Event] {
    events.filter(func(e) { e.isVisible and e.status == #completed }).toArray();
  };

  public func getEventDetail(events : List.List<Event>, id : Nat) : ?Event {
    events.find(func(e) { e.id == id });
  };

  public func registerForEvent(
    registrations : List.List<EventRegistration>,
    events : List.List<Event>,
    nextId : Nat,
    caller : Principal,
    input : EventRegistrationInput,
    now : CommonTypes.Timestamp,
  ) : EventRegistration {
    // increment registeredCount on the event
    events.mapInPlace(func(e) {
      if (e.id == input.eventId) { { e with registeredCount = e.registeredCount + 1 } }
      else e
    });
    let reg : EventRegistration = {
      id = nextId;
      eventId = input.eventId;
      studentId = caller.toText();
      name = input.name;
      email = input.email;
      phone = input.phone;
      registeredAt = now;
    };
    registrations.add(reg);
    reg;
  };

  public func getMyRegistrations(
    registrations : List.List<EventRegistration>,
    caller : Principal,
  ) : [EventRegistration] {
    registrations.filter(func(r) { r.studentId == caller.toText() }).toArray();
  };

  public func getEventRegistrations(
    registrations : List.List<EventRegistration>,
    eventId : Nat,
  ) : [EventRegistration] {
    registrations.filter(func(r) { r.eventId == eventId }).toArray();
  };

  public func createEvent(
    events : List.List<Event>,
    nextId : Nat,
    input : EventInput,
    now : CommonTypes.Timestamp,
  ) : Event {
    let ev : Event = {
      id = nextId;
      title = input.title;
      description = input.description;
      eventDate = input.eventDate;
      endDate = input.endDate;
      imageUrl = input.imageUrl;
      speaker = input.speaker;
      topics = input.topics;
      capacity = input.capacity;
      registeredCount = 0;
      status = input.status;
      isVisible = input.isVisible;
      createdAt = now;
    };
    events.add(ev);
    ev;
  };

  public func updateEvent(
    events : List.List<Event>,
    id : Nat,
    input : EventInput,
  ) : ?Event {
    var updated : ?Event = null;
    events.mapInPlace(func(e) {
      if (e.id == id) {
        let u : Event = {
          e with
          title = input.title;
          description = input.description;
          eventDate = input.eventDate;
          endDate = input.endDate;
          imageUrl = input.imageUrl;
          speaker = input.speaker;
          topics = input.topics;
          capacity = input.capacity;
          status = input.status;
          isVisible = input.isVisible;
        };
        updated := ?u;
        u;
      } else e;
    });
    updated;
  };

  public func deleteEvent(events : List.List<Event>, id : Nat) : Bool {
    let sizeBefore = events.size();
    let kept = events.filter(func(e) { e.id != id });
    events.clear();
    events.append(kept);
    events.size() < sizeBefore;
  };

  public func seedEvents(events : List.List<Event>) {
    if (not events.isEmpty()) return;
    let now = Time.now();
    // upcoming events approx 7, 14, 30 days from now
    let day : Int = 86_400_000_000_000;
    let seed : [Event] = [
      {
        id = 1;
        title = "Commerce Career Guidance Webinar";
        description = "Expert session on career options after Class 12 Commerce — CA, CMA, CS, MBA, BBA and more.";
        eventDate = now + (7 * day);
        endDate = now + (7 * day) + (2 * 3_600_000_000_000);
        imageUrl = "";
        speaker = "Ajay Govindani";
        topics = ["CA Foundation", "CMA Route", "MBA Admission", "Study Plan"];
        capacity = 200;
        registeredCount = 0;
        status = #upcoming;
        isVisible = true;
        createdAt = now;
      },
      {
        id = 2;
        title = "Accountancy Doubt Clearing Session";
        description = "Live doubt clearing for Class 12 Accountancy — Partnership, Company Accounts, Cash Flow.";
        eventDate = now + (14 * day);
        endDate = now + (14 * day) + (3_600_000_000_000);
        imageUrl = "";
        speaker = "Ajay Govindani";
        topics = ["Partnership Accounts", "Company Accounts", "Cash Flow Statement"];
        capacity = 150;
        registeredCount = 0;
        status = #upcoming;
        isVisible = true;
        createdAt = now;
      },
      {
        id = 3;
        title = "Board Exam Strategy Workshop";
        description = "Strategies, time management tips, and mock paper walkthrough for Class 12 Board Exams.";
        eventDate = now + (30 * day);
        endDate = now + (30 * day) + (4 * 3_600_000_000_000);
        imageUrl = "";
        speaker = "Ajay Govindani";
        topics = ["Exam Strategy", "Time Management", "Answer Writing", "Mock Test Review"];
        capacity = 300;
        registeredCount = 0;
        status = #upcoming;
        isVisible = true;
        createdAt = now;
      },
    ];
    for (ev in seed.values()) {
      events.add(ev);
    };
  };
};

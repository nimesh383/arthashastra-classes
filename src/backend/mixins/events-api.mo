import List "mo:core/List";
import Time "mo:core/Time";
import EventTypes "../types/events";
import EventsLib "../lib/events";

mixin (
  events : List.List<EventsLib.Event>,
  eventRegistrations : List.List<EventsLib.EventRegistration>,
) {
  var nextEventId : Nat = 1;
  var nextRegistrationId : Nat = 1;

  public query func getEvents() : async [EventTypes.Event] {
    EventsLib.getEvents(events);
  };

  public query func getUpcomingEvents() : async [EventTypes.Event] {
    EventsLib.getUpcomingEvents(events);
  };

  public query func getPastEvents() : async [EventTypes.Event] {
    EventsLib.getPastEvents(events);
  };

  public query func getEventDetail(id : Nat) : async ?EventTypes.Event {
    EventsLib.getEventDetail(events, id);
  };

  public shared ({ caller }) func registerForEvent(input : EventTypes.EventRegistrationInput) : async EventTypes.EventRegistration {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    let reg = EventsLib.registerForEvent(eventRegistrations, events, nextRegistrationId, caller, input, Time.now());
    nextRegistrationId += 1;
    reg;
  };

  public shared query ({ caller }) func getMyRegistrations() : async [EventTypes.EventRegistration] {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    EventsLib.getMyRegistrations(eventRegistrations, caller);
  };

  public query ({ caller }) func getEventRegistrations(eventId : Nat) : async [EventTypes.EventRegistration] {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    EventsLib.getEventRegistrations(eventRegistrations, eventId);
  };

  public shared ({ caller }) func createEvent(input : EventTypes.EventInput) : async EventTypes.Event {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    let ev = EventsLib.createEvent(events, nextEventId, input, Time.now());
    nextEventId += 1;
    ev;
  };

  public shared ({ caller }) func updateEvent(id : Nat, input : EventTypes.EventInput) : async ?EventTypes.Event {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    EventsLib.updateEvent(events, id, input);
  };

  public shared ({ caller }) func deleteEvent(id : Nat) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    EventsLib.deleteEvent(events, id);
  };
};

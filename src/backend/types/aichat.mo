import CommonTypes "common";

module {
  public type MessageRole = {
    #user;
    #assistant;
  };

  public type ChatMessage = {
    id : Nat;
    sessionId : Text;
    role : MessageRole;
    content : Text;
    timestamp : CommonTypes.Timestamp;
  };

  public type ChatSession = {
    id : Text;
    userId : Text;
    createdAt : CommonTypes.Timestamp;
    messageCount : Nat;
  };
};

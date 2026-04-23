import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import AiChatTypes "../types/aichat";
import AiChatLib "../lib/aichat";

mixin (
  chatMessages : List.List<AiChatLib.ChatMessage>,
  chatSessions : List.List<AiChatLib.ChatSession>,
) {
  type HttpHeader = { name : Text; value : Text };
  type HttpResponse = {
    status : Nat;
    headers : [HttpHeader];
    body : Blob;
  };
  type HttpRequest = {
    url : Text;
    max_response_bytes : ?Nat64;
    headers : [HttpHeader];
    body : ?Blob;
    method : { #get; #post; #head };
    transform : ?{
      function : shared query ({ response : HttpResponse; context : Blob }) -> async HttpResponse;
      context : Blob;
    };
  };

  var nextChatMessageId : Nat = 1;

  let ic : actor { http_request : HttpRequest -> async HttpResponse } = actor "aaaaa-aa";

  public shared func sendChatMessage(sessionId : Text, message : Text) : async Text {
    let now = Time.now();

    // Create session record if it doesn't exist
    switch (chatSessions.find(func(s : AiChatLib.ChatSession) : Bool { s.id == sessionId })) {
      case null {
        chatSessions.add({
          id = sessionId;
          userId = "anonymous";
          createdAt = now;
          messageCount = 0;
        });
      };
      case (?_) {};
    };

    // Store user message
    ignore AiChatLib.addMessage(chatMessages, nextChatMessageId, sessionId, #user, message, now);
    nextChatMessageId += 1;

    // Gather conversation history (context for Claude)
    let history = AiChatLib.getHistory(chatMessages, sessionId);

    // Build Claude API JSON payload
    let payload = AiChatLib.buildClaudePayload(history, message);
    let bodyBlob : Blob = payload.encodeUtf8();

    // Claude API key — configure via environment variable or admin update
    let apiKey = "YOUR_ANTHROPIC_API_KEY";

    // Add cycles for the HTTP outcall (100B cycles)
    let responseText : Text = try {
      let httpResponse = await (with cycles = 100_000_000_000) ic.http_request({
        url = "https://api.anthropic.com/v1/messages";
        max_response_bytes = ?10_000;
        headers = [
          { name = "Content-Type"; value = "application/json" },
          { name = "x-api-key"; value = apiKey },
          { name = "anthropic-version"; value = "2023-06-01" },
        ];
        body = ?bodyBlob;
        method = #post;
        transform = null;
      });
      switch (httpResponse.body.decodeUtf8()) {
        case null "I'm sorry, I couldn't process the response. Please try again.";
        case (?bodyText) AiChatLib.extractClaudeResponse(bodyText);
      };
    } catch (_e) {
      "I'm currently unavailable. Please check back shortly.";
    };

    // Store assistant response
    ignore AiChatLib.addMessage(chatMessages, nextChatMessageId, sessionId, #assistant, responseText, Time.now());
    nextChatMessageId += 1;

    responseText;
  };

  public query func getChatHistory(sessionId : Text) : async [AiChatTypes.ChatMessage] {
    AiChatLib.getHistory(chatMessages, sessionId);
  };

  public func clearChatSession(sessionId : Text) : async Bool {
    let sessionsBefore = chatSessions.size();
    let keptSessions = chatSessions.filter(func(s : AiChatLib.ChatSession) : Bool { s.id != sessionId });
    chatSessions.clear();
    chatSessions.append(keptSessions);
    ignore AiChatLib.clearSession(chatMessages, sessionId);
    chatSessions.size() < sessionsBefore;
  };
};

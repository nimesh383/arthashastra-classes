import List "mo:core/List";
import Text "mo:core/Text";
import AiChatTypes "../types/aichat";
import CommonTypes "../types/common";

module {
  public type ChatMessage = AiChatTypes.ChatMessage;
  public type ChatSession = AiChatTypes.ChatSession;

  public func getHistory(messages : List.List<ChatMessage>, sessionId : Text) : [ChatMessage] {
    messages.filter(func(m) { m.sessionId == sessionId }).toArray();
  };

  public func addMessage(
    messages : List.List<ChatMessage>,
    nextId : Nat,
    sessionId : Text,
    role : AiChatTypes.MessageRole,
    content : Text,
    now : CommonTypes.Timestamp,
  ) : ChatMessage {
    let msg : ChatMessage = {
      id = nextId;
      sessionId;
      role;
      content;
      timestamp = now;
    };
    messages.add(msg);
    msg;
  };

  public func clearSession(messages : List.List<ChatMessage>, sessionId : Text) : Bool {
    let sizeBefore = messages.size();
    let kept = messages.filter(func(m) { m.sessionId != sessionId });
    messages.clear();
    messages.append(kept);
    messages.size() < sizeBefore;
  };

  // Build JSON payload for Claude API (claude-3-haiku-20240307)
  public func buildClaudePayload(sessionMessages : [ChatMessage], userMessage : Text) : Text {
    let systemPrompt = "You are an AI assistant for Arthashastra Classes, a premier commerce coaching institute in Bhopal, India. Help students with doubts in Commerce, Accountancy, Economics, Business Studies, and Mathematics. Also answer questions about courses, fees, batch timings, study plans, and institute information. Be friendly, concise, and encouraging. Keep answers focused on commerce stream topics and institute-related queries.";

    // Build messages array — last 10 messages from history + new user message
    let histLen = sessionMessages.size();
    let start = if (histLen > 10) histLen - 10 else 0;
    var messagesJson = "";
    var first = true;
    var i = start;
    while (i < histLen) {
      let m = sessionMessages[i];
      let roleStr = switch (m.role) { case (#user) "user"; case (#assistant) "assistant" };
      let escaped = escapeJson(m.content);
      if (not first) { messagesJson #= "," };
      messagesJson #= "{\"role\":\"" # roleStr # "\",\"content\":\"" # escaped # "\"}";
      first := false;
      i += 1;
    };
    // append the new user message
    let escapedUser = escapeJson(userMessage);
    if (not first) { messagesJson #= "," };
    messagesJson #= "{\"role\":\"user\",\"content\":\"" # escapedUser # "\"}";

    "{\"model\":\"claude-3-haiku-20240307\",\"max_tokens\":1024,\"system\":\"" # escapeJson(systemPrompt) # "\",\"messages\":[" # messagesJson # "]}";
  };

  // Extract text content from Claude API JSON response
  public func extractClaudeResponse(body : Text) : Text {
    // Look for "text":"..." pattern in the response
    let textKey = "\"text\":\"";
    switch (findSubstring(body, textKey)) {
      case null "I'm sorry, I couldn't process your request. Please try again.";
      case (?startIdx) {
        let contentStart = startIdx + textKey.size();
        // find closing quote (unescaped)
        extractUntilUnescapedQuote(body, contentStart);
      };
    };
  };

  // Simple substring search — returns index of first occurrence
  func findSubstring(text : Text, needle : Text) : ?Nat {
    let tChars = text.toArray();
    let nChars = needle.toArray();
    let tLen = tChars.size();
    let nLen = nChars.size();
    if (nLen == 0) return ?0;
    if (tLen < nLen) return null;
    var i = 0;
    while (i <= tLen - nLen) {
      var j = 0;
      var matched = true;
      while (j < nLen and matched) {
        if (tChars[i + j] != nChars[j]) matched := false;
        j += 1;
      };
      if (matched) return ?i;
      i += 1;
    };
    null;
  };

  // Extract characters from a JSON string value until unescaped closing quote
  func extractUntilUnescapedQuote(text : Text, startIdx : Nat) : Text {
    let chars = text.toArray();
    let len = chars.size();
    var result = "";
    var i = startIdx;
    var escape = false;
    while (i < len) {
      let c = chars[i];
      if (escape) {
        switch (c) {
          case ('n') { result #= "\n" };
          case ('t') { result #= "\t" };
          case ('r') { result #= "\r" };
          case ('\\') { result #= "\\" };
          case ('\"') { result #= "\"" };
          case (_) { result #= "\\" # Text.fromChar(c) };
        };
        escape := false;
      } else if (c == '\\') {
        escape := true;
      } else if (c == '\"') {
        return result;
      } else {
        result #= Text.fromChar(c);
      };
      i += 1;
    };
    result;
  };

  // Escape a text value for embedding in JSON
  func escapeJson(text : Text) : Text {
    var result = "";
    for (c in text.toIter()) {
      switch (c) {
        case ('\"') { result #= "\\\"" };
        case ('\\') { result #= "\\\\" };
        case ('\n') { result #= "\\n" };
        case ('\r') { result #= "\\r" };
        case ('\t') { result #= "\\t" };
        case (_) { result #= Text.fromChar(c) };
      };
    };
    result;
  };
};

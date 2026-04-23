import List "mo:core/List";
import Time "mo:core/Time";
import TestTypes "../types/tests";
import QuestionsLib "../lib/questions";
import TestAttemptsLib "../lib/testAttempts";

mixin (
  questions : List.List<QuestionsLib.Question>,
  testAttempts : List.List<TestTypes.TestAttempt>,
  attemptAnswers : List.List<TestTypes.TestAttemptAnswer>,
  testResults : List.List<TestTypes.TestResult>,
) {
  var nextAttemptId : Nat = 1;
  var nextAttemptAnswerId : Nat = 1;
  var nextResultId : Nat = 1;

  public shared ({ caller }) func startAttempt(testId : Nat) : async TestTypes.TestAttempt {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    let attempt = TestAttemptsLib.startAttempt(testAttempts, nextAttemptId, testId, caller, Time.now());
    nextAttemptId += 1;
    attempt;
  };

  public shared ({ caller }) func submitAttempt(
    attemptId : Nat,
    answers : [(Nat, Text)],
  ) : async TestTypes.TestResult {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    let resultOpt = TestAttemptsLib.submitAttempt(
      testAttempts, attemptAnswers, testResults, questions,
      nextAttemptAnswerId, nextResultId,
      attemptId, caller, answers, Time.now(),
    );
    switch (resultOpt) {
      case null Runtime.trap("Attempt not found or already submitted");
      case (?(result, newAnswers, _)) {
        nextAttemptAnswerId += newAnswers;
        nextResultId += 1;
        result;
      };
    };
  };

  public shared query ({ caller }) func getMyAttempts(testId : ?Nat) : async [TestTypes.TestAttempt] {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    TestAttemptsLib.getMyAttempts(testAttempts, caller, testId);
  };

  public shared query ({ caller }) func getMyResults() : async [TestTypes.TestResult] {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    TestAttemptsLib.getMyResults(testResults, caller);
  };

  public shared query ({ caller }) func getAttemptAnswers(attemptId : Nat) : async [TestTypes.TestAttemptAnswer] {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    TestAttemptsLib.getAttemptAnswers(attemptAnswers, testAttempts, attemptId, caller);
  };

  public query func getTestLeaderboard(testId : Nat) : async [(Text, Float)] {
    TestAttemptsLib.getTestLeaderboard(testResults, testId);
  };

  public query ({ caller }) func getAdminTestAnalytics(testId : Nat) : async TestAttemptsLib.TestAnalytics {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    TestAttemptsLib.getAdminTestAnalytics(testResults, testId);
  };
};

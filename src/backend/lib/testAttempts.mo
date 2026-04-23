import List "mo:core/List";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import TestTypes "../types/tests";
import CommonTypes "../types/common";

module {
  public type TestAttempt = TestTypes.TestAttempt;
  public type TestAttemptAnswer = TestTypes.TestAttemptAnswer;
  public type TestResult = TestTypes.TestResult;
  public type Question = TestTypes.Question;

  func calcGrade(pct : Float) : Text {
    if (pct >= 90.0) "A"
    else if (pct >= 75.0) "B"
    else if (pct >= 60.0) "C"
    else if (pct >= 45.0) "D"
    else "F";
  };

  public func startAttempt(
    attempts : List.List<TestAttempt>,
    nextId : Nat,
    testId : Nat,
    caller : Principal,
    now : CommonTypes.Timestamp,
  ) : TestAttempt {
    let attempt : TestAttempt = {
      id = nextId;
      testId;
      studentId = caller.toText();
      startedAt = now;
      submittedAt = null;
      status = #in_progress;
    };
    attempts.add(attempt);
    attempt;
  };

  public func submitAttempt(
    attempts : List.List<TestAttempt>,
    attemptAnswers : List.List<TestAttemptAnswer>,
    results : List.List<TestResult>,
    questions : List.List<Question>,
    nextAnswerId : Nat,
    nextResultId : Nat,
    attemptId : Nat,
    caller : Principal,
    answers : [(Nat, Text)],
    now : CommonTypes.Timestamp,
  ) : ?(TestResult, Nat, Nat) {
    // find the in-progress attempt owned by caller
    let attemptOpt = attempts.find(func(a) {
      a.id == attemptId and a.studentId == caller.toText() and a.status == #in_progress
    });
    switch (attemptOpt) {
      case null null;
      case (?attempt) {
        // mark attempt submitted
        attempts.mapInPlace(func(a) {
          if (a.id == attemptId) {
            { a with status = #submitted; submittedAt = ?now }
          } else a
        });

        // score answers
        var totalPoints : Nat = 0;
        var maxPoints : Nat = 0;
        var ansIdCounter = nextAnswerId;
        for ((qId, studentAnswer) in answers.values()) {
          switch (questions.find(func(q) { q.id == qId and q.testId == attempt.testId })) {
            case null {};
            case (?q) {
              maxPoints += q.points;
              let isCorrect = studentAnswer == q.correctAnswer;
              let awarded = if (isCorrect) q.points else 0;
              totalPoints += awarded;
              let aa : TestAttemptAnswer = {
                id = ansIdCounter;
                attemptId;
                questionId = qId;
                studentAnswer;
                isCorrect;
                pointsAwarded = awarded;
              };
              attemptAnswers.add(aa);
              ansIdCounter += 1;
            };
          };
        };

        let pct : Float = if (maxPoints == 0) 0.0 else
          (totalPoints.toFloat() / maxPoints.toFloat()) * 100.0;

        let timeTaken = now - attempt.startedAt;

        let result : TestResult = {
          id = nextResultId;
          attemptId;
          studentId = caller.toText();
          testId = attempt.testId;
          totalPoints;
          maxPoints;
          percentage = pct;
          grade = calcGrade(pct);
          timeTaken;
          createdAt = now;
        };
        results.add(result);

        let newAnswerCount = ansIdCounter - nextAnswerId;
        ?(result, newAnswerCount, 1);
      };
    };
  };

  public func getMyAttempts(
    attempts : List.List<TestAttempt>,
    caller : Principal,
    testIdOpt : ?Nat,
  ) : [TestAttempt] {
    attempts.filter(func(a) {
      a.studentId == caller.toText() and
      (switch (testIdOpt) { case null true; case (?tid) a.testId == tid })
    }).toArray();
  };

  public func getMyResults(
    results : List.List<TestResult>,
    caller : Principal,
  ) : [TestResult] {
    results.filter(func(r) { r.studentId == caller.toText() }).toArray();
  };

  public func getAttemptAnswers(
    attemptAnswers : List.List<TestAttemptAnswer>,
    attempts : List.List<TestAttempt>,
    attemptId : Nat,
    caller : Principal,
  ) : [TestAttemptAnswer] {
    // verify caller owns the attempt
    switch (attempts.find(func(a) { a.id == attemptId and a.studentId == caller.toText() })) {
      case null [];
      case (?_) {
        attemptAnswers.filter(func(aa) { aa.attemptId == attemptId }).toArray();
      };
    };
  };

  public func getTestLeaderboard(
    results : List.List<TestResult>,
    testId : Nat,
  ) : [(Text, Float)] {
    // best result per student
    let filtered = results.filter(func(r) { r.testId == testId });
    let arr = filtered.toArray();
    // build best score per student
    let bestMap = List.empty<(Text, Float)>();
    for (r in arr.values()) {
      let existing = bestMap.find(func(pair : (Text, Float)) : Bool { pair.0 == r.studentId });
      switch (existing) {
        case null { bestMap.add((r.studentId, r.percentage)) };
        case (?(_, prev)) {
          if (r.percentage > prev) {
            bestMap.mapInPlace(func(p) {
              if (p.0 == r.studentId) (r.studentId, r.percentage) else p
            });
          };
        };
      };
    };
    // sort descending by percentage
    let sorted = bestMap.toArray();
    sorted.sort(func(a : (Text, Float), b : (Text, Float)) : { #less; #equal; #greater } {
      Float.compare(b.1, a.1)
    });
  };

  public type TestAnalytics = {
    totalAttempts : Nat;
    avgScore : Float;
    passRate : Float;
  };

  public func getAdminTestAnalytics(
    results : List.List<TestResult>,
    testId : Nat,
  ) : TestAnalytics {
    let testResults = results.filter(func(r) { r.testId == testId });
    let arr = testResults.toArray();
    let total = arr.size();
    if (total == 0) {
      return { totalAttempts = 0; avgScore = 0.0; passRate = 0.0 };
    };
    var sumPct : Float = 0.0;
    var passed : Nat = 0;
    for (r in arr.values()) {
      sumPct += r.percentage;
      if (r.percentage >= 45.0) passed += 1;
    };
    {
      totalAttempts = total;
      avgScore = sumPct / total.toFloat();
      passRate = (passed.toFloat() / total.toFloat()) * 100.0;
    };
  };
};

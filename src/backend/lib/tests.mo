import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import TestTypes "../types/tests";

module {
  public type TestSeries = TestTypes.TestSeries;

  public type TestSeriesView = {
    id : Nat;
    title : Text;
    subject : TestTypes.Subject;
    duration : Nat;
    totalQuestions : Nat;
    difficulty : TestTypes.Difficulty;
    isAttempted : Bool;
    score : ?Nat;
  };

  func comparePrincipalNat(a : (Principal, Nat), b : (Principal, Nat)) : Order.Order {
    let pc = Principal.compare(a.0, b.0);
    switch (pc) {
      case (#equal) Nat.compare(a.1, b.1);
      case other other;
    };
  };

  public func getTestSeries(
    tests : List.List<TestSeries>,
    attempts : Map.Map<(Principal, Nat), Nat>,
    caller : Principal,
  ) : [TestSeriesView] {
    tests.map<TestSeries, TestSeriesView>(func(t) {
      let key = (caller, t.id);
      let scoreOpt = attempts.get(comparePrincipalNat, key);
      {
        id = t.id;
        title = t.title;
        subject = t.subject;
        duration = t.duration;
        totalQuestions = t.totalQuestions;
        difficulty = t.difficulty;
        isAttempted = switch (scoreOpt) { case (?_) true; case null false };
        score = scoreOpt;
      };
    }).toArray();
  };

  public func seedTests(tests : List.List<TestSeries>) {
    tests.add({
      id = 1;
      title = "Accountancy Class 12 — Full Syllabus Mock Test";
      subject = #Accountancy;
      duration = 180;
      totalQuestions = 60;
      difficulty = #Hard;
    });
    tests.add({
      id = 2;
      title = "Economics Class 12 — Chapter 1–4 Mini Test";
      subject = #Economics;
      duration = 60;
      totalQuestions = 25;
      difficulty = #Medium;
    });
    tests.add({
      id = 3;
      title = "Business Studies Class 12 — Unit Test 1";
      subject = #BST;
      duration = 90;
      totalQuestions = 40;
      difficulty = #Easy;
    });
    tests.add({
      id = 4;
      title = "Accountancy Class 11 — Journal & Ledger Practice";
      subject = #Accountancy;
      duration = 60;
      totalQuestions = 30;
      difficulty = #Medium;
    });
    tests.add({
      id = 5;
      title = "Economics Class 11 — Microeconomics Grand Test";
      subject = #Economics;
      duration = 120;
      totalQuestions = 50;
      difficulty = #Hard;
    });
  };
};

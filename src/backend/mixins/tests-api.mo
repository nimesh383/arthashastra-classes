import List "mo:core/List";
import Map "mo:core/Map";
import TestsLib "../lib/tests";

mixin (
  tests : List.List<TestsLib.TestSeries>,
  testAttempts : Map.Map<(Principal, Nat), Nat>,
) {
  public shared query ({ caller }) func getTestSeries() : async [TestsLib.TestSeriesView] {
    TestsLib.getTestSeries(tests, testAttempts, caller);
  };
};

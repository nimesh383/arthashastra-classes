import List "mo:core/List";
import Time "mo:core/Time";
import TestTypes "../types/tests";
import QuestionsLib "../lib/questions";

mixin (questions : List.List<QuestionsLib.Question>) {
  var nextQuestionId : Nat = 1;

  public query func getQuestionsByTest(testId : Nat) : async [TestTypes.Question] {
    QuestionsLib.getQuestionsByTest(questions, testId);
  };

  public query func getQuestionCount(testId : Nat) : async Nat {
    QuestionsLib.getQuestionCount(questions, testId);
  };

  public shared ({ caller }) func createQuestion(input : TestTypes.QuestionInput) : async TestTypes.Question {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    let q = QuestionsLib.createQuestion(questions, nextQuestionId, input, Time.now());
    nextQuestionId += 1;
    q;
  };

  public shared ({ caller }) func updateQuestion(id : Nat, input : TestTypes.QuestionInput) : async ?TestTypes.Question {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    QuestionsLib.updateQuestion(questions, id, input);
  };

  public shared ({ caller }) func deleteQuestion(id : Nat) : async Bool {
    if (not caller.isController()) Runtime.trap("Unauthorized: admin only");
    QuestionsLib.deleteQuestion(questions, id);
  };
};

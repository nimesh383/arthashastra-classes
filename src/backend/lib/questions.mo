import List "mo:core/List";
import Time "mo:core/Time";
import TestTypes "../types/tests";
import CommonTypes "../types/common";

module {
  public type Question = TestTypes.Question;
  public type QuestionInput = TestTypes.QuestionInput;

  public func getQuestionsByTest(questions : List.List<Question>, testId : Nat) : [Question] {
    questions.filter(func(q) { q.testId == testId }).toArray();
  };

  public func getQuestionCount(questions : List.List<Question>, testId : Nat) : Nat {
    questions.foldLeft<Nat, Question>(0, func(acc, q) {
      if (q.testId == testId) acc + 1 else acc
    });
  };

  public func createQuestion(
    questions : List.List<Question>,
    nextId : Nat,
    input : QuestionInput,
    now : CommonTypes.Timestamp,
  ) : Question {
    let q : Question = {
      id = nextId;
      testId = input.testId;
      questionType = input.questionType;
      text = input.text;
      options = input.options;
      correctAnswer = input.correctAnswer;
      explanation = input.explanation;
      points = input.points;
      orderIndex = input.orderIndex;
      createdAt = now;
    };
    questions.add(q);
    q;
  };

  public func updateQuestion(
    questions : List.List<Question>,
    id : Nat,
    input : QuestionInput,
  ) : ?Question {
    var updated : ?Question = null;
    questions.mapInPlace(func(q) {
      if (q.id == id) {
        let u : Question = {
          q with
          testId = input.testId;
          questionType = input.questionType;
          text = input.text;
          options = input.options;
          correctAnswer = input.correctAnswer;
          explanation = input.explanation;
          points = input.points;
          orderIndex = input.orderIndex;
        };
        updated := ?u;
        u;
      } else q;
    });
    updated;
  };

  public func deleteQuestion(questions : List.List<Question>, id : Nat) : Bool {
    let sizeBefore = questions.size();
    let kept = questions.filter(func(q) { q.id != id });
    questions.clear();
    questions.append(kept);
    questions.size() < sizeBefore;
  };

  public func seedQuestions(questions : List.List<Question>) {
    if (not questions.isEmpty()) return;
    let now = Time.now();
    let seed : [Question] = [
      // Test 1 — Accountancy Class 12
      {
        id = 1; testId = 1; questionType = #multiple_choice;
        text = "Which of the following is not a subsidiary book?";
        options = ["Cash Book", "Purchase Book", "Journal Proper", "Balance Sheet"];
        correctAnswer = "Balance Sheet";
        explanation = "Balance Sheet is a final account, not a subsidiary book.";
        points = 1; orderIndex = 1; createdAt = now;
      },
      {
        id = 2; testId = 1; questionType = #multiple_choice;
        text = "Goodwill is a _______ asset.";
        options = ["Current", "Intangible", "Tangible", "Fictitious"];
        correctAnswer = "Intangible";
        explanation = "Goodwill cannot be seen or touched, making it an intangible asset.";
        points = 1; orderIndex = 2; createdAt = now;
      },
      {
        id = 3; testId = 1; questionType = #multiple_choice;
        text = "When a partner retires, his share is taken by remaining partners in their:";
        options = ["Old ratio", "New ratio", "Gaining ratio", "Sacrificing ratio"];
        correctAnswer = "Gaining ratio";
        explanation = "Retiring partner's share is acquired by remaining partners in their gaining ratio.";
        points = 1; orderIndex = 3; createdAt = now;
      },
      // Test 2 — Economics Class 12
      {
        id = 4; testId = 2; questionType = #multiple_choice;
        text = "Which of the following is a feature of a perfectly competitive market?";
        options = ["Product differentiation", "Price maker", "Large number of buyers and sellers", "Barriers to entry"];
        correctAnswer = "Large number of buyers and sellers";
        explanation = "Perfect competition has many buyers and sellers, homogeneous product, and free entry/exit.";
        points = 1; orderIndex = 1; createdAt = now;
      },
      {
        id = 5; testId = 2; questionType = #multiple_choice;
        text = "The law of demand states that, ceteris paribus, as price increases, quantity demanded:";
        options = ["Increases", "Decreases", "Remains constant", "First increases then decreases"];
        correctAnswer = "Decreases";
        explanation = "There is an inverse relationship between price and quantity demanded.";
        points = 1; orderIndex = 2; createdAt = now;
      },
    ];
    for (q in seed.values()) {
      questions.add(q);
    };
  };
};

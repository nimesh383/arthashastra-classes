import CommonTypes "common";

module {
  public type Subject = {
    #Commerce;
    #Accountancy;
    #Economics;
    #BST;
    #Maths;
  };

  public type Difficulty = {
    #Easy;
    #Medium;
    #Hard;
  };

  public type TestSeries = {
    id : Nat;
    title : Text;
    subject : Subject;
    duration : Nat;
    totalQuestions : Nat;
    difficulty : Difficulty;
  };

  // Question Bank
  public type QuestionType = {
    #multiple_choice;
    #essay;
  };

  public type Question = {
    id : Nat;
    testId : Nat;
    questionType : QuestionType;
    text : Text;
    options : [Text];
    correctAnswer : Text;
    explanation : Text;
    points : Nat;
    orderIndex : Nat;
    createdAt : CommonTypes.Timestamp;
  };

  public type QuestionInput = {
    testId : Nat;
    questionType : QuestionType;
    text : Text;
    options : [Text];
    correctAnswer : Text;
    explanation : Text;
    points : Nat;
    orderIndex : Nat;
  };

  // Test Attempts
  public type AttemptStatus = {
    #in_progress;
    #submitted;
    #timed_out;
  };

  public type TestAttempt = {
    id : Nat;
    testId : Nat;
    studentId : Text;
    startedAt : CommonTypes.Timestamp;
    submittedAt : ?CommonTypes.Timestamp;
    status : AttemptStatus;
  };

  public type TestAttemptInput = {
    testId : Nat;
  };

  // Attempt Answers
  public type TestAttemptAnswer = {
    id : Nat;
    attemptId : Nat;
    questionId : Nat;
    studentAnswer : Text;
    isCorrect : Bool;
    pointsAwarded : Nat;
  };

  // Test Results
  public type TestResult = {
    id : Nat;
    attemptId : Nat;
    studentId : Text;
    testId : Nat;
    totalPoints : Nat;
    maxPoints : Nat;
    percentage : Float;
    grade : Text;
    timeTaken : Int;
    createdAt : CommonTypes.Timestamp;
  };
};

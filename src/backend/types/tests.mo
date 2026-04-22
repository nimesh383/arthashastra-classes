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
};

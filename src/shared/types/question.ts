export interface Question {
  questionId: string;
  question: string;
  userId: string;
  subTypeId: string;
  speechText: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionResponse {
  question: string;
  questionId: string;
  speechText: string;
}

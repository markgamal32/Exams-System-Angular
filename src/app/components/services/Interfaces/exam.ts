export interface Exam {
  Id: number;
  Name: string;
  createdAt: string;
  QuestionCount: number;
  ExamQuestions: ExamQuestionList;
}

export interface ExamQuestionList {
  $id: string;
  $values: ExamQuestion[];
}

export interface ExamQuestion {
  $id: string;
  Id: number;
  Title: string;
  Exam: ExamRef;
  ExamId: number;
  Options: ExamOptionList;
}

export interface ExamOptionList {
  $id: string;
  $values: ExamOption[];
}

export interface ExamOption {
  $id: string;
  Id: number;
  Title: string;
  IsRight: boolean;
  ExamQuestionId: number;
}

export interface ExamRef {
  $ref: string;
}


export interface ExamModel {
  id: number;
  name: string;
  questionCount: number;
  examQuestions: ExamQuestionModel[];
}

export interface ExamQuestionModel {
  id: number;
  title: string;
  options: ExamOptionModel[];
}

export interface ExamOptionModel {
  id: number;
  title: string;
  isRight: boolean;
  examQuestionId: number;
}
export type ErrorMessages = {
  [name: string]: string;
};

export const MIN_QUESTION_BODY = 5;
export const MIN_ANSWER_BODY = 1;

export const testEditorErrors: ErrorMessages = {
  errorInAnswer: 'Niektóre odpowiedzi do tego pytania mają błędy. Popraw je i zapisz test ponownie.',
  shortQuestion: `Zbyt krótkie polecenie, minimalna ilość znaków to ${MIN_QUESTION_BODY}.\n`,
  shortAnswer: `Odpowiedź ma zbyt krótkie polecenie, minimalna ilość znaków to ${MIN_ANSWER_BODY}.\n`,
  atLeastOneCorrectAnswer: `Pytanie musi zawierać co najmniej jedną odpowiedź prawidłową.\n`,
};

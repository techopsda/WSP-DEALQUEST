export type NotificationMessageObject = {
  messageValue?: string; // a variable type integer to store the ammount
  type?: string; // a string to get the exact type of the notification when multiple types are available for a  single stage example : Financing, GlobalEVent, LocalEvent
  messageAction?: string; //a string to describe what action has been taken as a result , example : awarded, deducted
  eventOutcome?: string | null; // astring to store short phrases that describe the outcome of the stage, exaple : Productivity boost, messages for events that had no impact on any column in particular like netrual type on globalevents
  companyName?: string;
};

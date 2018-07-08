export class Activity {
  public text: string;
  public time: string;
  public isBot: boolean;
  public type: string;

  constructor(text: string, time: string, isBot: boolean) {
    this.text = text;
    this.time = time;
    this.isBot = isBot;
  }
}

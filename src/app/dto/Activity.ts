export class Activity {
  public text: string;
  public time: string;
  public isBot: boolean;
  public type: string;
  public link: string;

  constructor(text: string, time: string, isBot: boolean, type: string) {
    this.text = text;
    this.time = time;
    this.isBot = isBot;
    this.type = type;
  }
}

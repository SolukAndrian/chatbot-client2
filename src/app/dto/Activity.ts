export class Activity {
  /** Contains user/bot message */
  public text: string;
  /** Contains time of getting/sending message */
  public time: string;
  /**
   *  Checks if message is from the user or from the bot.
   *  If true, the message is from the bot
   */
  public isBot: boolean;
  /**
   *  Contains type of message.
   *  All types can be found at ActivityType.ts file
   */
  public type: string;
  /** Contains link of bot response message */
  public link: string;

  constructor(text: string, time: string, isBot: boolean, type: string) {
    this.text = text;
    this.time = time;
    this.isBot = isBot;
    this.type = type;
  }

}

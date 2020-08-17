/**
 * Message object to send an email to my personal email box.
 */
export class EmailMessage {

    constructor(public from: string, public to: string, public subject: string, public message: string) {}

}

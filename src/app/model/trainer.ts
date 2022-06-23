export class Trainer{
    pId: number;
    sId: number;
    phrase: string;
    sentiment: number;

    constructor(pId: number, sId: number, phrase: string, sentiment: number){
        this.pId = pId;
        this.sId = sId;
        this.phrase = phrase;
        this.sentiment = sentiment;
    }

}
export class Token {
    word: string;
    count: number;
    pos: string;
    sentiment: string;

    constructor(word: string, count: number, pos: string, sentiment: string){
        this.word = word;
        this.count = count;
        this.pos = pos;
        this.sentiment = sentiment;
    }
}

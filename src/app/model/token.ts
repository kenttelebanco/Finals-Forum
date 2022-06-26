export class Token {
    word: string;
    count: number;
    pos: string;
    sentiment: string;
    probability: number;

    constructor(word: string, count: number, pos: string, sentiment: string, probability: number){
        this.word = word;
        this.count = count + 1;
        this.pos = pos;
        this.sentiment = sentiment;
        this.probability = probability;
    }

    toString(){
        var str = this.word + ' | ' + this.pos;
    }
}

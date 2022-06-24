export class Trainer{
    pId: number;
    sId: number;
    tokens: Array<string>;
    sentiment: number;

    constructor(pId: number, sId: number, tokens: Array<string>, sentiment: number){
        this.pId = pId;
        this.sId = sId;
        this.tokens = tokens;
        this.sentiment = sentiment;
    }

    toJson(){
        return {
            "phraseId": this.pId ,
            "sentenceId": this.sId , 
            "tokens": this.tokens ?? '', 
            "sentiment": this.sentiment
        }

    }





        


    


        
    

}
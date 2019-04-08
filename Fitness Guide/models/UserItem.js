class UserItem {
    
    constructor(item, rating, readIt) {
        this.item = item;
        this.rating = rating;
        this.readIt = readIt;
    }
    
    
    //Setter Methods

    set setItem(value) {
        this.item = value;
    }
    
    set setRating(value) {
        this.rating = value;
    }
    
    set setReadIt(value) {
        this.readIt = value;
    }
    
    //Getter Methods
    get getItem() {
        return this.item;
    }
    
    get getRating() {
        return this.rating;
    }

    get getReadIt() {
        return this.readIt;
    }

}
module.exports = UserItem;
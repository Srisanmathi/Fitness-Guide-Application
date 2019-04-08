

class Item {
    constructor(itemCode,itemName, catalogCategory,description, rating, imageURL,userID)
    {
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.catalogCategory = catalogCategory;
        this.description = description;
        this.rating = rating;
        this.imageURL = imageURL;
        this.userID = userID;
    };
    

    get getItemCode() {
        return this.itemCode;
    }

    set setItemCode(value) {
        this.itemCode = value;
    }

    get getItemName() {
        return this.itemName;
    }

    set setItemName(value) {
        this.itemName = value;
    }

    get getCatalogCategory() {
        return this.catalogCategoryy;
    }

    set setCatalogCategory(value) {
        this.catalogCategory = value;
    }


    get getDescription() {
        return this.description;
    }

    set setDescription(value) {
        this.description = value;
    }

    get getRating() {
        return this.rating;
    }

    set setRating(value) {
        this.rating = value;
    }

    get getImageURL() {
        return this.imageURL;
    }

    set setImageURL(value) {
        this.imageURL = value;
    }

    get getuserID() {
        return this.userID;
    }

    set setuserID(value) {
        this.userID = value;
    }
}

module.exports = Item;

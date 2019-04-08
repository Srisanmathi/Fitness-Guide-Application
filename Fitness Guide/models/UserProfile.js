class UserProfile {
    
    constructor(userID, userItems) {
        this.userID = userID;
        this.userItems = userItems;
    }
    
    
    //Setter Methods

    set setUserID(value) {
        this.userID = value;
    }
    
    set setUserItems(value) {
        this.userItems = value;
    }
    
    //Getter Methods
    get getUserID() {
        return this.userID;
    }
    
    get getUserItems() {
        return this.userItems;
    }

    addItem (userItem){
        for(var i=0;i<this.userItems.length;i++)
        {
            if(this.userItems[i].item.itemCode == userItem.item.itemCode)
            {
                console.log("Item already Saved. Cannot save again!");
                return;
            }
        }
        this.userItems.push(userItem);
        console.log("Item successfully Saved!");
       
    }

    getItems(){
        return this.userItems;
        
    }

    removeItem(itemCode){
        for(var i=0; i<this.userItems.length; i++){
            if(this.userItems[i].item.itemCode == itemCode){
                this.userItems.splice(i,1);
                console.log("Item successfully removed !");
                return;
            }
        }
        console.log('Item Not found in your Saved Items List!');
    }


    getUserItem(itemCode){
        for(var i=0; i<this.userItems.length; i++){
            if(this.userItems[i].item.itemCode == itemCode){
                return this.userItems[i]; 
            }
        }
    }

    

    updateItem(userItem){

        for(var i=0; i<this.userItems.length; i++){
            if(this.userItems[i].item.itemCode == userItem.item.itemCode){
                this.userItems[i].rating = userItem.rating;
                this.userItems[i].readIt = userItem.readIt;
                console.log('Item Updated successfully');
            }
        }
    }

    
    emptyProfile(){
        this.userItems = [];
    }
    

}
module.exports = UserProfile;
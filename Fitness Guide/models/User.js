class User {
    
    constructor(userID, password, firstName, lastName, email, address1, address2, city, state, zipcode, country) {
        this.userID = userID;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.country = country;
    }
    
    
    //Setter Methods

    
    set setUserID(value) {
        this.userID = value;
    }

    set setPassword(value) {
        this.password = value;
    }
    
    
    set setFirstName(value) {
        this.firstName = value;
    }
    
    
    set setLastName(value) {
        this.lastName = value;
    }
    
    
    set setEmail(value) {
        this.email = value;
    }
    
    
    set setAddress1(value) {
        this.address1 = value;
    }
    
    
    set setAddress2(value) {
        this.address2 = value;
    }
    set setCity(value) {
  
          this.city = value;
    }
    
    set setState(value) {
        this.state = value;
    }
    
    set setZipCode(value) {
        this.zipcode = value;
    }
    
    set setCountry(value) {
        this.country = value;
    }
    
    
    //Getter Methods
    get getUserID() {
        return this.userID;
    }
    
    get getPassword() {
        return this.password;
    }

    get getFirstName() {
        return this.firstName;
    }

    get getLastName() {
        return this.lastName;
    }
    
    get getEmail() {
        return this.email;
    }
    
    get getAddress1() {
        return this.address1;
    }

    get getAddress2() {
        return this.address2;
    }

    get getCity() {
        return this.city;
    }

    get getState() {
        return this.state;
    }
    
    get getZipcode() {
        return this.zipcode;
    }
    
    get getCountry() {
        return this.country;
    }

}
module.exports = User;
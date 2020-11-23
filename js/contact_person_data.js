class Contact{

    get id(){return this._id;}
    set id(id){
        this._id=id;
    }
    
    get fullName() { return this._fullName;}
    set fullName(fullName){ 
        let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegex.test(fullName))
            this._fullName=fullName;
        else throw 'Name is Incorrect! ';
    }
    
    get address(){return this._address;}
    set address(address){
        this._address=address;
    }
    
    get city(){return this._city;}
    set city(city){
        this._city=city;
    }
    
    get state(){return this._state;}
    set state(state){
        this._state=state;
    }
    
    get zipCode(){return this._zipCode;}
    set zipCode(zipCode){
        let ZipRegex=RegExp('^[1-9]{1}[0-9]{5}$')
        if(ZipRegex.test(zipCode))
            this._zipCode=zipCode;
        else throw "Zip Code Incorrect!"
    }
    
    get phoneNumber(){return this._phoneNumber;}
    set phoneNumber(phoneNumber) {
        let phoneRegex=RegExp('^[1-9]{2}\\s[1-9]{1}[0-9]{9}$')
        if(phoneRegex.test(phoneNumber))
            this._phoneNumber = phoneNumber;
        else throw "Phone Number is Incorrect!"
    }
    
    //method
    toString(){
        return "Id: "+this.id+" Full Name: "+this.fullName+" Address: "+this.address+" City: "+this.city+
        " State: "+this.state+" Zip Code: "+this.zipCode+" Phone Number: "+this._phoneNumber;
    }
    }
    
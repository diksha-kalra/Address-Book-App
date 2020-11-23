let isUpdate=false;
let contactObj={};

let site_properties={
    home_page: "../pages/home.html",
    add_contact_page: "../pages/AddressBookPage.html"
};

window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector('#name');
    name.addEventListener('input',function(){
        if(name.value.length==0){
            setTextValue('.text-error',"");
            return;
        }
        try{
            (new Contact()).fullName=name.value;
            setTextValue('.text-error',"");
        }catch(e){
            setTextValue('.text-error',e);
        }
    });

    const phone=document.querySelector('#phonenumber');
    phone.addEventListener('input',function(){
        if(phone.value.length==0){
            setTextValue('.phone-error',"");
            return;
        }
        try{
            (new Contact()).phoneNumber=phone.value;
            setTextValue('.phone-error',"");
        }catch(e){
            setTextValue('.phone-error',e);
        }
    });

    const zip=document.querySelector('#pincode');
    zip.addEventListener('input',function(){
        if(zip.value.length==0){
            setTextValue('.zip-error',"");
            return;
        }
        try{
            (new Contact()).zipCode=zip.value;
            setTextValue('.zip-error',"");
        }catch(e){
            setTextValue('.zip-error',e);
        }
    });


    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setContactObject();
        createAndUpdateLocalStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    }
}

function createAndUpdateLocalStorage(){
    let contactList=JSON.parse(localStorage.getItem("ContactList"));
    if(contactList==null){
        contactList=[];
    }
    if(contactList){
        let contactData=contactList.find(contactData=>contactData._id==contactObj._id);
        if(!contactData){
            contactList.push(createContactData());
        }else{
            const index=contactList.map(contactData=>contactData._id).indexOf(contactData._id);
            contactList.splice(index,1,createContactData(contactData._id));
        }
    }else{
        contactList=[createContactData()];
    }
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}

const setContactObject=()=>{
    contactObj._fullName=getInputValueById('#name');
    contactObj._address=getInputValueById('#address');
    contactObj._city=getInputValueById('#city');
    contactObj._state=getInputValueById('#state');
    contactObj._zipCode=getInputValueById('#pincode');
    contactObj._phoneNumber=getInputValueById('#phonenumber');
}

const createContactData=(id)=>{
    let contactData=new Contact();
    if(!id) contactData.id=createNewContactId();
    else contactData.id=id;
    setContactData(contactData);
    return contactData;
}

const setContactData=(contactData)=>{
    try{
        contactData.fullName=contactObj._fullName;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    contactData.address=contactObj._address;
    contactData.city=contactObj._city;
    contactData.state=contactObj._state;
    contactData.zipCode=contactObj._zipCode;
    contactData.phoneNumber=contactObj._phoneNumber;
    alert(contactData.toString());
}

const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}

const createNewContactId=()=>{
    let contactID=localStorage.getItem("ContactID");
    contactID=(!contactID) ?1: (parseInt(contactID)+1).toString();
    localStorage.setItem("ContactID",contactID);
    return contactID;
}


const resetForm=()=>{
    setValue('#name','');
    setValue('#address','');
    setSelectedIndex('#city',0);
    setSelectedIndex('#state',0);
    setValue('#pincode','');
    setValue('#phonenumber','');
}

const setSelectedIndex=(id,index)=>{
    const element=document.querySelector(id);
    element.selectedIndex=index;
}

const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}

const setTextValue=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
}

const checkForUpdate=()=>{
    const contactJSON=localStorage.getItem('editContact');
    isUpdate=contactJSON ? true : false;
    if(! isUpdate) return;
    contactObj=JSON.parse(contactJSON);
    setForm();
}

const setForm=()=>{
    setValue('#name', contactObj._fullName);
    setValue('#address',contactObj._address);
    setValue('#city',contactObj._city);
    setValue('#state',contactObj._state);
    setValue('#pincode',contactObj._zipCode);
    setValue('#phonenumber',contactObj._phoneNumber);
}

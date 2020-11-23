let contactList;
window.addEventListener('DOMContentLoaded', (event) => {
    contactList = getContactDataFromStorage();
    document.querySelector(".person-count").textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem("editContact");
});

const getContactDataFromStorage = () => {
    return localStorage.getItem('ContactList') ? JSON.parse(localStorage.getItem('ContactList')) : [];
}

const createInnerHtml = () => {
    if (contactList.length == 0) return;
    const headerHtml = "<th>Fullname</th><th>Address</th><th>City</th>"+
                       "<th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const contactData of contactList) {
        innerHtml = `${innerHtml}
    <tr>
        <td>${contactData._fullName}</td>
        <td>${contactData._address}</td>
        <td>${(contactData._city)}</td>
        <td>${contactData._state}</td>
        <td>${contactData._zipCode}</td>
        <td>${contactData._phoneNumber}</td>
        <td><img id=${contactData._id} onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id=${contactData._id} alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
        </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove=(node)=>{
    let contactData=contactList.find(contactData => contactData._id == node.id);
    if(!contactData) return;
    const index=contactList.map(contactData=>contactData._id).indexOf(contactData._id);
    contactList.splice(index,1);
    if(contactList.length==0){
        location.reload();
    }
    localStorage.setItem("ContactList", JSON.stringify(contactList));
    document.querySelector(".person-count").textContent=contactList.length;
    createInnerHtml();
}

const update=(node)=>{
    let contactData=contactList.find(contactData=>contactData._id==node.id);
    if(!contactData) return;
    localStorage.setItem('editContact',JSON.stringify(contactData));
    window.location.replace(site_properties.add_contact_page);
}
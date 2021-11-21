var lastId = 0;

let contactArray = localStorage.getItem('contacts')
    ? JSON.parse(localStorage.getItem('contacts'))
    : [];


// console.log("%%%", contactArray)
// contactArray.forEach(function (obj) {
//     // console.log(obj.contactId);
//     // console.log(obj.apellidos);
//     // console.log(obj.nombre);
// });

function updateContact() {

    

    // console.log("----------------------", obj);
    // console.log("----------------------", obj.CTitle);

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            console.log("sParameterName", sParameterName[1]);
            let obj = contactArray.find(o => o.contactId == sParameterName[1]);

            if (sParameterName[0] === sParam) {
                $("#submit-button").hide();
                $("#update-button").show();
                $("#contact-name").attr("placeholder",obj.CTitle)
                $("#contact-email").attr("placeholder",obj.CEmail)
                $("#contact-number").attr("placeholder",obj.CNumber)
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);

            }
            else {
                console.log("else false")
            }
        }
        return false;
    };

    var tech = getUrlParameter('edit');
    console.log("!!!!!!!!!!!!!!!", tech)
    // let arr = [
    //     { name:"string 1", value:"this", other: "that" },
    //     { name:"string 2", value:"this", other: "that" }
    // ];

    $("#update-button").on("click", function () {
        const oldItems = JSON.parse(localStorage.getItem('contacts')) || [];
        var tech = getUrlParameter('edit');
        const idToUse = tech;
        const existingItem = oldItems.find(o => o.contactId == idToUse);
        console.log("**************",existingItem)

        if (existingItem) {
            // console.log("In hereeeeeeeeeeeeeeeeeeee")
            Object.assign(existingItem, {
                CTitle: $("#contact-name").val(),
                CEmail: $("#contact-email").val(),
                CNumber: $("#contact-number").val(),
            })
            console.log("Update done")
        }
        else{
            console.log("In elllllssssseeeeee")
        }
        localStorage.setItem('contacts', JSON.stringify(oldItems));
        // let updatedName = $("#contact-name").val();
        // let updatedEmail = $("#contact-email").val();
        // let updatedNumber = $("#contact-number").val();
        // const updatedContact = {
        //     contactId: obj.contactId,
        //     CTitle: updatedName,
        //     CEmail: updatedEmail,
        //     CNumber: updatedNumber
        // }
        // console.log(")))))))))))))))))",updatedContact);
    })


}
updateContact();

$(document).ready(function () {
    // var queries = {};
    // $.each(document.location.search.substr(1).split('&'), function (c, q) {
    //     var i = q.split('=');
    //     queries[i[0].toString()] = i[1].toString();
    // });
    // console.log(queries);
    if (!!contactArray.length) {
        getLastTaskId();
        for (var item in contactArray) {
            var task = contactArray[item];
            // console.log("++++", task)
        }
        // syncEvents();
        //   append new todo to DOM
        const newTodo = (contactToAppend) => {
            $("#container-listing").append(`
        <a class="contact-row" href="index.html?edit=${contactToAppend.contactId}">
        ${contactToAppend.CTitle}
        </a>
        `);

        };
        // render current data, remove old list items
        const renderData = (contactToAppend) => {
            $('.contact-row').remove();
            contactToAppend.forEach((contactToAppend) => {
                newTodo(contactToAppend);
            });
        };

        renderData(contactArray);
    }
    else {
        $("#container-listing").html("<h2>There are no contacts yet!</h2>")
    }
})
function getLastTaskId() {
    // console.log("called this one")
    var lastTask = contactArray[contactArray.length - 1];
    lastId = lastTask.contactId + 1;
}
// submit a new to do item
const submitTodo = function () {
    if ($('#todoTitle').val() !== '') {
        let newName = $("#contact-name").val();
        let newEmail = $("#contact-email").val();
        let newNumber = $("#contact-number").val();
        const newContact = {
            contactId: lastId,
            CTitle: newName,
            CEmail: newEmail,
            CNumber: newNumber
        }
        // console.log("New contact details are:::::::", newContact)
        contactArray.push(newContact);
        // newTodo(todo);
        localStorage.setItem('contacts', JSON.stringify(contactArray))
        lastId++;
    }
}
$("#submit-button").click(function () {
    submitTodo()
});
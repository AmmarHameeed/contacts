var lastId = 0;

let contactArray = localStorage.getItem('contacts')
    ? JSON.parse(localStorage.getItem('contacts'))
    : [];

function updateContact() {
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            let obj = contactArray.find(o => o.contactId == sParameterName[1]);

            if (sParameterName[0] === sParam) {
                $("#submit-button").hide();
                $("#update-button").show();
                $("#contact-name").attr("placeholder", obj.CTitle)
                $("#contact-email").attr("placeholder", obj.CEmail)
                $("#contact-number").attr("placeholder", obj.CNumber)
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);

            }
            else {
                console.log("else false")
            }
        }
        return false;
    };

    // var tech = getUrlParameter('edit');

    $("#update-button").on("click", function () {
        const oldItems = JSON.parse(localStorage.getItem('contacts')) || [];
        var tech = getUrlParameter('edit');
        const idToUse = tech;
        const existingItem = oldItems.find(o => o.contactId == idToUse);

        if (existingItem) {
            Object.assign(existingItem, {
                CTitle: $("#contact-name").val(),
                CEmail: $("#contact-email").val(),
                CNumber: $("#contact-number").val(),
            })
        }
        else {
            console.log("In elllllssssseeeeee")
        }
        localStorage.setItem('contacts', JSON.stringify(oldItems));
    })


}
updateContact();

$(document).ready(function () {
    if (!!contactArray.length) {
        getLastTaskId();
        for (var item in contactArray) {
            var task = contactArray[item];
        }
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
        contactArray.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(contactArray))
        lastId++;
        $(".custom-alert").css("opacity", "1")
        setTimeout(function(){ 
            $(".custom-alert").css("opacity", "0")
        }, 2500);
    }
}
$("#submit-button").click(function () {
    submitTodo()
});
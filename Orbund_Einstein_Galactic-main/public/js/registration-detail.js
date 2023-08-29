$(document).ready(() => {
    sessionId()
    getCartCount()
});

function sessionId() {
    $.ajax({
        url: `${base_url}/public/session-id`,
        crossDomain: true,
        headers: {
            "clientId": clientId,
            "secretKey": secretKey,
            "Content-Type": "application/json",
        },
        success: function (result) {
            console.log("sessionId::", result.sessionId)
            localStorage.setItem("sessionId", result.sessionId);
            getSemester()
        }
    });
}

function getSemester() {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        removeAllAndRedirect()
    }
    $.ajax({
        url: `${base_url}/cart/filter/semester`,
        crossDomain: true,
        headers: {
            "clientId": clientId,
            "secretKey": secretKey,
            "Content-Type": "application/json",
            "sessionId": sessionId
        },
        success: function (result) {
            $.each(result.options, function (i, element) {
                $('#semester').append("<option value=" + element.value + ">" + element.title + "</option>");
            });
        }
    });
}

function submitRegistration(event) {
    $(event).button('loading');
    let age = $("#age").val()
    let location = $("#location").val()
    let parentEmail = $("#parentEmail").val()
    let semester = $("#semester").val()

    if (age == "") {
        alert("Please select age");
        $(event).button('reset');
        return false;
    }
    if (location == "") {
        alert("Please select location");
        $(event).button('reset');
        return false;
    }
    if (parentEmail == "") {
        alert("Please enter an email");
        $(event).button('reset');
        return false;
    }
    if (semester == "") {
        alert("Please select semester");
        $(event).button('reset');
        return false;
    }

    let registrations = {}
    registrations.age = age
    registrations.location = location
    registrations.parentEmail = parentEmail
    registrations.semester = semester
    localStorage.setItem("registration_detail", JSON.stringify(registrations))

    $(event).button('reset');
    window.location = "./class.php";
}


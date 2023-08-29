var base_url = "https://egtest-exceed.orbundsis.com:8443/api"
var clientId = "egtest-exceed"
var secretKey = "abcluCAKl1j39H6123"

function getSessionId() {
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
        }
    });
}

function getCartCount() {
    let cartCount = 0
    let cartStudents = sessionStorage.getItem("cartStudents");
    if (cartStudents) {
        cartStudents = JSON.parse(cartStudents);
        if (cartStudents.length > 0) {
            var res = {};
            cartStudents.forEach(function (v) {
                const classId = v.classIds[0].toString()
                res[classId] ? res[classId]++ : res[classId] = 1;
            })
            cartCount = Object.keys(res).length
        }
    }
    $("#lblCartCount").text(cartCount)
    return cartCount
}

function removeAllAndRedirect() {
    localStorage.clear();
    sessionStorage.clear();
    window.location = "./registration-detail.php";
}
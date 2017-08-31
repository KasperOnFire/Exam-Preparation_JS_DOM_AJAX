var namesJson;
var namesSql;

var getNames = function () {
    var gender = document.getElementById("gender").value;
    var region = document.getElementById("region").value;
    var amount = document.getElementById("amount").value;

    if (amount > 500) {
        alert("cant exceed 500");
        return;
    }
    if (amount < 2) {
        alert("choose 2 or more!");
        return;
    }

    var apiLink = "http://uinames.com/api/?amount=" + amount;

    if (gender != "both") {
        apiLink += "&gender=" + gender;
    }
    if (region != "All") {
        apiLink += "&region=" + region;
    }
    console.log(apiLink);

    var promise = fetch(apiLink);
    promise.then(function (response) {
        namesJson = response.json();
        return namesJson;
    }).then(function (names) {
        // Makes the sql instantly, so its ready - perfomance is fast, so why not. 
        namesSql = names.map(function (n) {
            return "INSERT INTO names (name,surname,gender) VALUES ('" + n.name + "','" +
                n.surname + "','" + n.gender + "');";
        })
        var tableRows = names.map(function (n) {
            return "<tr><td>" + n.name + "</td><td>" +
                n.surname + "</td><td>" + n.gender + "</td></tr>";
        }).join("");
        document.getElementById("tblbody").innerHTML = tableRows;
    });
}

var namesToSql = function () {
    document.getElementById("sql").value = namesSql.join("\n");
}


document.getElementById("btnsend").onclick = getNames;
document.getElementById("btnsql").onclick = namesToSql;
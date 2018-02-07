$(document).ready(function () {
    //Skolan: 192.168.48.136
    //Hemma: 192.168.1.10
    var APIUrl = "https://api.guildwars2.com/v2/items/"; //
    
    var gw2Test = "https://api.guildwars2.com/v2/account?access_token=9E5B066A-3FD8-084B-87D4-8BA28AFB6EF91BBEFFB5-6BDF-4F49-9853-F7EC76E6F79F"
    
    var gw2test2 = "https://api.guildwars2.com/v2/titles?ids=1,90,91,?access_token=9E5B066A-3FD8-084B-87D4-8BA28AFB6EF91BBEFFB5-6BDF-4F49-9853-F7EC76E6F79F"
    
    var gw2test3 = "https://api.guildwars2.com/v2/characters/Izior?access_token=9E5B066A-3FD8-084B-87D4-8BA28AFB6EF91BBEFFB5-6BDF-4F49-9853-F7EC76E6F79F";
    
    var DBUrl = "http://192.168.48.136:3000/testdb"; //On Pi: 192.168.48.248:3000/testdb, http://localhost:3000/testdb, home:http://192.168.1.10:3000/testdb
    
    var APIDataExists = false;
    var DBDataExists = false;
    
    var itemId = Math.floor(Math.random() * 20000) + 1;
    var itemIdStr = itemId.toString();
    
    //console.log(itemIdStr);
   


    $.getJSON(APIUrl + "76245", function (data) {
//22
        //console.log(data);
        
        var name = data.name;
        var icon = data.icon;
        var type = data.type;
        var rarity = data.rarity;
        var levelReq = data.level; 
        
        var typeDetails = data.details.type;
        var weightDetails = data.details.weight_class;
        var defenseDetails = data.details.defense;

        var tr = $("<tr/>");
        tr.append("<td>" + name + "</td>");
        tr.append("<td><img src='" + icon + "' style='width: 100%'></td>");
        tr.append("<td>" + type + "</td>");
        tr.append("<td>" + rarity + "</td>");
        tr.append("<td>" + levelReq + "</td>");
        tr.append("<td><form method='POST' action='" + DBUrl + "'><input type='hidden' name='name' value='" + name + "'/><input type='hidden' name='icon' value='" + icon + "'/><input type='hidden' name='type' value='" + type + "'/><input type='hidden' name='rarity' value='" + rarity + "'/><input type='hidden' name='level' value='" + levelReq + "'/><input class='add' type='submit' value='Add'/></form></td>");
        $(".table-left3").append(tr);

    });
    
        $.getJSON(gw2test3, function (result) {
//22    
        var data = result.equipment;
        
            
            
        console.log(data[0].slot);
        
        var name = data.name;
        var icon = data.icon;
        var type = data.type;
        var rarity = data.rarity;
        var levelReq = data.level; 
        
        var typeDetails = data.details.type;
        var weightDetails = data.details.weight_class;
        var defenseDetails = data.details.defense;

        var tr = $("<tr/>");
        tr.append("<td>" + name + "</td>");
        tr.append("<td><img src='" + icon + "' style='width: 100%'></td>");
        tr.append("<td>" + type + "</td>");
        tr.append("<td>" + rarity + "</td>");
        tr.append("<td>" + levelReq + "</td>");
        tr.append("<td><form method='POST' action='" + DBUrl + "'><input type='hidden' name='name' value='" + name + "'/><input type='hidden' name='icon' value='" + icon + "'/><input type='hidden' name='type' value='" + type + "'/><input type='hidden' name='rarity' value='" + rarity + "'/><input type='hidden' name='level' value='" + levelReq + "'/><input class='add' type='submit' value='Add'/></form></td>");
        $(".table-left4").append(tr);

    });


    //Handle JSON-data from my own database.
    $.getJSON(DBUrl, function (data) {

       data.reverse();


        for (var i = 0; i < data.length; i++) {
            var title = data[i].title;
            var explanation = data[i].explanation;
            var copyright = data[i].copyright;
            var date = data[i].date;
            var img = data[i].img;
            var id = data[i]._id;
            var time = data[i].time;

            var tr = $("<tr/>");
            tr.append("<td class='id' style='display:none'>" + id + "</td>");
            tr.append("<td>" + title + "</td>");
            tr.append("<td><img src='" + img + "' style='width: 100%'></td>");
            tr.append("<td>" + explanation + "</td>");
            tr.append("<td>" + copyright + "</td>");
            tr.append("<td>" + date + "</td>");
            tr.append("<td>" + time + "</td>");
            tr.append("<td width='10%'><center><button type='button' class='del'>" + "Delete" + "</button></center></td>");
            $(".table-right").append(tr);

        };

        $(".del").click(function () {
            // Get current row's ID.
            var row = $(this).closest("tr"); // Find the row.
            var id = row.find(".id").text(); // Find the row's content (ID).

            // Configure and execute DELETE request.
            $.ajax({
                type: "DELETE",
                url: DBUrl + "/" + id
            }).then(function () {
                window.location.reload(); // Reload window after deletion.
            });
        });
    });

    function APITableCheck() {
        //Checks if table rows is more than 1.
        if ($(".table-left3 tr").length > 1) {
            //If rows is more than 1, make boolean true.
            APIDataExists = true;
        };
        //Configures a promise.
        var tablePromise = new Promise(function (resolve, reject) {
            //If boolean is true, resolve with string.
            if (APIDataExists) {
                var exists = "API-data exists.";
                resolve(exists); // fulfilled
            } else {
                //If boolean is false, reject with string.
                var reason = "API-data failed to load. try again later.";
                reject(reason); // reject
            }

        });
        //Execute promise. 
        tablePromise.then(function (fromResolve) {
            console.log(fromResolve);
        }).catch(function (fromReject) {  //catch is used to handle the reject.
            alert(fromReject);
        });

    };


    function DBTableCheck() {
        //Checks if table rows is more than 1.
        if ($(".table-right tr").length > 1) {
            //If rows is more than 1, make boolean true.
            DBDataExists = true;
        };
        //Configures a promise.
        var tablePromise = new Promise(function (resolve, reject) {
            //If boolean is true, resolve with string.
            if (DBDataExists) {
                var exists = "Database-data exists.";
                resolve(exists); // fulfilled
            } else {
                //If boolean is false, reject with string.
                var reason = "Database-data failed to load. try again later.";
                reject(reason); // reject
            }

        });
        //Execute promise. 
        tablePromise.then(function (fromResolve) {
            console.log(fromResolve);
        }).catch(function (fromReject) {
            console.log(fromReject);  //alert
        });

    };
    //Call after 2 seconds to let tables find data.
    setTimeout(APITableCheck, 2000);
    setTimeout(DBTableCheck, 2000);

    
    
    function errorReload() {
        
    }
});

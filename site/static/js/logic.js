var global_data = [];

$(document).ready(function() {
    readDatafile();

    $("#country").change(function() {
        makeYearDropdown();

    });

    $("#go").click(function() {
        findRow();
    });

    $("#filter").click(function() {
        makePredictions();
    });

});

function readDatafile() {
    var queryUrl = "/data"
    $.ajax({
        type: "GET",
        url: queryUrl,
        success: function(data) {
            global_data = data;
            makeDropdown();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });


}

function findRow() {
    var country = $("#country").val();
    var year = $("#year").val();

    var foundRows = global_data.filter(x => (x.location == country) & (x.Year == year));

    if (foundRows.length > 0) {
        var rowData = foundRows[0];
        console.log(rowData);

    }
    var alcoholInput = rowData.Alcohol;
    $("#inputAlc").text(alcoholInput);
    $("#inputAlc").val(alcoholInput);

    var measlesInput = rowData.Measles;
    $("#inputM").text(measlesInput);
    $("#inputM").val(measlesInput);

    var expendatureInput = rowData.percentageexpenditure;
    $("#inputExp").text(expendatureInput);
    $("#inputExp").val(expendatureInput);

    var bmiInput = rowData.BMI;
    $("#inputBMI").text(bmiInput);
    $("#inputBMI").val(bmiInput);

    var hiv_aidsInput = rowData['HIV/AIDS'];
    $("#inputhiv_aids").text(hiv_aidsInput);
    $("#inputhiv_aids").val(hiv_aidsInput);

    var schoolInput = rowData.Schooling;
    $("#inputSchool").text(schoolInput);
    $("#inputSchool").val(schoolInput);

    var incomeInput = rowData.incomeGroup
    $("#income").val(incomeInput);

    var lifeExpectancy = rowData.Lifeexpectancy
    $("#life").text(lifeExpectancy);
}

function makeDropdown() {

    var location = global_data.map(x => x.location);
    var uniqueCountries = [...new Set(location)];
    uniqueCountries = uniqueCountries.sort();

    $("#country").empty();
    d3.select("#country")
        .selectAll('option')
        .data(uniqueCountries)
        .enter()
        .append('option')
        .text(function(d) { return d; })
        .attr("value", function(d) { return d; })


    makeYearDropdown();

}

function makeYearDropdown() {
    var years = global_data.filter(x => x.location == $("#country").val()).map(x => x.Year);
    var uniqueYears = [...new Set(years)];
    uniqueYears = uniqueYears.sort();

    $("#year").empty();
    d3.select("#year")
        .selectAll('option')
        .data(uniqueYears)
        .enter()
        .append('option')
        .text(function(d) { return d; })
        .attr("value", function(d) { return d; })
}


function makePredictions() {
    var alcoholInput = $("#inputAlc").val();
    var percentExpInput = $("#inputExp").val();
    var measlesInput = $("#inputM").val();
    var bmiInput = $("#inputBMI").val();
    var hiv_AidsInput = $("#inputhiv_aids").val();
    var schoolingInput = $("#inputSchool").val();
    var incomeInput = $("#income").val();


    var payload = {
        "alcohol": alcoholInput,
        "percentageExpenditure": percentExpInput,
        "measles": measlesInput,
        "bmi": bmiInput,
        "hiv_aids": hiv_AidsInput,
        "schooling": schoolingInput,
        "incomeGroup": incomeInput

    }


    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);

            $("#life").text(Math.round(returnedData["prediction"] * 100) / 100);
            $("#life").val(Math.round(returnedData["prediction"] * 100) / 100);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}
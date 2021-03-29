var viz;

$(document).ready(function() {
    initializeViz();

});

function initializeViz() {
    var mapDiv = document.getElementById("tableauViz");
    var url = "https://public.tableau.com/views/WHOLifeExpectancy_16164491583410/MapDashboard?:language=en&:display_count=y&:origin=viz_share_link";
    var options = {
        width: mapDiv.offsetWidth,
        height: mapDiv.offsetHeight,
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function() {
            workbook = viz.getWorkbook();
            activeSheet = workbook.getActiveSheet();
        }
    };
    viz = new tableau.Viz(mapDiv, url, options);
}
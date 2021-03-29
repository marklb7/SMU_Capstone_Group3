var viz;

$(document).ready(function() {
    initializeViz();

    $("#pdf").click(function() {
        exportPDF();
    });
    $("#image").click(function() {
        exportImage();
    });
    $("#crosstab").click(function() {
        exportCrossTab();
    });
    $("#data").click(function() {
        exportData();
    });
    $("#revert").click(function() {
        revertAll();
    });
});

function initializeViz() {
    var storyDiv = document.getElementById("tableauViz");
    var url = "https://public.tableau.com/views/WHOLifeExpectancy_16164491583410/WHOLifeExpectancies?:language=en&:display_count=y&:origin=viz_share_link";
    var options = {
        width: storyDiv.clientWidth,
        height: storyDiv.clientHeight,
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function() {
            workbook = viz.getWorkbook();
            activeSheet = workbook.getActiveSheet();
            storyPoints = activeSheet.getStoryPointsInfo();
        }
    };
    viz = new tableau.Viz(storyDiv, url, options);
}

function exportPDF() {
    viz.showExportPDFDialog();
}

function exportImage() {
    viz.showExportImageDialog();
}

function exportCrossTab() {
    viz.showExportCrossTabDialog();
}

function exportData() {
    viz.showExportDataDialog();
}

function revertAll() {
    workbook.revertAllAsync();
}
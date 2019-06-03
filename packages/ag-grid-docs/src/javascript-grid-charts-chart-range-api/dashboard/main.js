var columnDefs = [
    {field: "country", width: 150, chartType: 'category'},
    {field: "group", chartType: 'category'},
    {field: "gold", chartType: 'series', editable: true, valueParser: numberValueParser},
    {field: "silver", chartType: 'series', editable: true, valueParser: numberValueParser},
    {field: "bronze", chartType: 'series', editable: true, valueParser: numberValueParser},
    {field: 'a', chartType: 'series', editable: true, valueParser: numberValueParser},
    {field: 'b', chartType: 'series', editable: true, valueParser: numberValueParser},
    {field: 'c', chartType: 'series', editable: true, valueParser: numberValueParser},
    {field: 'd', chartType: 'series', editable: true, valueParser: numberValueParser}
];

function createRowData() {
    let countries = ["Ireland", "Spain", "United Kingdom", "France", "Germany", "Luxembourg", "Sweden",
        "Norway", "Italy", "Greece", "Iceland", "Portugal", "Malta", "Brazil", "Argentina",
        "Colombia", "Peru", "Venezuela", "Uruguay", "Belgium"];
    let rowData = [];
    countries.forEach( function(country, index) {
        var group = index % 2 == 0 ? 'Group A' : 'Group B';
        rowData.push({
            country: country,
            group: group,
            gold: Math.floor(((index+1 / 7) * 333)%100),
            silver: Math.floor(((index+1 / 3) * 555)%100),
            bronze: Math.floor(((index+1 / 7.3) * 777)%100),
            a: Math.floor(Math.random()*1000),
            b: Math.floor(Math.random()*1000),
            c: Math.floor(Math.random()*1000),
            d: Math.floor(Math.random()*1000)
        });
    });
    return rowData;
}

function numberValueParser(params) {
    let res = Number.parseInt(params.newValue);
    if (isNaN(res)) {
        return undefined;
    } else {
        return res;
    }
}

var gridOptions = {
    defaultColDef: {
        width: 100,
        resizable: true,
        sortable: true,
        editable: true
    },
    rowData: createRowData(),
    columnDefs: columnDefs,
    enableRangeSelection: true,
    enableCharts: true,
    // needed for the menu's in the carts, otherwise popups appear over grid
    popupParent: document.body,
    processChartOptions: processChartOptions,
    onFirstDataRendered: onFirstDataRendered,
    getChartToolbarItems: getChartToolbarItems
};

function getChartToolbarItems(params) {
    return [];
}

function processChartOptions(params) {
    var options = params.options;
    if (params.type==='pie') {
        options.legendPosition = 'bottom';
    }
    return options;
}

function onFirstDataRendered(event) {
    let eContainer1 = document.querySelector('#chart1');
    let params1 = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 4,
            columns: ['country','gold','silver']
        },
        chartType: 'groupedBar',
        chartContainer: eContainer1
    };
    event.api.chartRange(params1);


    let eContainer2 = document.querySelector('#chart2');
    let params2 = {
        cellRange: {
            columns: ['group','gold']
        },
        chartType: 'pie',
        chartContainer: eContainer2,
        aggregate: true
    };
    event.api.chartRange(params2);


    let eContainer3 = document.querySelector('#chart3');
    let params3 = {
        cellRange: {
            columns: ['group','silver']
        },
        chartType: 'pie',
        chartContainer: eContainer3,
        aggregate: true
    };
    event.api.chartRange(params3);

}


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});

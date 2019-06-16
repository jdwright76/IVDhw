function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
    function init() {
        var data = [{
            values: [19, 26, 55, 88],
            labels: ["Spotify", "Soundcloud", "Pandora", "Itunes"],
            type: "pie"
        }];

        var layout = {
            height: 600,
            width: 800
        };

        Plotly.plot("pie", data, layout);
    }

    function updatePlotly(newdata) {
        var PIE = document.getElementById("pie");
        Plotly.restyle(PIE, "values", [newdata]);
    }

    function getData(dataset) {
        var data = [];
        switch (dataset) {
            case "dataset1":
                data = [1, 2, 3, 39];
                break;
            case "dataset2":
                data = [10, 20, 30, 37];
                break;
            case "dataset3":
                data = [100, 200, 300, 23];
                break;
            default:
                data = [30, 30, 30, 11];
        }
        updatePlotly(data);
    }

    init();
    // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
    function buildPlot() {
        d3.json(url).then(function(response) {

            console.log(response);
            var trace = {
                type: "bubble plot",
                mode: "lines",
                name: "Belly Button Biodiversity",
                x: response.map(data => otu_ids),
                y: response.map(data => sample_values),
                line: {
                    color: "#17BECF"
                }
            };

            var data = [trace];

            var layout = {
                title: "Bigfoot Sightings Per Year",
                xaxis: {
                    type: "date"
                },
                yaxis: {
                    autorange: true,
                    type: "linear"
                }
            };

            Plotly.newPlot("plot", data, layout);
        });
    }

    function buildPlot();
    // @TODO: Build a Pie Chart


    function init() {
        // Grab a reference to the dropdown select element
        var selector = d3.select("#selDataset");

        // Use the list of sample names to populate the select options
        d3.json("/names").then((sampleNames) => {
            sampleNames.forEach((sample) => {
                selector
                    .append("option")
                    .text(sample)
                    .property("value", sample);
            });

            // Use the first sample from the list to build the initial plots
            const firstSample = sampleNames[0];
            buildCharts(firstSample);
            buildMetadata(firstSample);
        });
    }

    function optionChanged(newSample) {
        // Fetch new data each time a new sample is selected
        buildCharts(newSample);
        buildMetadata(newSample);
    }

    // Initialize the dashboard
    init();
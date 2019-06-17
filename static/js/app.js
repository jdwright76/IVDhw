// Use `d3.json` to fetch the metadata for a sample
// Use d3 to select the panel with id of `#sample-metadata`
function buildMetadata(sample) {
    d3.json(`/metadata/${sample}`).then((data) => {
        var data_panel = d3.select("#sample-metadata");
        // Use `.html("") to clear any existing metadata
        data_panel.html("");
        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(data).forEach(([key, value]) => {
            //  console.log(data);
            data_panel.append("h6").text(`${key}: ${value}`)
        });
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

// @TODO: Use `d3.json` to fetch the sample data for the plots
// @TODO: Build a Bubble Chart using the sample data
function buildCharts(sample) {
    d3.json(`/samples/${sample}`).then((data) => {
        const otu_ids = data.otu_ids;
        const otu_labels = data.otu_labels;
        const sample_values = data.sample_values;

        // console.log(response);
        var bubbleLayout = {
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" }
        };
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];

        Plotly.plot("bubble", bubbleData, bubbleLayout);


        // function buildPlot(){}
        // @TODO: Build a Pie Chart
        var pieData = [{
            values: sample_values.slice(0, 10),
            labels: otu_ids.slice(0, 10),
            hovertext: otu_labels.slice(0, 10),
            hoverinfo: "hovertext",
            type: "pie"
        }];

        var pieLayout = {
            margin: { t: 0, l: 0 }
        };

        Plotly.plot("pie", pieData, pieLayout);

    });
}
// Plotly.newPlot('/samples/<sample>', data, layout);

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
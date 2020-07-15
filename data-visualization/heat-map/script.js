const width = 1200,
    height = 600,
    padding = 80,
    paddingTop = 20,
    paddingBottom = 120;

const tooltip = d3
    .select("#map")
    .append("div")
    .attr("id", "tooltip")
    .style("width", "120px")
    .style("opacity", "0")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border-radius", "4px")
    .style("padding", "10px")
    .style("box-shadow", "2px 2px 5px rgba(0, 0, 0, 0.3)");

const svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

function monthConveter(num) {
    let date = new Date(0);
    date.setUTCMonth(num);
    //console.log(date)
    const monthParser = d3.timeFormat("%B");
    //console.log(monthParser(date))
    return monthParser(date);
}

d3.json(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
).then(function (data) {
    console.log(data);
    const heading = d3.select("#heading");
    heading
        .append("h3")
        .attr("id", "description")
        .html(
            data.monthlyVariance[0].year +
                " - " +
                data.monthlyVariance[data.monthlyVariance.length - 1].year +
                ": Base Temperature:" +
                data.baseTemperature +
                "&#8451;"
        );

    const yScale = d3
        .scaleBand()
        .domain([...Array(12).keys()].reverse())
        .range([height - paddingBottom, paddingTop]);
    const yAxis = d3.axisLeft(yScale).tickFormat((i) => monthConveter(i));

    const xYears = data.monthlyVariance.map((item) => item.year);
    const xScale = d3
        .scaleTime()
        .domain([d3.min(xYears), d3.max(xYears)])
        .range([padding, width - padding]);
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

    const colour = d3
        .scaleLinear()
        .domain([0, 7.5, 15])
        .range(["darkblue", "white", "darkred"]);

    // Rectangles
    svg.append("g")
        .classed("map", true)
        .selectAll("rect")
        .data(data.monthlyVariance)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("data-month", (d) => d.month - 1)
        .attr("data-year", (d) => d.year)
        .attr("data-temp", (d) => data.baseTemperature + d.variance)
        .attr("x", (d, i) => xScale(xYears[i]))
        .attr("y", (d, i) => yScale(d.month - 1))
        .attr("width", width / Array.from(new Set(xYears)).length)
        .attr("height", yScale.bandwidth())
        .attr("fill", (d) => colour(d.variance + data.baseTemperature))
        .on("mouseover", (d) => {
            tooltip
                .style("top", event.pageY + 20 + "px")
                .style("left", event.pageX + "px")
                .attr("data-year", d.year)
                .transition()
                .duration(100)
                .style("opacity", 1);
            tooltip.html(
                monthConveter(d.month - 1) +
                    " " +
                    d.year +
                    "<br/>" +
                    parseFloat(data.baseTemperature + d.variance).toFixed(2) +
                    "&#8451;" +
                    "<br/>" +
                    d.variance +
                    "&#8451;"
            );
        })
        .on("mouseout", () =>
            tooltip
                .transition()
                .duration(100)
                .style("opacity", 0)
                .transition()
                .style("top", 0 + "px")
                .style("left", 0 + "px")
        );

    // yAxis
    svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .attr("id", "y-axis")
        .call(yAxis);
    //xAxis
    svg.append("g")
        .attr("transform", "translate(0," + (height - paddingBottom) + ")")
        .attr("id", "x-axis")
        .call(xAxis);
    // yAxis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("x", -280)
        .text("Months");
    // xAxis label
    svg.append("text")
        .attr("y", height - padding)
        .attr("x", 1200 / 2)
        .text("Years");

    // legend
    const legendValues = [0, 3.75, 7.5, 11.25, 15];
    const legendScale = d3.scaleBand().domain(legendValues).range([80, 230]);
    const legend = svg.append("g").attr("id", "legend").classed("legend", true);
    legend
        .append("g")
        .selectAll("rect")
        .data(legendValues)
        .enter()
        .append("rect")
        .style("stroke", "black")
        .attr("x", (d, i) => legendScale(legendValues[i]))
        .attr("y", (d, i) => 530)
        .attr("width", 30)
        .attr("height", 30)
        .attr("fill", (d, i) => colour(legendValues[i]));
    legend
        .append("g")
        .attr("transform", "translate(0," + (height - 40) + ")")
        .attr("id", "legend-axis")
        .call(d3.axisBottom(legendScale));
    legend
        .append("text")
        .attr("y", height - 5)
        .attr("x", padding + 15)
        .html("Temperature (" + "&#8451;" + ")");
});

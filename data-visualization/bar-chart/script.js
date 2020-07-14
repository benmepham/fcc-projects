const width = 1200,
    barwidth = width / 275,
    height = 600,
    padding = 40;

function dateConverter(date) {
    let quarter;
    switch (date.substr(5, 2)) {
        case "01":
            quarter = "Q1";
            break;
        case "04":
            quarter = "Q2";
            break;
        case "07":
            quarter = "Q3";
            break;
        case "10":
            quarter = "Q4";
            break;
    }
    return quarter + " " + date.substr(0, 4);
}

function setTooltip(data) {
    return dateConverter(data[0]) + "<br/>" + "$" + data[1] + " Billion";
}

const tooltip = d3
    .select("#chart")
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("opacity", "0")
    .style("background-color", "white")
    .style("border-radius", "4px")
    .style("padding", "10px")
    .style("box-shadow", "2px 2px 5px rgba(0, 0, 0, 0.3)");

const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then(function (data) {
    
    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data.data, (d) => d[1])])
        .range([height - padding, padding]);

    const xYears = data.data.map((item) => new Date(item[0]));
    const xMax = new Date(d3.max(xYears));
    const xScale = d3
        .scaleTime()
        .domain([d3.min(xYears), xMax.setMonth(xMax.getMonth() + 3)]) //Account for end of quarter on scale
        .range([padding, width - padding]);
    // Bars
    svg.selectAll("rect")
        .data(data.data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .attr("x", (d, i) => xScale(xYears[i]))
        .attr("y", (d, i) => yScale(d[1]))
        .attr("width", barwidth - 1)
        .attr("height", (d, i) => height - yScale(d[1]) - padding)
        .attr("fill", "navy")
        .on("mouseover", (d) => {
            tooltip
                .style("top", 500 + "px")
                .style("left", event.pageX + 40 + "px")
                .attr("data-date", d[0])
                .transition()
                .duration(100)
                .style("opacity", 0.8);
            tooltip.html(setTooltip(d));
        })
        .on("mouseout", () =>
            tooltip.transition().duration(100).style("opacity", 0)
        );

    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .attr("id", "y-axis")
        .call(yAxis);

    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .attr("id", "x-axis")
        .call(xAxis);
    // yAxis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", padding + 25)
        .attr("x", 0 - height / 1.7)
        .text("GDP (Billion $)");
});

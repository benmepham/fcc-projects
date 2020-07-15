const width = 1200,
    height = 600,
    padding = 40,
    margin = 20;

const legend = d3
    .select("#graph")
    .append("div")
    .attr("id", "legend")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border-radius", "4px")
    .style("text-align", "left")
    .style("padding", "10px")
    .style("box-shadow", "2px 2px 5px rgba(0, 0, 0, 0.3)")
    .style("top", 400 + "px")
    .style("left", 1100 + "px")
    .html(
        "<p style='color:red'>Doping allegation</p><p style='color:blue'>No doping allegation</p>"
    );

const tooltip = d3
    .select("#graph")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", "0")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border-radius", "4px")
    .style("padding", "10px")
    .style("box-shadow", "2px 2px 5px rgba(0, 0, 0, 0.3)");

const svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
).then(function (data) {
    const parser = d3.timeParse("%M:%S");
    const yTime = data.map((item) => parser(item.Time));
    const yScale = d3
        .scaleTime()
        .domain([d3.min(yTime), d3.max(yTime)])
        .range([height - padding, padding])
        .nice();

    //const xParser = d3.timeParse("%Y");
    const xYears = data.map((item) => item.Year);
    const xScale = d3
        .scaleTime()
        .domain([d3.min(xYears) - 1, d3.max(xYears)])
        .range([padding, width - padding]);

    // Dots
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("data-xvalue", (d) => d.Year)
        .attr("data-yvalue", (d, i) => yTime[i])
        .attr("cx", (d, i) => xScale(xYears[i]))
        .attr("cy", (d, i) => yScale(yTime[i]))
        .attr("r", 5)
        .attr("fill", (d) => (d.Doping == "" ? "blue" : "red"))
        .on("mouseover", (d) => {
            tooltip
                .style("top", event.pageY + 20 + "px")
                .style("left", event.pageX + "px")
                .attr("data-year", d.Year)
                .transition()
                .duration(100)
                .style("opacity", 1);
            tooltip.html(
                "Name:" +
                    d.Name +
                    " (" +
                    d.Nationality +
                    ") <br/>" +
                    "Year: " +
                    d.Year +
                    " Time: " +
                    d.Time +
                    "<br/>" +
                    d.Doping
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

    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
    svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .attr("id", "y-axis")
        .call(yAxis);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    svg.append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .attr("id", "x-axis")
        .call(xAxis);
    // yAxis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 60)
        .attr("x", 0 - height / 1.7)
        .text("Time (Mins)");
});

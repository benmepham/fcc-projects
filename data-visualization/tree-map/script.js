const width = 960,
    height = 600,
    tooltip = d3
        .select("#map")
        .append("div")
        .attr("id", "tooltip")
        .style("width", "200px")
        .style("opacity", "0")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border-radius", "4px")
        .style("padding", "10px")
        .style("box-shadow", "2px 2px 5px rgba(0, 0, 0, 0.3)"),
    svg = d3
        .select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

d3.json(
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
).then(function (data) {
    console.log(data);
    const colour = d3.scaleOrdinal(d3.schemeCategory10),
        treemap = d3.treemap().size([width, height]).padding(1),
        root = d3.hierarchy(data).sum((d) => d.value);
    treemap(root);
    const cell = svg
        .selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("transform", (d) => "translate(" + d.x0 + ", " + d.y0 + ")");

    const tile = cell
        .append("rect")
        .attr("class", "tile")
        .attr("data-name", (d) => d.data.name)
        .attr("data-category", (d) => d.data.category)
        .attr("data-value", (d) => d.data.value)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => colour(d.data.category))
        .on("mouseover", (d) => {
            tooltip
                .style("top", event.pageY + 20 + "px")
                .style("left", event.pageX + "px")
                .attr("data-value", d.data.value)
                .transition()
                .duration(100)
                .style("opacity", 1);
            tooltip.html(
                d.data.name +
                    "<br/>" +
                    "(" +
                    d.data.category +
                    ")" +
                    "<br/>" +
                    d.data.value
            );
        })
        .on("mouseout", () =>
            tooltip
                .transition()
                .duration(100)
                .style("opacity", 0)
                // .transition()
                // .style("top", 0 + "px")
                // .style("left", 0 + "px")
        );

    cell.append("text")
        .selectAll("tspan")
        .data((d) => d.data.name.split(" "))
        .enter()
        .append("tspan")
        .style("font-size", "10px")
        .attr("x", 5)
        .attr("y", (d, i) => 15 + i * 10)
        .text((d) => d);

    const categories = data.children.map((x) => x.name),
        size = 20,
        legendWidth = 120,
        legendHeight = (size + 5) * categories.length,
        legend = d3
            .select("#map")
            .append("svg")
            .attr("id", "legend")
            .style("display", "block")
            .style("margin", "auto")
            .style("padding", "10px")
            .classed("legend", true)
            .attr("width", legendWidth)
            .attr("height", legendHeight);
    legend
        .append("g")
        .selectAll("rect")
        .data(categories)
        .enter()
        .append("rect")
        .classed("legend-item", true)
        .attr("fill", (d) => colour(d))
        .attr("x", 10)
        .attr("y", (d, i) => i * (size + 5))
        .attr("width", size)
        .attr("height", size);

    legend
        .append("g")
        .selectAll("text")
        .data(categories)
        .enter()
        .append("text")
        .attr("x", size * 2)
        .attr("y", (d, i) => i * (size + 5) + 15)
        .text((d) => d);
});

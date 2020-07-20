const width = 960,
    height = 600,
    padding = 80,
    paddingTop = 20,
    paddingBottom = 120;

const tooltip = d3
    .select("#map")
    .append("div")
    .attr("id", "tooltip")
    .style("width", "200px")
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

async function run() {
    const educationResponse = await fetch(
            "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
        ),
        education = await educationResponse.json(),
        usResponse = await fetch(
            "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
        ),
        us = await usResponse.json(),
        path = d3.geoPath(),
        data_counties = topojson.feature(us, us.objects.counties).features,
        minEducation = d3.min(education, (edu) => edu.bachelorsOrHigher),
        maxEducation = d3.max(education, (edu) => edu.bachelorsOrHigher),
        step = (maxEducation - minEducation) / 8,
        colourScale = d3
            .scaleThreshold()
            .domain(d3.range(minEducation, maxEducation, step))
            .range(d3.schemeGreys[9]);
    svg.append("g")
        .selectAll("path")
        .data(data_counties)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", (d) =>
            colourScale(
                education.find((edu) => edu.fips === d.id).bachelorsOrHigher
            )
        )
        .attr("class", "county")
        .attr("data-fips", (d) => d.id)
        .attr(
            "data-education",
            (d) => education.find((edu) => edu.fips === d.id).bachelorsOrHigher
        )
        .on("mouseover", (d) => {
            const { coordinates } = d.geometry,
                [x, y] = coordinates[0][0],
                edu_county = education.find((edu) => edu.fips === d.id);

            tooltip
                .style("top", y + "px")
                .style("left", x + "px")
                .transition()
                .duration(100)
                .style("opacity", 1);
            tooltip
                .html(
                    edu_county.state +
                        " - " +
                        edu_county.area_name +
                        "<br/>" +
                        edu_county.bachelorsOrHigher +
                        "%"
                )
                .attr("data-education", edu_county.bachelorsOrHigher);
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

    // legend
    const legendValues = d3.range(minEducation, maxEducation, step),
        legendHeight = 60,
        legendWidth = 200,
        legendRectWidth = legendWidth / legendValues.length,
        legendScale = d3
            .scaleBand()
            .domain(legendValues)
            .range([0, legendWidth]),
        legend = d3
            .select("#map")
            .append("svg")
            .attr("id", "legend")
            .classed("legend", true)
            .attr("width", legendWidth + 10)
            .attr("height", legendHeight)
            .style("position", "absolute")
            .style("top", "150px")
            .style("right", "350px");
    legend
        .append("g")
        .selectAll("rect")
        .data(legendValues)
        .enter()
        .append("rect")
        .style("stroke", "black")
        .attr("x", (d, i) => i * legendRectWidth)
        .attr("y", (d, i) => 0)
        .attr("width", legendRectWidth)
        .attr("height", legendHeight - 30)
        .attr("fill", (d, i) => colourScale(legendValues[i]));
    legend
        .append("g")
        .attr("transform", "translate(0," + (legendHeight - 30) + ")")
        .attr("id", "legend-axis")
        .call(
            d3
                .axisBottom(legendScale)
                .tickFormat((i) => Number(i).toFixed(0) + "%")
        );
}
run();

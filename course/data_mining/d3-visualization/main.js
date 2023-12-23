// set the dimensions and margins of the graph
var margin = {top: 80, right: 25, bottom: 30, left: 40},
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  // create a tooltip for accuracy
  var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip  centered-text")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
 // Three function that change the tooltip when user hover / move / leave a cell
 var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    depth = d.max_depth;
    split = d.min_samples_split;
    tooltip
      .html(`Max Depth: ${depth}, Min Sample Split: ${split}, Accuracy: ${d.accuracy}` )
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }



// Load data once
d3.csv("./experiment-1.csv", function(data) {
    // Store data in a variable accessible by all visualizations
    var sharedData = data;
    
    var entropy = data.filter(d => {return d.criterion == 'entropy';});
    
    var log = data.filter(d => {return d.criterion == 'log_loss';});
    var gini = data.filter(d => {return d.criterion == 'gini';});


    // Build color scale
    Accuracy_Color = d3.scaleLinear()
        .domain([d3.min(data, function(d) { return d.accuracy; }), d3.max(data, function(d) { return d.accuracy; })])
        .range(['white', 'darkgreen'])
        .interpolate(d3.interpolateHcl);
    
    // Build color scale
    F1_Color = d3.scaleLinear()
    .domain([d3.min(data, function(d) { return d.f1_score; }), d3.max(data, function(d) { return d.f1_score; })])
    .range(['white', 'darkblue'])
    .interpolate(d3.interpolateHcl);

    // Build color scale
    Pre_Color = d3.scaleLinear()
    .domain([d3.min(data, function(d) { return d.precision; }), d3.max(data, function(d) { return d.precision; })])
    .range(['white', 'darkred'])
    .interpolate(d3.interpolateHcl);

    // Build color scale
    Rec_Color = d3.scaleLinear()
    .domain([d3.min(data, function(d) { return d.recall; }), d3.max(data, function(d) { return d.recall; })])
    .range(['white', 'darkorange'])
    .interpolate(d3.interpolateHcl);
    

    heatmap_entropy_accuracy(entropy, Accuracy_Color);
    heatmap_gini_accuracy(gini, Accuracy_Color);
    heatmap_log_accuracy(log, Accuracy_Color);

    heatmap_entropy_f1(entropy, F1_Color);
    heatmap_gini_f1(gini, F1_Color);
    heatmap_log_f1(log, F1_Color);

    heatmap_entropy_pre(entropy, Pre_Color);
    heatmap_gini_pre(gini, Pre_Color);
    heatmap_log_pre(log, Pre_Color);


    heatmap_entropy_rec(entropy, Rec_Color);
    heatmap_gini_rec(gini, Rec_Color);
    heatmap_log_rec(log, Rec_Color);
    //console.log(entropy, log, gini);
   
  });


function heatmap_entropy_accuracy (data, colormap) {
    // append the svg object to the body of the page
    var svg1 = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg1.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg1.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove();

        // add the squares
    svg1.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.accuracy)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

    // Add title to graph
    svg1.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Entropy Accuracy heatmap`);

    // X-axis title
    svg1.append("text")
    .attr("text-anchor", "end")
    .attr("x",260)
    .attr("y", 420) // Adjust the position as needed
    .text("Max Depth");

    // Y-axis title
    svg1.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 10) // Adjust the position as needed
    .attr("x", -100)
    .text("Min Sample Split");

    
    
}

function heatmap_gini_accuracy (data, colormap) {
    // append the svg object to the body of the page
    var svg2 = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(-50)")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg2.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg2.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove();
    
        // add the squares
    svg2.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.accuracy)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

    // Add title to graph
    svg2.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Gini Accuracy heatmap`);

    

    
    
}
function heatmap_log_accuracy (data, colormap) {
    // append the svg object to the body of the page
    var svg3 = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(-50)")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg3.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg3.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()
    
        // add the squares
    svg3.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.accuracy)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

    // Add title to graph
    svg3.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Log Loss Accuracy heatmap`);

    

    
    
}

// create a tooltip for F1
var tooltip1 = d3.select("#my_dataviz1")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip centered-text")
.style("background-color", "white")
.style("border", "solid")
.style("border-width", "2px")
.style("border-radius", "5px")
.style("padding", "5px");
// Three function that change the tooltip when user hover / move / leave a cell
var mouseover1 = function(d) {
tooltip1
  .style("opacity", 1)
d3.select(this)
  .style("stroke", "black")
  .style("opacity", 1)
}
var mousemove1 = function(d) {
depth = d.max_depth;
split = d.min_samples_split;
tooltip1
  .html(`Max Depth: ${depth}, Min Sample Split: ${split}, F1_Score: ${d.f1_score}` )
  .style("left", (d3.mouse(this)[0]+70) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var mouseleave1 = function(d) {
tooltip1
  .style("opacity", 0)
d3.select(this)
  .style("stroke", "none")
  .style("opacity", 0.8)
}
function heatmap_entropy_f1 (data, colormap) {
    // append the svg object to the body of the page
    var svg4 = d3.select("#my_dataviz1")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg4.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg4.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove();

        // add the squares
    svg4.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.f1_score)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover1)
    .on("mousemove", mousemove1)
    .on("mouseleave", mouseleave1)

    // Add title to graph
    svg4.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Entropy F1 Score heatmap`);

    // X-axis title
    svg4.append("text")
    .attr("text-anchor", "end")
    .attr("x",260)
    .attr("y", 420) // Adjust the position as needed
    .text("Max Depth");

    // Y-axis title
    svg4.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 10) // Adjust the position as needed
    .attr("x", -100)
    .text("Min Sample Split");

    
    
}

function heatmap_gini_f1 (data, colormap) {
    // append the svg object to the body of the page
    var svg5 = d3.select("#my_dataviz1")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(-50)")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg5.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg5.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove();
    
        // add the squares
    svg5.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.f1_score)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover1)
    .on("mousemove", mousemove1)
    .on("mouseleave", mouseleave1)

    // Add title to graph
    svg5.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Gini F1 Score heatmap`);

    

    
    
}
function heatmap_log_f1 (data, colormap) {
    // append the svg object to the body of the page
    var svg6 = d3.select("#my_dataviz1")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(-50)")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg6.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg6.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()
    
        // add the squares
    svg6.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.f1_score)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover1)
    .on("mousemove", mousemove1)
    .on("mouseleave", mouseleave1)

    // Add title to graph
    svg6.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Log Loss F1 Score heatmap`);

    

    
    
}

// create a tooltip for precision
var tooltip2 = d3.select("#my_dataviz2")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip centered-text")
.style("background-color", "white")
.style("border", "solid")
.style("border-width", "2px")
.style("border-radius", "5px")
.style("padding", "5px");
// Three function that change the tooltip when user hover / move / leave a cell
var mouseover2 = function(d) {
tooltip2
  .style("opacity", 1)
d3.select(this)
  .style("stroke", "black")
  .style("opacity", 1)
}
var mousemove2 = function(d) {
depth = d.max_depth;
split = d.min_samples_split;
tooltip2
  .html(`Max Depth: ${depth}, Min Sample Split: ${split}, Precision: ${d.precision}` )
  .style("left", (d3.mouse(this)[0]+70) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var mouseleave2 = function(d) {
tooltip2
  .style("opacity", 0)
d3.select(this)
  .style("stroke", "none")
  .style("opacity", 0.8)
}
function heatmap_entropy_pre (data, colormap) {
    // append the svg object to the body of the page
    var svg7 = d3.select("#my_dataviz2")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg7.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg7.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove();

        // add the squares
    svg7.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.precision)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover2)
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2)

    // Add title to graph
    svg7.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Entropy Precision Score heatmap`);

    // X-axis title
    svg7.append("text")
    .attr("text-anchor", "end")
    .attr("x",260)
    .attr("y", 420) // Adjust the position as needed
    .text("Max Depth");

    // Y-axis title
    svg7.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 10) // Adjust the position as needed
    .attr("x", -100)
    .text("Min Sample Split");

    
    
}

function heatmap_gini_pre (data, colormap) {
    // append the svg object to the body of the page
    var svg8 = d3.select("#my_dataviz2")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(-50)")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg8.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg8.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove();
    
        // add the squares
    svg8.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.precision)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover2)
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2)

    // Add title to graph
    svg8.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Gini Precision Score heatmap`);

    

    
    
}
function heatmap_log_pre (data, colormap) {
    // append the svg object to the body of the page
    var svg9 = d3.select("#my_dataviz2")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(-50)")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg9.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg9.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()
    
        // add the squares
    svg9.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.precision)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover2)
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2)

    // Add title to graph
    svg9.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Log Loss Precision Score heatmap`);

    

    
    
}

// create a tooltip for recall
var tooltip3 = d3.select("#my_dataviz3")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip centered-text")
.style("background-color", "white")
.style("border", "solid")
.style("border-width", "2px")
.style("border-radius", "5px")
.style("padding", "5px");
// Three function that change the tooltip when user hover / move / leave a cell
var mouseover3 = function(d) {
tooltip3
  .style("opacity", 1)
d3.select(this)
  .style("stroke", "black")
  .style("opacity", 1)
}
var mousemove3 = function(d) {
depth = d.max_depth;
split = d.min_samples_split;
tooltip3
  .html(`Max Depth: ${depth}, Min Sample Split: ${split}, Recall: ${d.recall}` )
  .style("left", (d3.mouse(this)[0]+70) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var mouseleave3 = function(d) {
tooltip3
  .style("opacity", 0)
d3.select(this)
  .style("stroke", "none")
  .style("opacity", 0.8)
}
function heatmap_entropy_rec (data, colormap) {
    // append the svg object to the body of the page
    var svg10 = d3.select("#my_dataviz3")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg10.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg10.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove();

        // add the squares
    svg10.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.recall)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover3)
    .on("mousemove", mousemove3)
    .on("mouseleave", mouseleave3)

    // Add title to graph
    svg10.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Entropy Recall Score heatmap`);

    // X-axis title
    svg10.append("text")
    .attr("text-anchor", "end")
    .attr("x",260)
    .attr("y", 420) // Adjust the position as needed
    .text("Max Depth");

    // Y-axis title
    svg10.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 10) // Adjust the position as needed
    .attr("x", -100)
    .text("Min Sample Split");

    
    
}

function heatmap_gini_rec (data, colormap) {
    // append the svg object to the body of the page
    var svg11 = d3.select("#my_dataviz3")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(-50)")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg11.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg11.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove();
    
        // add the squares
    svg11.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.recall)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover3)
    .on("mousemove", mousemove3)
    .on("mouseleave", mouseleave3)

    // Add title to graph
    svg11.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Gini Recall Score heatmap`);

    

    
    
}
function heatmap_log_rec (data, colormap) {
    // append the svg object to the body of the page
    var svg12 = d3.select("#my_dataviz3")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(-50)")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var depth = d3.map(data, function(d){return d.max_depth;}).keys()
    var split = d3.map(data, function(d){return d.min_samples_split;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(depth)
        .padding(0.05);
    svg12.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(split)
        .padding(0.05);
    svg12.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()
    
        // add the squares
    svg12.selectAll()
    .data(data, function(d) {return "test";})
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.max_depth) })
        .attr("y", function(d) { return y(d.min_samples_split) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colormap(d.recall)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover3)
    .on("mousemove", mousemove3)
    .on("mouseleave", mouseleave3)

    // Add title to graph
    svg12.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text(`Log Loss Recall Score heatmap`);

    

    
    
}
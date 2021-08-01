
var svg = d3.select("svg");
originalScene();
var scene = originalScene;

window.addEventListener('resize', scene);
document.getElementById("Previous").onclick = Previous;
document.getElementById("Next").onclick = Next;

function originalScene() {
    var svgElem = document.getElementsByTagName("svg")[0];
    svgElem.innerHTML = "";

    d3.csv('BTC-USD.csv').get(function (error, data) {

        var xScale = d3.scaleTime()
            .domain([new Date("9/16/2014"), new Date("07/27/2021")])
            .range([50, 0.9 * svgElem.clientWidth])
        var yScale = d3.scaleLinear()
            .domain([0, 80000])
            .range([0.9 * svgElem.clientHeight, 50])

        // Add scales to axis
        var x_axis = d3.axisBottom().scale(xScale)
        var y_axis = d3.axisLeft().scale(yScale);

        //Append group and insert axis
        svg.append("g").call(x_axis).attr("transform", "translate(0, " + 0.9 * svgElem.clientHeight + ")");
        svg.append("g").call(y_axis).attr("transform", "translate(50, 0)");

        path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(new Date(d.Date)) })
                .y(function (d) { return yScale(d.Close) })
            );

        //Annotations
        svg.append('g').append('text')
            .html("Since 2014 the price of Bitcoin has increased to ")
            .attr("x", 100)
            .attr("y", 100);
        //Annotations
        svg.append('g').append('text')
            .html("more than 100 times its original value. However, it")
            .attr("x", 100)
            .attr("y", 115);
        //Annotations
        svg.append('g').append('text')
            .html("has been a wild ride with the price sometimes ")
            .attr("x", 100)
            .attr("y", 130);
        //Annotations
        svg.append('g').append('text')
            .html("changing 30% in a single day.")
            .attr("x", 100)
            .attr("y", 145);

        svg.on('mousemove', nearestPoint)
        var pointDisplay = svg
            .append('g')
            .append('circle')
            .attr("stroke", "black")
            .attr('r', 1)
            .style("opacity", 0)
        var pointInfo = svg
            .append('g')
            .append('text')
            .style("opacity", 0)
            .attr("text-anchor", "left")
            .attr("color", "Red")
            .attr("alignment-baseline", "middle")

        function nearestPoint() {
            //Get coordinates
            var x0 = xScale.invert(d3.mouse(this)[0]);
            var y0 = yScale.invert(d3.mouse(this)[1]);

            //nearest point
            var bisect = d3.bisector(function (d) { return new Date(d.Date); }).left;
            var i = bisect(data, new Date(x0), 1);
            var closestPoint = data[i]

            if (i == 2506) { i = 2505; }

            if ((Math.abs(xScale(new Date(closestPoint.Date)) - event.clientX) + Math.abs(yScale(closestPoint.Close) + 50 - event.clientY)) < 100) {
                pointDisplay
                    .attr("cx", xScale(new Date(closestPoint.Date)))
                    .attr("cy", yScale(closestPoint.Close))
                pointInfo
                    .html("Date:" + closestPoint.Date + ", " + "Price:" + closestPoint.Close)
                    .attr("x", xScale(new Date(closestPoint.Date)) + 15)
                    .attr("y", yScale(closestPoint.Close))
                pointDisplay.style("opacity", 1)
                pointInfo.style("opacity", 1)

            } else {
                pointDisplay.style("opacity", 0)
                pointInfo.style("opacity", 0)
            }
        }


    });
}

function firstBubble() {
    var svgElem = document.getElementsByTagName("svg")[0];
    svgElem.innerHTML = "";

    d3.csv('BTC-USD.csv').get(function (error, data) {

        data = data.slice(0, 1190);

        var xScale = d3.scaleTime()
            .domain([new Date("9/16/2014"), new Date("12/17/2017")])
            .range([50, 0.9 * svgElem.clientWidth])
        var yScale = d3.scaleLinear()
            .domain([0, 25000])
            .range([0.9 * svgElem.clientHeight, 50])

        // Add scales to axis
        var x_axis = d3.axisBottom().scale(xScale)
        var y_axis = d3.axisLeft().scale(yScale);

        //Append group and insert axis
        svg.append("g").call(x_axis).attr("transform", "translate(0, " + 0.9 * svgElem.clientHeight + ")");
        svg.append("g").call(y_axis).attr("transform", "translate(50, 0)");


        path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(new Date(d.Date)) })
                .y(function (d) { return yScale(d.Close) })
            );

        //Annotations
        svg.append('g').append('text')
            .html("From 2014 to the end of 2017 the Bitcoin price")
            .attr("x", 100)
            .attr("y", 100);
        //Annotations
        svg.append('g').append('text')
            .html("increased around 50 times in its first major bubble.")
            .attr("x", 100)
            .attr("y", 115);

        svg.on('mousemove', nearestPoint)
        var pointDisplay = svg
            .append('g')
            .append('circle')
            .attr("stroke", "black")
            .attr('r', 1)
            .style("opacity", 0)
        var pointInfo = svg
            .append('g')
            .append('text')
            .style("opacity", 0)
            .attr("text-anchor", "left")
            .attr("color", "Red")
            .attr("alignment-baseline", "middle")

        function nearestPoint() {
            //Get coordinates
            var x0 = xScale.invert(d3.mouse(this)[0]);
            var y0 = yScale.invert(d3.mouse(this)[1]);

            //nearest point
            var bisect = d3.bisector(function (d) { return new Date(d.Date); }).left;
            var i = bisect(data, new Date(x0), 1);
            var closestPoint = data[i]

            if (i == 2506) { i = 2505; }

            if ((Math.abs(xScale(new Date(closestPoint.Date)) - event.clientX) + Math.abs(yScale(closestPoint.Close) + 50 - event.clientY)) < 100) {
                pointDisplay
                    .attr("cx", xScale(new Date(closestPoint.Date)))
                    .attr("cy", yScale(closestPoint.Close))
                pointInfo
                    .html("Date:" + closestPoint.Date + ", " + "Price:" + closestPoint.Close)
                    .attr("x", xScale(new Date(closestPoint.Date)) + 15)
                    .attr("y", yScale(closestPoint.Close))
                pointDisplay.style("opacity", 1)
                pointInfo.style("opacity", 1)

            } else {
                pointDisplay.style("opacity", 0)
                pointInfo.style("opacity", 0)
            }

        }
    });
}

function firstDrawdown() {
    var svgElem = document.getElementsByTagName("svg")[0];
    svgElem.innerHTML = "";

    d3.csv('BTC-USD.csv').get(function (error, data) {

        data = data.slice(1190, 1550);

        var xScale = d3.scaleTime()
            .domain([new Date("12/17/2017"), new Date("12/15/2018")])
            .range([50, 0.9 * svgElem.clientWidth])
        var yScale = d3.scaleLinear()
            .domain([0, 25000])
            .range([0.9 * svgElem.clientHeight, 50])

        // Add scales to axis
        var x_axis = d3.axisBottom().scale(xScale)
        var y_axis = d3.axisLeft().scale(yScale);

        //Append group and insert axis
        svg.append("g").call(x_axis).attr("transform", "translate(0, " + 0.9 * svgElem.clientHeight + ")");
        svg.append("g").call(y_axis).attr("transform", "translate(50, 0)");


        path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(new Date(d.Date)) })
                .y(function (d) { return yScale(d.Close) })
            );

        //Annotations
        svg.append('g').append('text')
            .html("Then over the course of 2018 Bitocin lost 80% of")
            .attr("x", 100)
            .attr("y", 100);
        //Annotations
        svg.append('g').append('text')
            .html("its value.")
            .attr("x", 100)
            .attr("y", 115);

        svg.on('mousemove', nearestPoint)
        var pointDisplay = svg
            .append('g')
            .append('circle')
            .attr("stroke", "black")
            .attr('r', 1)
            .style("opacity", 0)
        var pointInfo = svg
            .append('g')
            .append('text')
            .style("opacity", 0)
            .attr("text-anchor", "left")
            .attr("color", "Red")
            .attr("alignment-baseline", "middle")

        function nearestPoint() {
            //Get coordinates
            var x0 = xScale.invert(d3.mouse(this)[0]);
            var y0 = yScale.invert(d3.mouse(this)[1]);

            //nearest point
            var bisect = d3.bisector(function (d) { return new Date(d.Date); }).left;
            var i = bisect(data, new Date(x0), 1);
            var closestPoint = data[i]

            if (i == 2506) { i = 2505; }

            if ((Math.abs(xScale(new Date(closestPoint.Date)) - event.clientX) + Math.abs(yScale(closestPoint.Close) + 50 - event.clientY)) < 100) {
                pointDisplay
                    .attr("cx", xScale(new Date(closestPoint.Date)))
                    .attr("cy", yScale(closestPoint.Close))
                pointInfo
                    .html("Date:" + closestPoint.Date + ", " + "Price:" + closestPoint.Close)
                    .attr("x", xScale(new Date(closestPoint.Date)) + 15)
                    .attr("y", yScale(closestPoint.Close))
                pointDisplay.style("opacity", 1)
                pointInfo.style("opacity", 1)

            } else {
                pointDisplay.style("opacity", 0)
                pointInfo.style("opacity", 0)
            }

        }
    });
}

function secondBubble() {
    var svgElem = document.getElementsByTagName("svg")[0];
    svgElem.innerHTML = "";

    d3.csv('BTC-USD.csv').get(function (error, data) {

        data = data.slice(1550, 2405);

        var xScale = d3.scaleTime()
            .domain([new Date("12/16/2018"), new Date("04/15/2021")])
            .range([50, 0.9 * svgElem.clientWidth])
        var yScale = d3.scaleLinear()
            .domain([0, 80000])
            .range([0.9 * svgElem.clientHeight, 50])

        // Add scales to axis
        var x_axis = d3.axisBottom().scale(xScale)
        var y_axis = d3.axisLeft().scale(yScale);

        //Append group and insert axis
        svg.append("g").call(x_axis).attr("transform", "translate(0, " + 0.9 * svgElem.clientHeight + ")");
        svg.append("g").call(y_axis).attr("transform", "translate(50, 0)");


        path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(new Date(d.Date)) })
                .y(function (d) { return yScale(d.Close) })
            );

        //Annotations
        svg.append('g').append('text')
            .html("Bitcoin then slowly recovered for 2 years doubling in price ")
            .attr("x", 100)
            .attr("y", 100);
        //Annotations
        svg.append('g').append('text')
            .html("before starting a sharp bull run started where its price ")
            .attr("x", 100)
            .attr("y", 115);
        //Annotations
        svg.append('g').append('text')
            .html("increased 6 times in as many months.")
            .attr("x", 100)
            .attr("y", 130);

        svg.on('mousemove', nearestPoint)
        var pointDisplay = svg
            .append('g')
            .append('circle')
            .attr("stroke", "black")
            .attr('r', 1)
            .style("opacity", 0)
        var pointInfo = svg
            .append('g')
            .append('text')
            .style("opacity", 0)
            .attr("text-anchor", "left")
            .attr("color", "Red")
            .attr("alignment-baseline", "middle")

        function nearestPoint() {
            //Get coordinates
            var x0 = xScale.invert(d3.mouse(this)[0]);
            var y0 = yScale.invert(d3.mouse(this)[1]);

            //nearest point
            var bisect = d3.bisector(function (d) { return new Date(d.Date); }).left;
            var i = bisect(data, new Date(x0), 1);
            var closestPoint = data[i]

            if (i == 2506) { i = 2505; }

            if ((Math.abs(xScale(new Date(closestPoint.Date)) - event.clientX) + Math.abs(yScale(closestPoint.Close) + 50 - event.clientY)) < 100) {
                pointDisplay
                    .attr("cx", xScale(new Date(closestPoint.Date)))
                    .attr("cy", yScale(closestPoint.Close))
                pointInfo
                    .html("Date:" + closestPoint.Date + ", " + "Price:" + closestPoint.Close)
                    .attr("x", xScale(new Date(closestPoint.Date)) + 15)
                    .attr("y", yScale(closestPoint.Close))
                pointDisplay.style("opacity", 1)
                pointInfo.style("opacity", 1)

            } else {
                pointDisplay.style("opacity", 0)
                pointInfo.style("opacity", 0)
            }

        }
    });
}

function secondDrawdown() {
    var svgElem = document.getElementsByTagName("svg")[0];
    svgElem.innerHTML = "";

    d3.csv('BTC-USD.csv').get(function (error, data) {

        data = data.slice(2405, 2508);

        var xScale = d3.scaleTime()
            .domain([new Date("04/15/2021"), new Date("07/27/2021")])
            .range([50, 0.9 * svgElem.clientWidth])
        var yScale = d3.scaleLinear()
            .domain([20000, 80000])
            .range([0.9 * svgElem.clientHeight, 50])

        // Add scales to axis
        var x_axis = d3.axisBottom().scale(xScale)
        var y_axis = d3.axisLeft().scale(yScale);

        //Append group and insert axis
        svg.append("g").call(x_axis).attr("transform", "translate(0, " + 0.9 * svgElem.clientHeight + ")");
        svg.append("g").call(y_axis).attr("transform", "translate(50, 0)");


        path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(new Date(d.Date)) })
                .y(function (d) { return yScale(d.Close) })
            );

        //Annotations
        svg.append('g').append('text')
            .html("Since peaking early this year Bitcoins price has ")
            .attr("x", 100)
            .attr("y", 100);
        //Annotations
        svg.append('g').append('text')
            .html("halved, and then begun a slight recovery. Only time")
            .attr("x", 100)
            .attr("y", 115);
        //Annotations
        svg.append('g').append('text')
            .html("can tell where it will go next.")
            .attr("x", 100)
            .attr("y", 130);

        svg.on('mousemove', nearestPoint)
        var pointDisplay = svg
            .append('g')
            .append('circle')
            .attr("stroke", "black")
            .attr('r', 1)
            .style("opacity", 0)
        var pointInfo = svg
            .append('g')
            .append('text')
            .style("opacity", 0)
            .attr("text-anchor", "left")
            .attr("color", "Red")
            .attr("alignment-baseline", "middle")

        function nearestPoint() {
            //Get coordinates
            var x0 = xScale.invert(d3.mouse(this)[0]);
            var y0 = yScale.invert(d3.mouse(this)[1]);

            //nearest point
            var bisect = d3.bisector(function (d) { return new Date(d.Date); }).left;
            var i = bisect(data, new Date(x0), 1);
            var closestPoint = data[i]

            if (i == 2506) { i = 2505; }

            if ((Math.abs(xScale(new Date(closestPoint.Date)) - event.clientX) + Math.abs(yScale(closestPoint.Close) + 50 - event.clientY)) < 100) {
                pointDisplay
                    .attr("cx", xScale(new Date(closestPoint.Date)))
                    .attr("cy", yScale(closestPoint.Close))
                pointInfo
                    .html("Date:" + closestPoint.Date + ", " + "Price:" + closestPoint.Close)
                    .attr("x", xScale(new Date(closestPoint.Date)) + 15)
                    .attr("y", yScale(closestPoint.Close))
                pointDisplay.style("opacity", 1)
                pointInfo.style("opacity", 1)

            } else {
                pointDisplay.style("opacity", 0)
                pointInfo.style("opacity", 0)
            }

        }
    });
}

function Next() {
    if (scene == originalScene) {
        scene = firstBubble;
        firstBubble();
        document.getElementById("Previous").disabled = false;
    }
    else if (scene == firstBubble) {
        scene = firstDrawdown;
        firstDrawdown();
    }
    else if (scene == firstDrawdown) {
        scene = secondBubble;
        secondBubble();
    }
    else if (scene == secondBubble) {
        scene = secondDrawdown;
        secondDrawdown();
        document.getElementById("Next").disabled = true;
    }
}

function Previous() {
    if (scene == firstBubble) {
        scene = originalScene;
        originalScene();
        document.getElementById("Previous").disabled = true;
    }
    else if (scene == firstDrawdown) {
        scene = firstBubble;
        firstBubble();
    }
    else if (scene == secondBubble) {
        scene = firstDrawdown;
        firstDrawdown();
    }
    else if (scene == secondDrawdown) {
        scene = secondBubble;
        secondBubble();
        document.getElementById("Next").disabled = false;
    }
}
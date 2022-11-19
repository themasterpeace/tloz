t;
};
/**
 * Find a set of coordinates given a start coordinates, an angle, and a
 * distance.
 *
 * @private
 * @function getEndPoint
 *
 * @param {number} x
 *        Start coordinate x
 *
 * @param {number} y
 *        Start coordinate y
 *
 * @param {number} angle
 *        Angle in radians
 *
 * @param {number} distance
 *        Distance from start to end coordinates
 *
 * @return {Highcharts.SVGAttributes}
 *         Returns the end coordinates, x and y.
 */
var getEndPoint = function getEndPoint(x, y, angle, distance) {
    return {
        x: x + (Math.cos(angle) * distance),
        y: y + (Math.sin(angle) * distance)
    };
};
var layoutAlgorithm = function layoutAlgorithm(parent, children, options) {
    var startAngle = parent.start, range = parent.end - startAngle, total = parent.val, x = parent.x, y = parent.y, radius = ((options &&
        isObject(options.levelSize) &&
        isNumber(options.levelSize.value)) ?
        options.levelSize.value :
        0), innerRadius = parent.r, outerRadius = innerRadius + radius, slicedOffset = options && isNumber(options.slicedOffset) ?
        options.slicedOffset :
        0;
    return (children || []).reduce(function (arr, child) {
        var percentage = (1 / total) * child.val, radians = percentage * range, radiansCenter = startAngle + (radians / 2), offsetPosition = getEndPoint(x, y, radiansCenter, slicedOffset), values = {
            x: child.sliced ? offsetPosition.x : x,
            y: child.sliced ? offsetPosition.y : y,
            innerR: innerRadius,
            r: outerRadius,
            radius: radius,
            start: startAngle,
            end: startAngle + radians
        };
        arr.push(values);
        startAngle = values.end;
        return arr;
    }, []);
};
var getDlOptions = function getDlOptions(params) {
    // Set options to new object to avoid problems with scope
    var point = params.point, shape = isObject(params.shapeArgs) ? params.shapeArgs : {}, optionsPoint = (isObject(params.optionsPoint) ?
        params.optionsPoint.dataLabels :
        {}), 
    // The splat was used because levels dataLabels
    // options doesn't work as an array
    optionsLevel = splat(isObject(params.level) ?
        params.level.dataLabels :
        {})[0], options = merge({
        style: {}
    }, optionsLevel, optionsPoint), rotationRad, rotation, rotationMode = options.rotationMode;
    if (!isNumber(options.rotation)) {
        if (rotationMode === 'auto' || rotationMode === 'circular') {
            if (point.innerArcLength < 1 &&
                point.outerArcLength > shape.radius) {
                rotationRad = 0;
                // Triger setTextPath function to get textOutline etc.
                if (point.dataLabelPath && rotationMode === 'circular') {
                    options.textPath = {
                        enabled: true
                    };
                }
            }
            else if (point.innerArcLength > 1 &&
                point.outerArcLength > 1.5 * shape.radius) {
                if (rotationMode === 'circular') {
                    options.textPath = {
                        enabled: true,
                        attributes: {
                            dy: 5
                        }
                    };
                }
                else {
                    rotationMode = 'parallel';
                }
            }
            else {
                // Trigger the destroyTextPath function
                if (point.dataLabel &&
                    point.dataLabel.textPathWrapper &&
                    rotationMode === 'circular') {
                    options.textPath = {
                        enabled: false
                    };
                }
                rotationMode = 'perpendicular';
            }
        }
        if (rotationMode !== 'auto' && rotationMode !== 'circular') {
            rotationRad = (shape.end -
                (shape.end - shape.start) / 2);
        }
        if (rotationMode === 'parallel') {
            options.style.width = Math.min(shape.radius * 2.5, (point.outerArcLength + point.innerArcLength) / 2);
        }
        else {
            options.style.width = shape.radius;
        }
        if (rotationMode === 'perpendicular' &&
            point.series.chart.renderer.fontMetrics(options.style.fontSize).h > point.outerArcLength) {
            options.style.width = 1;
        }
        // Apply padding (#8515)
        options.style.width = Math.max(options.style.width - 2 * (options.padding || 0), 1);
        rotation = (rotationRad * rad2deg) % 180;
        if (rotationMode === 'parallel') {
            rotation -= 90;
        }
        // Prevent text from rotating upside down
        if (rotation > 90) {
            rotation -= 180;
        }
        else if (rotation < -90) {
            rotation += 180;
        }
        options.rotation = rotation;
    }
    if (options.textPath) {
        if (point.shapeExisting.innerR === 0 &&
            options.textPath.enabled) {
            // Enable rotation to render text
            options.rotation = 0;
            // Center dataLabel - disable textPath
            options.textPath.enabled = false;
            // Setting width and padding
            options.style.width = Math.max((point.shapeExisting.r * 2) -
                2 * (options.padding || 0), 1);
       
*
 * @param {number} attempt
 * How far along the spiral we have traversed.
 *
 * @param {Highcharts.WordcloudSpiralParamsObject} [params]
 * Additional parameters.
 *
 * @return {boolean|Highcharts.PositionObject}
 * Resulting coordinates, x and y. False if the word should be dropped from the
 * visualization.
 */
function squareSpiral(attempt, params) {
    var a = attempt * 4, k = Math.ceil((Math.sqrt(a) - 1) / 2), t = 2 * k + 1, m = Math.pow(t, 2), isBoolean = function (x) {
        return typeof x === 'boolean';
    }, result = false;
    t -= 1;
    if (attempt <= 10000) {
        if (isBoolean(result) && a >= m - t) {
            result = {
                x: k - (m - a),
                y: -k
            };
        }
        m -= t;
        if (isBoolean(result) && a >= m - t) {
            result = {
                x: -k,
                y: -k + (m - a)
            };
        }
        m -= t;
        if (isBoolean(result)) {
            if (a >= m - t) {
                result = {
                    x: -k + (m - a),
                    y: k
                };
            }
            else {
                result = {
                    x: k,
                    y: k - (m - a - t)
                };
            }
        }
        result.x *= 5;
        result.y *= 5;
    }
    return result;
}
/**
 * Gives a set of cordinates for an rectangular spiral.
 *
 * @private
 * @function rectangularSpiral
 *
 * @param {number} attempt
 * How far along the spiral we have traversed.
 *
 * @param {Highcharts.WordcloudSpiralParamsObject} [params]
 * Additional parameters.
 *
 * @return {boolean|Higcharts.PositionObject}
 * Resulting coordinates, x and y. False if the word should be dropped from the
 * visualization.
 */
function rectangularSpiral(attempt, params) {
    var result = squareSpiral(attempt, params), field = params.field;
    if (result) {
        result.x *= field.ratioX;
        result.y *= field.ratioY;
    }
    return result;
}
/**
 * @private
 * @function getRandomPosition
 *
 * @param {number} size
 * Random factor.
 *
 * @return {number}
 * Random position.
 */
function getRandomPosition(size) {
    return Math.round((size * (Math.random() + 0.5)) / 2);
}
/**
 * Calculates the proper scale to fit the cloud inside the plotting area.
 *
 * @private
 * @function getScale
 *
 * @param {number} targetWidth
 * Width of target area.
 *
 * @param {number} targetHeight
 * Height of target area.
 *
 * @param {object} field
 * The playing field.
 *
 * @param {Highcharts.Series} series
 * Series object.
 *
 * @return {number}
 * Returns the value to scale the playing field up to the size of the target
 * area.
 */
function getScale(targetWidth, targetHeight, field) {
    var height = Math.max(Math.abs(field.top), Math.abs(field.bottom)) * 2, width = Math.max(Math.abs(field.left), Math.abs(field.right)) * 2, scaleX = width > 0 ? 1 / width * targetWidth : 1, scaleY = height > 0 ? 1 / height * targetHeight : 1;
    return Math.min(scaleX, scaleY);
}
/**
 * Calculates what is called the playing field. The field is the area which all
 * the words are allowed to be positioned within. The area is proportioned to
 * match the target aspect ratio.
 *
 * @private
 * @function getPlayingField
 *
 * @param {number} targetWidth
 * Width of the target area.
 *
 * @param {number} targetHeight
 * Height of the target area.
 *
 * @param {Array<Highcharts.Point>} data
 * Array of points.
 *
 * @param {object} data.dimensions
 * The height and width of the word.
 *
 * @return {object}
 * The width and height of the playing field.
 */
function getPlayingField(targetWidth, targetHeight, data) {
    var info = data.reduce(function (obj, point) {
        var dimensions = point.dimensions, x = Math.max(dimensions.width, dimensions.height);
        // Find largest height.
        obj.maxHeight = Math.max(obj.maxHeight, dimensions.height);
        // Find largest width.
        obj.maxWidth = Math.max(obj.maxWidth, dimensions.width);
        // Sum up the total maximum area of all the words.
        obj.area += x * x;
        return obj;
    }, {
        maxHeight: 0,
        maxWidth: 0,
        area: 0
    }), 
    /**
     * Use largest width, largest height, or root of total area to give size
     * to the playing field.
     */
    x = Math.max(info.maxHeight, // Have enough space for the tallest word
    info.maxWidth, // Have enough space for the broadest word
    // Adjust 15% to account for close packing of words
    Math.sqrt(info.area) * 0.85), ratioX = targetWidth > targetHeight ? targetWidth / targetH
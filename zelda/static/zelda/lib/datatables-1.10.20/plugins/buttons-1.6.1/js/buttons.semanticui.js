igin[1], rotated = rotate2DToOrigin([x, y], angle);
    return [
        rotated[0] + origin[0],
        rotated[1] + origin[1]
    ];
};
/**
 * @private
 */
var isAxesEqual = function (axis1, axis2) {
    return (axis1[0] === axis2[0] &&
        axis1[1] === axis2[1]);
};
/**
 * @private
 */
var getAxesFromPolygon = function (polygon) {
    var points, axes = polygon.axes;
    if (!isArray(axes)) {
        axes = [];
        points = points = polygon.concat([polygon[0]]);
        points.reduce(function findAxis(p1, p2) {
            var normals = getNormals(p1, p2), axis = normals[0]; // Use the left normal as axis.
            // Check that the axis is unique.
            if (!find(axes, function (existing) {
                return isAxesEqual(existing, axis);
            })) {
                axes.push(axis);
            }
            // Return p2 to be used as p1 in next iteration.
            return p2;
        });
        polygon.axes = axes;
    }
    return axes;
};
/**
 * @private
 */
var getAxes = function (polygon1, polygon2) {
    // Get the axis from both polygons.
    var axes1 = getAxesFromPolygon(polygon1), axes2 = getAxesFromPolygon(polyg
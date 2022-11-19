ision;
        }
        // Add calculated loss to the sum.
        return totalLoss + loss;
    }, 0);
};
/**
 * Finds the root of a given function. The root is the input value needed for
 * a function to return 0.
 *
 * See https://en.wikipedia.org/wiki/Bisection_method#Algorithm
 *
 * TODO: Add unit tests.
 *
 * @param {Function} f
 * The function to find the root of.
 * @param {number} a
 * The lowest number in the search range.
 * @param {number} b
 * The highest number in the search range.
 * @param {number} [tolerance=1e-10]
 * The allowed difference between the returned value and root.
 * @param {number} [maxIterations=100]
 * The maximum iterations allowed.
 * @return {number}
 * Root number.
 */
var bisect = function bisect(f, a, b, tolerance, maxIterations) {
    var fA = f(a), fB = f(b), nMax = maxIterations || 100, tol = tolerance || 1e-10, delta = b - a, n = 1, x, fX;
    if (a >= b) {
        throw new Error('a must be smaller than b.');
    }
    else if (fA * fB > 0) {
        throw new Error('f(a) and f(b) must have opposite signs.');
    }
    if (fA === 0) {
        x = a;
    }
    else if (fB === 0) {
        x = b;
    }
    else {
        while (n++ <= nMax && fX !== 0 && delta > tol) {
            delta = (b - a) / 2;
            x = a + delta;
            fX = f(x);
            // Update low and high for next search interval.
            if (fA * fX > 0) {
                a = x;
            }
            else {
                b = x;
            }
        }
    }
    return x;
};
/**
 * Uses the bisection method to make a best guess of the ideal distance between
 * two circles too get the desired overlap.
 * Currently there is no known formula to calculate the distance from the area
 * of overlap, which makes the bisection method preferred.
 * @private
 * @param {number} r1
 * Radius of the first circle.
 * @param {number} r2
 * Radiues of the second circle.
 * @param {number} overlap
 * The wanted overlap between the two circles.
 * @return {number}
 * Returns the distance needed to get the wanted overlap between the two
 * circles.
 */
var getDistanceBetweenCirclesByOverlap = function getDistanceBetweenCirclesByOverlap(r1, r2, overlap) {
    var maxDistance = r1 + r2, distance;
    if (overlap <= 0) {
        // If overlap is below or equal to zero, then there is no overlap.
        distance = maxDistance;
    }
    else if (getAreaOfCircle(r1 < r2 ? r1 : r2) <= overlap) {
        // When area of overlap is larger than the area of the smallest circle,
        // then it is completely overlapping.
        distance = 0;
    }
    else {
        distance = bisect(function (x) {
            var actualOverlap = getOverlapBetweenCirclesByDistance(r1, r2, x);
            // Return the differance between wanted and actual overlap.
            return overlap - actualOverlap;
        }, 0, maxDistance);
    }
    return distance;
};
var isSet = function (x) {
    return isArray(x.sets) && x.sets.length === 1;
};
/**
 * Calculates a margin for a point based on the iternal and external circles.
 * The margin describes if the point is well placed within the internal circles,
 * and away from the external
 * @private
 * @todo add unit tests.
 * @param {Highcharts.PositionObject} point
 * The point to evaluate.
 * @param {Array<Highcharts.CircleObject>} internal
 * The internal circles.
 * @param {Array<Highcharts.CircleObject>} external
 * The external circles.
 * @return {number}
 * Returns the margin.
 */
var getMarginFromCircles = function getMarginFromCircles(point, internal, external) {
    var margin = internal.reduce(function (margin, circle) {
        var m = circle.r - getDistanceBetweenPoints(point, circle);
        return (m <= margin) ? m : margin;
    }, Number.MAX_VALUE);
    margin = external.reduce(function (margin, circle) {
        var m = getDistanceBetweenPoints(point, circle) - circle.r;
        return (m <= margin) ? m : margin;
    }, margin);
    return margin;
};
/**
 * Finds the optimal label position by looking for a position that has a low
 * distance from the internal circles, and as large possible distane to the
 * external circles.
 * @private
 * @todo Optimize the intial position.
 * @todo Add unit tests.
 * @param {Array<Highcharts.CircleObject>} internal
 * Internal circles.
 * @param {Array<Highcharts.CircleObject>} external
 * External circles.
 * @return {Highcharts.PositionObject}
 * Returns the found position.
 */
var getLabelPosition = function getLabelPosition(internal, external) {
    // Get the best label position within the internal circles.
    var best = internal.reduce(function (best, circle) {
        var d = circle.r / 2;
        // Give a set of points with the circle to evaluate as the
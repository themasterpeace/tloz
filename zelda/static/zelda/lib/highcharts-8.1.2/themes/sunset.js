 = shapeArgs.height / 2;
    return [
        // Top wick
        ['M', 0, top],
        ['L', 0, centerY - 5],
        // Circle
        ['A', 1, 1, 0, 0, 0, 0, centerY + 5],
        ['A', 1, 1, 0, 0, 0, 0, centerY - 5],
        // Bottom wick
        ['M', 0, centerY + 5],
        ['L', 0, bottom]
    ];
};
// Line series - only draggableX/Y, no drag handles
var lineDragDropProps = seriesTypes.line.prototype.dragDropProps = {
    x: {
        axis: 'x',
        move: true
    },
    y: {
        axis: 'y',
        move: true
    }
};
// Flag series - same as line/scatter
if (seriesTypes.flags) {
    seriesTypes.flags.prototype.dragDropProps = lineDragDropProps;
}
// Column series - x can be moved, y can only be resized. Note extra
// functionality for handling upside down columns (below threshold).
var columnDragDropProps = seriesTypes.column.protot
          var xy = MockPoint
                        .pointToPixels(annotation.points[2]);
                    return {
                        x: xy.x - 4,
                        y: xy.y - 4
                    };
                },
                events: {
                    drag: function (e, target) {
                        var annotation = target.annotation, coords = this.chart.pointer.getCoordinates(e), x = coords.xAxis[0].value, y = coords.yAxis[0].value, points = target.options.points;
                        // Top right point
                        points[1].x = x;
                        // Bottom right point (cursor position)
                        points[2].x = x;
                        points[2].y = y;
                        // Bottom left
                        points[3].y = y;
                        annotation.userOptions.shapes[0].points =
                            target.options.points;
                        annotation.redraw(false);
                    }
                }
            }],
        circle: [{
                positioner: function (target) {
                    var xy = MockPoint.pointToPixels(target.points[0]), r = target.options.r;
                    return {
                        x: xy.x + r * Math.cos(Math.PI / 4) -
                            this.graphic.width / 2,
                        y: xy.y + r * Math.sin(Math.PI / 4) -
                            this.graphic.height / 2
                    };
                },
                events: {
                    // TRANSFORM RADIUS ACCORDING TO Y
                    // TRANSLATION
                    drag: function (e, target) {
                        var annotation = target.annotation, position = this.mouseMoveToTranslation(e);
                        target.setRadius(Math.max(target.options.r +
                            position.y /
                                Math.sin(Math.PI / 4), 5));
                        annotation.userOptions.shapes[0].r = target.options.r;
                        ann
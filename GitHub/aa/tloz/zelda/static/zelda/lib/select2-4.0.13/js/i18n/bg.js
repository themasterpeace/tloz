

.highcharts-legend-item:hover text {
  fill: #000000;
}

.highcharts-legend-item-hidden * {
  fill: #cccccc !important;
  stroke: #cccccc !important;
  transition: fill 250ms;
}

.highcharts-legend-nav-active {
  fill: #003399;
  cursor: pointer;
}

.highcharts-legend-nav-inactive {
  fill: #cccccc;
}

circle.highcharts-legend-nav-active, circle.highcharts-legend-nav-inactive {
  /* tracker */
  fill: rgba(192, 192, 192, 0.0001);
}

.highcharts-legend-title-box {
  fill: none;
  stroke-width: 0;
}

/* Bubble legend */
.highcharts-bubble-legend-symbol {
  stroke-width: 2;
  fill-opacity: 0.5;
}

.highcharts-bubble-legend-connectors {
  stroke-width: 1;
}

.highcharts-bubble-legend-labels {
  fill: #333333;
}

/* Loading */
.highcharts-loading {
  position: absolute;
  background-color: #ffffff;
  opacity: 0.5;
  text-align: center;
  z-index: 10;
  transition: opacity 250ms;
}

.highcharts-loading-hidd
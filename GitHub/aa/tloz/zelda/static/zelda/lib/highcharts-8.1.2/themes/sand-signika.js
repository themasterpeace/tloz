tions that this algorithm will be
         * repeated to find clusters positions.
         *
         * @type    {number}
         * @apioption plotOptions.scatter.cluster.layoutAlgorithm.iterations
         */
        /**
         * When `type` is set to `kmeans`,
         * `distance` is a maximum distance between point and cluster center
         * so that this point will be inside the cluster. The distance
         * is either a number defining pixels or a percentage
         * defining a percentage of the plot area width.
         *
         * @type    {number|string}
         */
        distance: 40,
        /**
         * When `type` is set to `undefined` and there are more visible points
         * than the kmeansThreshold the `grid` algorithm is used to find
         * clusters, otherwise `kmeans`. It ensures good performance on
         * large datasets and better clusters arrangement after the zoom.
         */
        kmeansThreshold: 100
    },
    /**
     * Options for the cluster marker.
     * @extends   plotOptions.series.marker
     * @excluding enabledThreshold, states
     * @type      {Highcharts.PointMarkerOptionsObject}
     */
    marker: {
        /** @internal */
        symbol: 'cluster',
        /** @internal */
        radius: 15,
        /** @internal */
        lineWidth: 0,
        /** @internal */
        lineColor: '#ffffff'
    },
    /**
     * Fires when the cluster point is clicked and `drillToCluster` is enabled.
     * One parameter, `event`, is passed to the function. The default action
     * is to zoom to the cluster points range. This can be prevented
     * by calling `event.preventDefault()`.
     *
     * @type      {Highcharts.MarkerClusterDrillCallbackFunction}
     * @product   h
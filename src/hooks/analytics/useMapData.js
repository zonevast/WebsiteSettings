import React from "react";
import { useMetricsOrders } from "../metrics/useMetricsOrders";
import { useMetricsSells } from "../metrics/useMetricsSells";
import { governorateCodes } from "./governorateCodes";

export const useMapData = (dataSource) => {
    const {
        regionMetrics: regionMetricsOrders,
        errorRegionMetrics: errorRegionMetricsOrders,
        loadingRegionMetrics: loadingRegionMetricsOrders,
    } = useMetricsOrders("time_period=monthly");

    const {
        regionMetrics: regionMetricsSells,
        errorRegionMetrics: errorRegionMetricsSells,
        loadingRegionMetrics: loadingRegionMetricsSells,
    } = useMetricsSells("time_period=monthly");

    const transformRegionData = (regionData) => {
        const { address__governorate__name: names, values } = regionData;

        const transformedData = names.map((name, index) => {
            const code = governorateCodes[name] || null;
            return code ? [code, values[index]] : null;
        });

        return transformedData.filter(Boolean);
    };

    const mapData = React.useMemo(() => {
        let regionMetrics, errorRegionMetrics, loadingRegionMetrics;

        if (dataSource === "online") {
            regionMetrics = regionMetricsOrders;
            errorRegionMetrics = errorRegionMetricsOrders;
            loadingRegionMetrics = loadingRegionMetricsOrders;
        } else {
            regionMetrics = regionMetricsSells;
            errorRegionMetrics = errorRegionMetricsSells;
            loadingRegionMetrics = loadingRegionMetricsSells;
        }

        if (!regionMetrics || errorRegionMetrics || loadingRegionMetrics) {
            return [];
        }

        return transformRegionData(regionMetrics);
    }, [
        dataSource,
        regionMetricsOrders,
        errorRegionMetricsOrders,
        loadingRegionMetricsOrders,
        regionMetricsSells,
        errorRegionMetricsSells,
        loadingRegionMetricsSells,
    ]);

    const errorRegionMetrics = React.useMemo(() => {
        if (dataSource === "online") {
            return errorRegionMetricsOrders;
        } else {
            return errorRegionMetricsSells;
        }
    }, [dataSource, errorRegionMetricsOrders, errorRegionMetricsSells]);

    const loadingRegionMetrics = React.useMemo(() => {
        if (dataSource === "online") {
            return loadingRegionMetricsOrders;
        } else {
            return loadingRegionMetricsSells;
        }
    }, [dataSource, loadingRegionMetricsOrders, loadingRegionMetricsSells]);


    return { mapData, errorRegionMetrics, loadingRegionMetrics };
};
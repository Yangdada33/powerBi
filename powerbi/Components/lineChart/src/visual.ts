'use strict';
import 'core-js/stable';
import '../style/visual.less';
import powerbi from 'powerbi-visuals-api';
import DataView = powerbi.DataView;
import DataViewSingle = powerbi.DataViewSingle;
import IVisual = powerbi.extensibility.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

import * as echarts from 'echarts';

export class Visual implements IVisual {
    private container: HTMLElement;

    constructor(options: VisualConstructorOptions) {
        this.container = options.element;
    }

    public update(options: VisualUpdateOptions) {
        console.log(options);


        const dataView: DataView = options.dataViews[0];
        var arr = dataView.categorical.values;
        var xAxis = [], series = [];
        arr.forEach((item, index) => {
            xAxis.push(item.source.groupName);
            series.push(item.values[index])
        })

        console.log('xxxxxxx', xAxis);
        console.log('yyyyyy', series);



        const chart = echarts.init(this.container);
        var option = {
            xAxis: {
                type: 'category',
                data: xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: series,
                type: 'line'
            }]
        };
        chart.setOption(option, true);
    }
}

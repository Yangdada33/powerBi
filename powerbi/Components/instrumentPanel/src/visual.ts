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
        const singleDataView: DataViewSingle = dataView.single;
        console.log(singleDataView);

        const chart = echarts.init(this.container);
        var option = {
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter: '{value}%'},
                    data: [{
                        value: singleDataView.value,
                        // name: '完成率'
                    }]
                }
            ]
        };
        chart.setOption(option, true);
    }
}

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
        // console.log(singleDataView);
        const chart = echarts.init(this.container);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['直接访问', '邮件营销', '件营销'],
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['0%', '30%'],
                    avoidLabelOverlap: false,

                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: true,
                    },

                    data: [
                        { value: singleDataView.value, name: '直接访问' },
                        { value: 390910, name: '邮件营销' },
                        { value: 190910, name: '件营销' },
                    ],
                },
            ],
        };
        chart.setOption(option, true);
    }
}

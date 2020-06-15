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

        var _arr = dataView.categorical.categories[0].values

        var arr = dataView.categorical.values;

        // console.log('===>', _arr);
        // console.log('===>', arr);

        var seriesData = []
        var legendData = []

        for (var i = 0; i < arr.length; i++){
            var obj = {
                name: '',
                type: 'bar',
                stack: '总量',
                // label: {
                //     show: true,
                //     position: 'insideRight'
                // },
                data: []
            }

            obj.data = arr[i].values 
            obj.name = arr[i].source.displayName

            seriesData.push(obj)
            legendData.push(arr[i].source.displayName)
        }
        
        // console.log('legendData',legendData);
    
        // console.log(seriesData);
        
        const chart = echarts.init(this.container);
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:legendData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: _arr  
            },
            series: seriesData
        };
        chart.setOption(option, true);
    }
}

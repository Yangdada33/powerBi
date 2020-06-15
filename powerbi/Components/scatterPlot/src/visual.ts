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

        let arr = dataView.categorical.categories[0].values  // 月
        let xAxis = dataView.categorical.values[0].values  //x
        let yAxis = dataView.categorical.values[1].values  //y
        

        // console.log(arr);
        // console.log(xAxis);
        // console.log(yAxis);
        let newArr = []

        arr.forEach((value, index) => {
            console.log(value,index);
            
            newArr[index] = []
            newArr[index].push(xAxis[index])
            newArr[index].push(yAxis[index])
            newArr[index].push(arr[index])
        })


        console.log(newArr);
        let data = [ newArr ];
        

        const chart = echarts.init(this.container);
        var option = {
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: [ {
                data: data[0],
                type: 'scatter',
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[2];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                    }, {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                    }])
                }
            }]
        };
        chart.setOption(option, true);
    }
}

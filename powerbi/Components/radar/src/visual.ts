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
        // console.log(options);
        const dataView: DataView = options.dataViews[0];
        
        let valuesArr = dataView.categorical.values


        var groups = dataView.categorical.categories[0].values;
        // console.log('groups',groups);

        let newArr = []  // indicator  的值
        let dataArr = []
        valuesArr.forEach((item, index) => {
            // indicator
            let obj = {
                name: '',
                max: null
            }
            let max = valuesArr[index].maxLocal
            let name = valuesArr[index].source.displayName

            obj.name = name
            obj.max = max
            // console.log('=====>', obj);
            newArr.push(obj)
            
            let _values = valuesArr[index].values
            dataArr.push(_values)
        });

        // console.log('data==>',_dataArr);
        // console.log('weidu',newArr);
        // console.log('detailsvalue', dataArr);
        
        var seriesdata = [];
        for (var i = 0; i < groups.length;i++) { 
            let obj = {
                value: [],
                name:''
            }
            for (var j = 0; j < dataArr.length; j++) { 
                obj.value.push(dataArr[j][i])
            }

            obj.name = groups[i]+''
        
            // console.log('obj==>',obj);
            
            seriesdata.push(obj)

        }
        // console.log('seriesdata',seriesdata)

        const chart = echarts.init(this.container);
        var option = {
            legend: {
                data: groups
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
        
                indicator:newArr //维度
                
            },
            series: [{
                // name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: seriesdata //分组
            }]
        };
        chart.setOption(option, true);
    }
}

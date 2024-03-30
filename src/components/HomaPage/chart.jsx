import React from 'react';
import EChartsReact from 'echarts-for-react';

const BarChart = ({ data }) => {
  // Log data to check
  console.log('data====', data);

  // Assuming data format: { "name": "Series Name", "year1": value1, "year2": value2, ... }
  const seriesData = data.map(series => ({
    name: series.name,
    type: 'bar',
    label: {
      show: true,
      position: 'top'
    },
    data: Object.entries(series)
      .filter(([key]) => key !== 'name') // Filter out the 'name' key
      .map(([year, value]) => ({ year, value: parseFloat(value.replace(',', '')) })) // Convert value to float
  }));

  // Log transformed data
  console.log('seriesData:', seriesData);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: Object.keys(data[0]).filter(key => key !== 'name')
      }
    ],
    yAxis: [
      {
        axisTick: { show: false },
        type: 'value'
      }
    ],
    series: seriesData
  };

  return <EChartsReact style={{width:'100%'}} option={option} />;
};

export default BarChart;

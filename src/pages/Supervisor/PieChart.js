import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, width, height }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartRef && chartRef.current) {
//       const ctx = chartRef.current.getContext('2d');
//       new Chart(ctx, {
//         type: 'pie',
//         data: data,
//         options: {
//           // Customize options if needed
//         },
//       });
//     }
//   }, [data]);


  useEffect(() => {
    if (chartRef && chartRef.current) {
      // Destroy the existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
          // Customize options if needed
		  plugins: {
            legend: {
              display: true,
            //   position: 'bottom',
            },
          },
          layout: {
            // padding: -20,
          },
		  radius: '50%',
        },
      });
    }

    // Cleanup: Destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, width, height]);



  return (
    <div>
      <canvas ref={chartRef} width={0} height={0}/>
    </div>
  );
};

export default PieChart;

import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface HorizontalBarChartProps {
  data: [string, number][]
  title: string
  yTitle: string
  textColor?: string
  barColor?: string
}

export function HorizontalBarChart({ barColor = '#756793', data, textColor = '#9ca3af', title, yTitle }: HorizontalBarChartProps) {
  const labels = data.map(el => el[0].charAt(0).toUpperCase() + el[0].slice(1))
  const values: readonly number[] = data.map(el => el[1])

  const sumValues = values.reduce((accumulator, value) => accumulator + value)

  return (
    <Bar
      options={{
        animation: {
          delay: context => (context.type === 'data' ? context.dataIndex * 100 + context.datasetIndex * 100 : 0),
        },
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
          title: {
            text: title,
            font: {
              size: 19,
            },
            display: true,
            color: textColor,
          },
          tooltip: {
            callbacks: {
              label: context => {
                const percentageValues = values.map(value => ((value / sumValues) * 100).toFixed(1))

                return `${context.raw} (${percentageValues[context.dataIndex]}%)`
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: '#ffffff27',
            },
            ticks: {
              callback: tick => {
                return ((Number(tick) / sumValues) * 100).toFixed() + '%'
              },
              color: textColor,
            },
            title: {
              text: 'Frequency',
              display: true,
              color: textColor,
            },
          },
          y: {
            ticks: {
              color: textColor,
              padding: 10,
              font: {
                size: 13,
              },
            },
            title: {
              text: yTitle,
              display: true,
              color: textColor,
            },
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: 'Express',
            data: values,
            backgroundColor: barColor,
            borderRadius: 20,
            borderSkipped: false,
          },
        ],
      }}
    />
  )
}

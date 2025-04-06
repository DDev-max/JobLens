import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface HorizontalBarChartProps {
  data: [string, number][]
  title: string
  yTitle: string
  xTitle: string
  sizePx: number
  textColor?: string
  barColor?: string
  othersLabel: string
  isMediumScreen: boolean
}

export function HorizontalBarChart({
  barColor = '#60a5fa',
  data,
  textColor = '#9ca3af',
  title,
  yTitle,
  sizePx,
  xTitle,
  isMediumScreen,
  othersLabel,
}: HorizontalBarChartProps) {
  const labels = data.map((el, index) => {
    const firstLetterUpperCase = el[0].charAt(0).toUpperCase() + el[0].slice(1)
    if (index + 1 === data.length) {
      return othersLabel
    }

    return el[0].length <= 10 ? firstLetterUpperCase : firstLetterUpperCase.slice(0, 10) + '...'
  })
  const values: readonly number[] = data.map(el => el[1])

  const sumValues = values.reduce((accumulator, value) => accumulator + value)

  return (
    <Bar
      width={isMediumScreen ? sizePx * 3 : sizePx * 2}
      height={sizePx}
      options={{
        responsive: false,
        animation: {
          delay: context =>
            context.type === 'data' ? context.dataIndex * 100 + context.datasetIndex * 100 : 0,
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
              // title: context => data[context[0].dataIndex][0],
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
              text: xTitle,
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

import type { SVGProps } from 'react'

export function LensSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='#FFFF' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g strokeWidth='0'></g>
      <g strokeLinecap='round' strokeLinejoin='round'></g>
      <g>
        {' '}
        <path
          d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
          stroke='#000000'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>{' '}
        <path
          d='M17.1973 9C17.0976 8.82774 16.9896 8.66089 16.8739 8.5'
          stroke='#000000'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>{' '}
        <path
          d='M17.811 13.5C17.2683 15.6084 15.6084 17.2683 13.5 17.811'
          stroke='#000000'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>{' '}
      </g>
    </svg>
  )
}

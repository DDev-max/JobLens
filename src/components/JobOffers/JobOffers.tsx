import { Button } from '@heroui/button'
import { languagei18n } from '#data/consts'
import { useState } from 'react'
import { JobCard } from './JobCard'
import { Filters } from './Filters/Filters'
import { useAppSelector } from '#Context/hooks/storeHooks'

export function JobOffers({ maximumItems = 2 }: { maximumItems?: number }) {
  const [maxItems, setMaxItems] = useState(maximumItems)

  const currentLanguage = useAppSelector(state => state.languageReducer.language)

  const { currency, average } = useAppSelector(state => state.jobDataReducer.salaryInfo)

  const jobData = useAppSelector(state => state.jobDataReducer.data)

  if (!jobData?.length) return
  return (
    <>
      <Filters />
      <p className='m-5'>
        {jobData.length} {languagei18n[currentLanguage].charts.info}
      </p>
      <div aria-live='polite'>
        <section className='grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-4 '>
          {jobData.slice(0, maxItems).map((el, idx) => (
            <article key={idx}>
              <JobCard jobData={el} jobSalaryAvg={Number(average)} currency={currency || ''} />
            </article>
          ))}
        </section>
      </div>

      {maxItems < jobData.length && (
        <Button
          onPress={() => {
            setMaxItems(prev => prev + maximumItems)
          }}
          size='lg'
          className='m-4 md:w-60 ml-auto mr-auto'
          color='primary'
        >
          {languagei18n[currentLanguage].jobCard.showMore}
        </Button>
      )}
    </>
  )
}

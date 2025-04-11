import { Button } from '@heroui/button'
import { useState } from 'react'
import { JobCard } from './JobCard'
import { Filters } from '../Filters/Filters'
import { useAppSelector } from '#search/state/actions/storeHooks.ts'
import { languagei18n } from '../shared/language'

export function JobOffers({ maximumItems = 2 }: { maximumItems?: number }) {
  const [maxItems, setMaxItems] = useState(maximumItems)

  const currentLanguage = useAppSelector(state => state.languageReducer.language)

  const { salaryInfo, data, skills } = useAppSelector(state => state.jobDataReducer)
  const { average, currency } = salaryInfo

  if (!skills.length) return // to make sure the form was submitted
  return (
    <>
      <Filters />
      {!data.length && <p className='ml-auto mr-auto'>{languagei18n[currentLanguage].search.notFound}</p>}

      {data.length > 0 && (
        <>
          <p className='m-5'>
            {data.length} {languagei18n[currentLanguage].charts.info}
          </p>
          <div aria-live='polite'>
            <section className='grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-4 '>
              {data.slice(0, maxItems).map((el, idx) => (
                <article key={idx}>
                  <JobCard jobData={el} jobSalaryAvg={Number(average)} currency={currency || ''} />
                </article>
              ))}
            </section>
          </div>
        </>
      )}

      {maxItems < data.length && (
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

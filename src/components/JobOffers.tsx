import { Button } from '@heroui/button'
import { languagei18n } from '@/data/consts'
import { useSelector } from 'react-redux'
import type { RootState } from '@/Context/store'
import { useState } from 'react'
import { JobCard } from './JobCard'

export function JobOffers() {
  const [maxItems, setMaxItems] = useState(8)

  const currentLanguage = useSelector((state: RootState) => state.languageReducer.language)
  const { currency, salaryAvg } = useSelector((state: RootState) => state.jobDataReducer.salary)

  const jobData = useSelector((state: RootState) => state.jobDataReducer.data)
  if (!jobData?.length) return

  // console.clear()
  // console.log(String(MOCK_OBJ_SCRAPPING[0].jobLink))

  // console.log(
  //   MOCK_OBJ_SCRAPPING.filter(el => {
  //     return el.skills.some(el => el.match(/react/i))
  //   })
  // )

  return (
    <>
      <p className='m-5'>
        {jobData.length} {languagei18n[currentLanguage].charts.info}
      </p>
      <section className='grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-4 '>
        {jobData.slice(0, maxItems).map((el, idx) => (
          <article key={idx}>
            <JobCard jobData={el} jobSalaryAvg={Number(salaryAvg)} currency={currency || ''} />
          </article>
        ))}
      </section>

      {maxItems < jobData.length && (
        <Button
          onPress={() => {
            setMaxItems(prev => prev + 8)
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

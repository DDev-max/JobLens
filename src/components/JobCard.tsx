import type { RootState } from '@/Context/store'
import { languagei18n } from '@/data/consts'
import type { JobDescription } from '@/data/types'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { useSelector } from 'react-redux'

interface JobCardProps {
  jobData: JobDescription
}

export function JobCard({ jobData }: JobCardProps) {
  const skills = jobData.skills.toString()
  const cleanedSkills = skills.replace('&hellip', '').replace('…;', '')

  const currentLanguage = useSelector((state: RootState) => state.languageReducer.language)

  const jobSalary = jobData.salary ? `${jobData.salary}` : languagei18n[currentLanguage].jobCard.salary[1]

  const [JobAgeName, JobAgeValue] = languagei18n[currentLanguage].jobCard.age(jobData.jobAge)

  return (
    <Card className='p-4 h-[21rem] hover:scale-105 hover:border-blue-700 hover:border-1 '>
      <CardHeader className='p-0 flex flex-col'>
        <a className='flex justify-start w-full' href={jobData.jobLink} target='_blank'>
          <img src={jobData.imgSrc} alt={jobData.imgSrc ? `Logo: ${jobData.orgName}` : ''} className='rounded-lg min-w-20 max-w-20 min-h-20' />
          <div className='flex flex-col gap-2 px-3 justify-around'>
            <h2 className=' font-bold  text-blue-400'>{jobData.jobTitle}</h2>
          </div>
        </a>
        <p className='mr-auto py-2'>
          <b>{languagei18n[currentLanguage].jobCard.location[0]}</b>:{' '}
          {jobData.location ? jobData.location : languagei18n[currentLanguage].jobCard.location[1]}
        </p>
      </CardHeader>
      <Divider />
      <CardBody className='flex justify-center overflow-y-hidden'>
        {cleanedSkills.length <= 125 ? cleanedSkills : cleanedSkills.slice(0, 125) + '...'}
      </CardBody>
      <Divider />
      <CardFooter className='flex justify-between '>
        <span>
          <b>{JobAgeName}</b>
          {JobAgeValue}
        </span>
        <span>
          <b>{languagei18n[currentLanguage].jobCard.salary[0] + ': '}</b>
          {jobSalary}
        </span>
      </CardFooter>
    </Card>
  )
}

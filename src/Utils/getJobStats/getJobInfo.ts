// import { fetchData } from '../fetchData/fetchData.ts'
// import { getGlassDoorUrl } from './getGlassDoorUrl.ts'
import type { JobDescription } from '@/data/types.ts'
import { HTML } from './scrappedPage'
import { salaryConversion } from '../salaryConversion'
import { moneyRegex } from '@/data/consts'

interface GetJobStatsProps {
  jobPosition: string
  jobLocation: string
}

export async function getJobInfo({ jobLocation, jobPosition }: GetJobStatsProps) {
  const scraperApiUrl = `https://app.scrapingbee.com/api/v1/?api_key=${import.meta.env.VITE_API_KEY}&url=`

  // const encodedUrl = await getGlassDoorUrl({ jobLocation, jobPosition, scraperApiUrl })
  // if (!encodedUrl) return

  // const pageUrl = scraperApiUrl + encodedUrl + '&premium_proxy=True'

  // const htmlContent = await fetchData<string>({ URL: pageUrl, responseType: 'text', retries: 2 })
  // if (!htmlContent) return
  const htmlContent = HTML
  const parsedDoc = new DOMParser().parseFromString(htmlContent, 'text/html')

  const allResults = Array.from(parsedDoc.querySelectorAll('ul[aria-label="Jobs List"]>li'))
  const jobInfo: JobDescription[] = []

  for (const elmnt of allResults) {
    const jobTitle = elmnt.querySelector('[id^="job-title"]')?.textContent || ''
    const orgName = elmnt.querySelector('[class^="EmployerProfile_compactEmployerName"]')?.textContent || ''
    const linkElement = elmnt.querySelector('a[data-test="job-link"]')
    const jobLink = linkElement instanceof HTMLAnchorElement ? `https://www.glassdoor.com${linkElement.href}` : ''

    const id = new URL(jobLink).search

    const imgElement = elmnt.querySelector("[class^='avatar_AvatarContainer'] img")
    const imgSrc = imgElement instanceof HTMLImageElement ? imgElement.src : ''

    const location = elmnt.querySelector("[id^='job-location']")?.textContent || ''

    const salary = elmnt.querySelector('[id^="job-salary"]')?.textContent || ''

    const jobDescriptionElement = elmnt.querySelector('[class^="JobCard_jobDescriptionSnippet"] div:last-of-type')
    const jobDescriptionNodes = jobDescriptionElement ? jobDescriptionElement.childNodes : []
    const lastNode = jobDescriptionNodes[jobDescriptionNodes.length - 1]

    const skills = lastNode.textContent?.split(',') || []
    const jobAge = elmnt.querySelector('[class^="JobCard_listingAge"]')?.textContent || ''
    const salaryMatch = salary.match(moneyRegex) || []

    const salaryPerMonth = salary ? salaryConversion({ salary: salaryMatch, currency: '$', salaryDescription: salary }) : 0

    jobInfo.push({
      id,
      jobAge,
      jobTitle,
      location,
      orgName,
      skills,
      salary,
      imgSrc,
      jobLink,
      salaryPerMonth,
    })
  }

  return jobInfo
}

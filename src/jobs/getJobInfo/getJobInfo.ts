import jsDom from 'jsdom'
import type { JobDescription } from '#shared/types.ts'
import { getApiKey } from '#jobs/getApiKey.ts'
import { getGlassDoorUrl } from '#jobs/getGlassDoorUrl/getGlassDoorUrl.ts'
import { fetchData } from '#shared/fetchData/fetchData.ts'

interface GetJobStatsProps {
  jobPosition: string
  jobLocation: string
}

export async function getJobInfo({ jobLocation, jobPosition }: GetJobStatsProps) {
  const scraperApiUrl = `https://app.scrapingbee.com/api/v1/?api_key=${getApiKey()}&url=`

  const encodedUrl = await getGlassDoorUrl({ jobLocation, jobPosition, scraperApiUrl })
  if (!encodedUrl) return

  const pageUrl = scraperApiUrl + 'encodedUrl' + '&premium_proxy=True'

  const htmlContent = await fetchData<string>({ URL: pageUrl, responseType: 'text', retries: 2 })

  if (!htmlContent?.data) return
  const { JSDOM } = jsDom

  const parsedDoc = new JSDOM(htmlContent.data).window.document

  const allResults = Array.from(parsedDoc.querySelectorAll('ul[aria-label="Jobs List"]>li'))

  const jobInfo: JobDescription[] = []

  for (const elmnt of allResults) {
    const jobTitle = elmnt.querySelector('[id^="job-title"]')?.textContent || ''
    const orgName = elmnt.querySelector('[class^="EmployerProfile_compactEmployerName"]')?.textContent || ''
    const linkElement = elmnt.querySelector('a[data-test="job-link"]')

    const jobLink =
      linkElement?.tagName === 'A' ? `https://www.glassdoor.com${linkElement.getAttribute('href')}` : ''

    const urlSearch = new URL(jobLink).search
    const id = urlSearch.slice(urlSearch.lastIndexOf('-') + 1)

    const imgElement = elmnt.querySelector("[class^='avatar_AvatarContainer'] img")
    const imgSrc = imgElement?.tagName === 'IMG' ? (imgElement as HTMLImageElement).src : ''

    const location = elmnt.querySelector("[id^='job-location']")?.textContent || ''

    const salary = elmnt.querySelector('[id^="job-salary"]')?.textContent?.replace(/\s/g, ' ') || '' // to use the same type of spacing between words

    const jobDescriptionElement = elmnt.querySelector(
      '[class^="JobCard_jobDescriptionSnippet"] div:last-of-type'
    )
    const jobDescriptionNodes = jobDescriptionElement ? jobDescriptionElement.childNodes : []
    const lastNode = jobDescriptionNodes[jobDescriptionNodes.length - 1]

    const skills = lastNode.textContent?.split(',') || []
    const jobAge = elmnt.querySelector('[class^="JobCard_listingAge"]')?.textContent || ''

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
      salaryPerMonth: 0, // declaring the property, later on we will put the real value
    })
  }

  return jobInfo
}

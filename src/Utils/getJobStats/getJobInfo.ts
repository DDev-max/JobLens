import { chromium } from 'playwright'
import { config } from 'dotenv'
config()
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
//import { fetchData } from '../fetchData/fetchData.ts'
import { getGlassDoorUrl } from './getGlassDoorUrl.ts'

interface GetJobStatsProps {
  jobPosition: string
  jobLocation: string
}

interface jobDescription {
  jobTitle: string
  orgName: string
  location: string
  salary: string
  skills: string[]
  jobAge: string
  imgSrc: string
  jobLink: string
}

export async function getJobInfo({ jobLocation, jobPosition }: GetJobStatsProps) {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const scraperApiUrl = `https://app.scrapingbee.com/api/v1/?api_key=${process.env.API_KEY}&url=`
  try {
    const encodedUrl = await getGlassDoorUrl({ jobLocation, jobPosition, scraperApiUrl })

    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const htmlContent = await fs.readFile(path.join(__dirname, 'scrappedPage.html'), 'utf8')

    const pageUrl = scraperApiUrl + encodedUrl + '&premium_proxy=True'
    console.log(pageUrl.slice(0, 1))

    // const htmlContent = await fetchData<string>({ URL: pageUrl, responseType: 'text', retries: 2 })
    if (!htmlContent) return

    const jobPage = await context.newPage()
    jobPage.setContent(htmlContent)

    const jobLi = jobPage.locator('ul[aria-label="Jobs List"]>li')
    const allResults = await jobLi.all()

    const jobInfo: jobDescription[] = []

    for (const elmnt of allResults) {
      const jobTitle = (await elmnt.locator('[id^="job-title"]').textContent()) || ''
      const orgName = (await elmnt.locator('[class^="EmployerProfile_compactEmployerName"]').textContent()) || ''
      const jobLink = await elmnt.evaluate(li => {
        const linkElement = li.querySelector('a[data-test="job-link"]')
        return linkElement instanceof HTMLAnchorElement ? `https://www.glassdoor.com${linkElement.href}` : ''
      })

      const imgSrc = await elmnt.evaluate(li => {
        const imgElement = li.querySelector("[class^='avatar_AvatarContainer'] img")
        return imgElement instanceof HTMLImageElement ? imgElement.src : ''
      })

      const location = (await elmnt.locator("[id^='job-location']").textContent()) || ''

      const salary = await elmnt.evaluate(li => {
        const salaryElement = li.querySelector('[id^="job-salary"]')
        return salaryElement?.textContent ?? ''
      })

      const skills = await elmnt.evaluate(li => {
        const jobDescriptionElement = li.querySelector('[class^="JobCard_jobDescriptionSnippet"] div:last-of-type')
        if (!jobDescriptionElement) return []
        const jobDescriptionNodes = jobDescriptionElement.childNodes
        const lastNode = jobDescriptionNodes[jobDescriptionNodes.length - 1]
        return lastNode.textContent?.split(',') || []
      })

      const jobAge = (await elmnt.locator('[class^="JobCard_listingAge"]').textContent()) || ''

      jobInfo.push({
        jobAge,
        jobTitle,
        location,
        orgName,
        skills,
        salary,
        imgSrc,
        jobLink,
      })
    }

    return jobInfo
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  } finally {
    browser.close()
  }
}

console.log(await getJobInfo({ jobLocation: 'Mexico', jobPosition: 'Cajero' }))

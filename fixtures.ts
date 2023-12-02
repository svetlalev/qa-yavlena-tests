import {test as base} from '@playwright/test'
import {BrokersPage} from '@support/pages/brokersPage'

type YavlenaPageFixtures = {
  brokersPage: BrokersPage
}

export const test = base.extend<YavlenaPageFixtures>({
  brokersPage: async ({page}, use) => {
    const brokersPage = new BrokersPage(page)
    await brokersPage.goto()

    await use(brokersPage)
  }
})
export {expect} from '@playwright/test'

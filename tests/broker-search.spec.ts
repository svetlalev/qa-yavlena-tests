import {test} from '@playwright/test'
import {BrokersPage} from '@support/pages/brokersPage'

test('Search for broker', async ({page}) => {
  const brokersPage = new BrokersPage(page)
  await brokersPage.goto()
  const brokerNames: string[] = await brokersPage.getAllBrokerNames()
})

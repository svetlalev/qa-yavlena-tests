import {expect, test} from '@playwright/test'
import {BrokersPage} from '@support/pages/brokersPage'

test('Search for broker', async ({page}) => {
  test.setTimeout(240000) //setting huge timeout as it takes a lot of time to go through all brokers
  const brokersPage = new BrokersPage(page)
  await brokersPage.goto()
  const brokerNames: string[] = await brokersPage.getAllBrokerNames()

  for (const broker of brokerNames) {
    await brokersPage.searchBroker(broker)
    await expect(brokersPage.brokerNameLink).toHaveCount(1)
    await expect(brokersPage.brokerNameLink).toHaveText(broker)
    await expect(brokersPage.brokerAddressDiv).toBeVisible()
    await expect.soft(brokersPage.phoneNumberSpan).toHaveCount(2)
    await expect(brokersPage.brokerNumberOfPropertiesDiv).toBeVisible()
  }
})

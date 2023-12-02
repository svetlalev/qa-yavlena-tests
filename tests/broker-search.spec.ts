import {expect, test} from '@base/fixtures'

test('Search for each broker', async ({brokersPage}) => {
  test.setTimeout(240000) //setting huge timeout as it takes a lot of time to go through all brokers

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

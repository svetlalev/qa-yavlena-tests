import {Page, Locator, expect} from '@playwright/test'

export class BrokersPage {
  readonly page: Page
  readonly path: string
  readonly brokerSearchBox: Locator
  readonly brokerNameLink: Locator
  readonly brokerAddressDiv: Locator
  readonly brokerNumberOfPropertiesDiv: Locator
  readonly phoneNumberSpan: Locator
  readonly loadMoreButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/broker'
    this.brokerSearchBox = page.getByPlaceholder('име, район')
    this.brokerNameLink = page.locator('h3.name a')
    this.brokerAddressDiv = page.locator('div.office')
    this.brokerNumberOfPropertiesDiv = page.locator('div.position a')
    this.phoneNumberSpan = page.locator('.tel-group .tel')
    this.loadMoreButton = page.getByText('Зареди още')
  }

  async goto() {
    await this.page.goto(this.path)
  }

  async searchBroker(brokeName: string) {
    await this.brokerSearchBox.fill(brokeName)
  }

  async getAllBrokerNames(): Promise<string[]> {
    await this.loadAllBrokers()
    return await this.brokerNameLink.allInnerTexts()
  }

  async loadAllBrokers() {
    await this.loadMoreButton.click()
    await expect(this.loadMoreButton).not.toBeVisible()
  }
}

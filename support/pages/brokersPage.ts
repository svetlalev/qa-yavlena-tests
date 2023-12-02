import {Page, Locator, expect} from '@playwright/test'

export class BrokersPage {
  readonly page: Page
  readonly path: string
  readonly brokerNameLinks: Locator
  readonly loadMoreButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/broker'
    this.loadMoreButton = page.getByText('Зареди още')
    this.brokerNameLinks = page.locator('h3.name a')
  }

  async goto() {
    await this.page.goto(this.path)
  }

  async getAllBrokerNames(): Promise<string[]> {
    await this.loadAllBrokers()
    return await this.brokerNameLinks.allInnerTexts()
  }

  async loadAllBrokers() {
    await this.loadMoreButton.click()
    await expect(this.loadMoreButton).not.toBeVisible()
  }
}

# qa-yavlena-tests
A Playwright project with test for [Yavlena](https://www.yavlena.com/)

## Prerequisites
* [npm](https://www.npmjs.com)

## Installation

* Clone the git repository
* Run `npm run setup` from the folder root

## Test commands

* `npm run test:all` runs the test against Chromium, Firefox and Webkit
* `npm run test:chromium` runs the test against Chromium only (faster)
* `npm run test:chromium-headed` runs the test against Chromium in headed mode

## The test

* Navigates to [brokers page](https://www.yavlena.com/broker/)
* Loads all brokers and takes their names
* Searches each broker and verifies that:
  * the broker is the only one displayed
  * the address is displayed
  * the two phone numbers (landline and mobile) are displayed
  * the number of properties assigned to the broker are displayed

## Note: the test is failing

Not all brokers on the site have 2 phone numbers (as per the requirements of the test). Because of that the test fails.
However, a soft expectation has been added with a custom message, By doing so whenever the test is run, it will fail, but the log will display error with the name of the broker who doesn't have 2 phone numbers.

## Alternative approach
The task I was assigned asked for creating **one** test (not multiple test**s**). A better solution in my opinion would be to create multiple parameterized tests. This can be easily achieved by:
* Moving the actions necessary for taking the borkers' names before the test, for example in a before all hook.
* Parameterizing the tests. They will look something like the below:
```
for (const broker of brokerNames)
    test(`Search for ${broker}`, async ({brokersPage}) => {
      await brokersPage.searchBroker(broker)
      await expect(brokersPage.brokerNameLink).toHaveCount(1)
      await expect(brokersPage.brokerNameLink).toHaveText(broker)
      await expect(brokersPage.brokerAddressDiv).toBeVisible()
      await expect(
        brokersPage.phoneNumberSpan,
        `${broker} has ${await brokersPage.phoneNumberSpan.count()} phone number(s).`
      ).toHaveCount(2)
      await expect(brokersPage.brokerNumberOfPropertiesDiv).toBeVisible()
    })
```

By doing so, there will be multiple tests and only the ones where some of the expectations fail (e.g. the phone number count) will be marked as failed. This will remove the need for the soft assertion and will also make each individual test much faster.

However, as I said, the assignment was for only one test, so I have not taken this approach.

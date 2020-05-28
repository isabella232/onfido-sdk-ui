import { describe, it } from '../../utils/mochaw'
import { localhostUrl } from '../../config.json'
import { until } from 'selenium-webdriver'


const options = {
  pageObjects: ['BasePage', 'Welcome']
}

export const modalScenarios = async(lang) => {
  describe(`MODAL scenarios in ${lang}`, options, ({driver, pageObjects}) => {

    const { welcome } = pageObjects
    const copy = welcome.copy(lang)

    const closeModalMethod = {
      CLOSE_BUTTON_CLICK: 'welcome.clickOnCloseModalButton()',
    }

    const openAndCloseModal = async (closeMethod) => {
      driver.get(`${localhostUrl}?language=${lang}&useModal=true`)
      welcome.clickOnOpenModalButton()
      driver.wait(until.elementIsVisible(welcome.title()), 10000)
      welcome.verifyTitle(copy)
      if (closeMethod === closeModalMethod.CLOSE_BUTTON_CLICK) {
        welcome.clickOnCloseModalButton()
      } else {
        welcome.pressEscapeButton()
      }
      welcome.clickOnOpenModalButton()
      driver.wait(until.elementIsVisible(welcome.title()), 10000)
      welcome.verifyTitle(copy)
    }

    it('should be able to open, close and re-open a modal view', async () => {
      openAndCloseModal(closeModalMethod.CLOSE_BUTTON_CLICK)
    })

    it('should be able to close modal with ESC button', async () => {
      openAndCloseModal()
    })
  })
}

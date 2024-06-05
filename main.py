from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
bigString = '''
driver = webdriver.Chrome()

driver.get("https://www.selenium.dev/selenium/web/web-form.html")

title = driver.title

driver.implicitly_wait(0.5)

text_box = driver.find_element(by=By.NAME, value="my-password")
submit_button = driver.find_element(by=By.CSS_SELECTOR, value="button")

text_box.send_keys("Selenium")
submit_button.click()

message = driver.find_element(by=By.CSS_SELECTOR, value="h1")
text = message.text

driver.quit()

print(title, " ", text) '''

import time

opt = Options()
opt.add_extension('/Users/mahitnamburu/Desktop/webdrivertest/webextensions-selenium-example.crx')
opt.add_argument('--disable-web-security')
#opt.add_argument('--user-data-dir')
opt.add_argument('--allow-running-insecure-content')
driver = webdriver.Chrome(options=opt)
driver.get('http://www.google.com/')
time.sleep(1) # Let the user actually see something!
search_box = driver.find_element(by=By.LINK_TEXT, value="Sign in")
search_box.click()
driver.implicitly_wait(0.5)
username_box = driver.find_element(by=By.NAME, value="identifier")
username_box.send_keys('mahitraj@gmail.com')
#username_box.submit()
time.sleep(2)
submit_email = driver.find_element(by=By.ID, value="identifierNext")
submit_email.click()

#password_box = driver.find_element()
#search_box.send_keys('ChromeDriver')
#search_box.submit()
time.sleep(5) # Let the user actually see something!
driver.quit()

# /Users/mahitnamburu/Downloads/chromedriver-mac-arm64


#--- lab data ---
# convert this into a script in node
# ensure it works with different extensions
# import web-vitals library and play around with onXXX functions
# see if we can simulate a pageload

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.get("http://127.0.0.1:8080/angularjs/")

driver.execute_script("window.localStorage.clear();")

#################################################################
## Check Login Signup Functionality                            ##
## Fulfill assignment requirement 1, 2, 3 and 6                ##
#################################################################

# inital open the page
assert "Angular JS Assignment" in driver.title
element = driver.find_element_by_xpath('/html/body')
assert 'Login' in element.text
assert 'Sign up' in element.text

# Click on signup page, check resulting page url
driver.find_element_by_xpath("//a[contains(text(), 'Sign up')]").click()
assert "http://127.0.0.1:8080/angularjs/#/signup" == driver.current_url

# fill in fields in sign up page, but fill email wrong. And click Save
driver.find_element_by_xpath('//*[@id="user"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath('//*[@id="pswd"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath('//*[@id="first_name"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath('//*[@id="last_name"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath('//*[@id="email"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath('//*[@id="phone"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath('//*[@id="location"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath("//input[@type='button']").click()

# Check error message
element = driver.find_element_by_xpath('/html/body')
assert '{"status":"falied","message":[{"email":false}]}' in element.text

# Correct email field, and click Save
driver.find_element_by_xpath('//*[@id="email"]/input').clear()
driver.find_element_by_xpath('//*[@id="email"]/input').send_keys("zhaoyi@example.net")
driver.find_element_by_xpath('//input[@type="button"]').click()
assert "http://127.0.0.1:8080/angularjs/#/" == driver.current_url
element = driver.find_element_by_xpath('/html/body')
assert 'Profile' in element.text
assert 'Messages' in element.text
assert 'Logout' in element.text

# Click on Logout
driver.find_element_by_xpath("//a[contains(text(), 'Logout')]").click()
assert "http://127.0.0.1:8080/angularjs/#/login" == driver.current_url
element = driver.find_element_by_xpath('/html/body')
assert 'Login' in element.text
assert 'Sign up' in element.text

# login with wrong password, and check error message
driver.find_element_by_xpath('//*[@id="user"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath('//*[@id="pswd"]/input').send_keys("zhaoyi123")
driver.find_element_by_xpath("//input[@type='button']").click()
element = driver.find_element_by_xpath('/html/body')
assert '{"status":"falied","message":"Incorrect username or password. Please try again. "}' in element.text

# login with right password, and check 
driver.find_element_by_xpath('//*[@id="user"]/input').clear()
driver.find_element_by_xpath('//*[@id="user"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath('//*[@id="pswd"]/input').clear()
driver.find_element_by_xpath('//*[@id="pswd"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath("//input[@type='button']").click()
assert "http://127.0.0.1:8080/angularjs/#/" == driver.current_url
element = driver.find_element_by_xpath('/html/body')
assert 'Profile' in element.text
assert 'Messages' in element.text
assert 'Logout' in element.text

#################################################################
## Check Profile Functionality                                 ##
## Fulfill assignment requirement 4. Profile Page              ##
#################################################################

driver.find_element_by_xpath("//a[contains(text(), 'Profile')]").click()
assert "http://127.0.0.1:8080/angularjs/#/profile" == driver.current_url

# Check information in each field
assert driver.find_element_by_xpath('//*[@id="user"]/input').get_attribute('value') == "zhaoyi"
assert driver.find_element_by_xpath('//*[@id="pswd"]/input').get_attribute('value') == "zhaoyi"
assert driver.find_element_by_xpath('//*[@id="first_name"]/input').get_attribute('value') == "zhaoyi"
assert driver.find_element_by_xpath('//*[@id="last_name"]/input').get_attribute('value') == "zhaoyi"
assert driver.find_element_by_xpath('//*[@id="email"]/input').get_attribute('value') == "zhaoyi@example.net"
assert driver.find_element_by_xpath('//*[@id="phone"]/input').get_attribute('value') == "zhaoyi"
assert driver.find_element_by_xpath('//*[@id="location"]/input').get_attribute('value') == "zhaoyi"

# fill in fields in profile page, but fill email wrong. And click Save. Note username cannot be changed
driver.find_element_by_xpath('//*[@id="pswd"]/input').clear()
driver.find_element_by_xpath('//*[@id="pswd"]/input').send_keys("Yi Zhao 2")
driver.find_element_by_xpath('//*[@id="first_name"]/input').clear()
driver.find_element_by_xpath('//*[@id="first_name"]/input').send_keys("Yi Zhao 3")
driver.find_element_by_xpath('//*[@id="last_name"]/input').clear()
driver.find_element_by_xpath('//*[@id="last_name"]/input').send_keys("Yi Zhao 4")
driver.find_element_by_xpath('//*[@id="email"]/input').clear()
driver.find_element_by_xpath('//*[@id="email"]/input').send_keys("Yi Zhao 5")
driver.find_element_by_xpath('//*[@id="phone"]/input').clear()
driver.find_element_by_xpath('//*[@id="phone"]/input').send_keys("Yi Zhao 6")
driver.find_element_by_xpath('//*[@id="location"]/input').clear()
driver.find_element_by_xpath('//*[@id="location"]/input').send_keys("Yi Zhao 7")
driver.find_element_by_xpath("//input[@type='button']").click()

# Check error message
element = driver.find_element_by_xpath('/html/body')
assert '{"status":"falied","message":[{"email":false}]}' in element.text

# Make sure username cannot be changed
# To-do

# Correct email field, and click Save
driver.find_element_by_xpath('//*[@id="email"]/input').clear()
driver.find_element_by_xpath('//*[@id="email"]/input').send_keys("yzhao8@example.com")
driver.find_element_by_xpath('//input[@type="button"]').click()
assert "http://127.0.0.1:8080/angularjs/#/profile" == driver.current_url

# Logout, refresh, login, and go to profile
driver.find_element_by_xpath("//a[contains(text(), 'Logout')]").click()
driver.get("http://127.0.0.1:8080/angularjs/")
driver.find_element_by_xpath("//a[contains(text(), 'Login')]").click()
driver.find_element_by_xpath('//*[@id="user"]/input').send_keys("zhaoyi")
driver.find_element_by_xpath('//*[@id="pswd"]/input').send_keys("Yi Zhao 2")
driver.find_element_by_xpath("//input[@type='button']").click()
driver.find_element_by_xpath("//a[contains(text(), 'Profile')]").click()
assert "http://127.0.0.1:8080/angularjs/#/profile" == driver.current_url

# Check profile again
assert driver.find_element_by_xpath('//*[@id="user"]/input').get_attribute('value') == "zhaoyi"
assert driver.find_element_by_xpath('//*[@id="pswd"]/input').get_attribute('value') == "Yi Zhao 2"
assert driver.find_element_by_xpath('//*[@id="first_name"]/input').get_attribute('value') == "Yi Zhao 3"
assert driver.find_element_by_xpath('//*[@id="last_name"]/input').get_attribute('value') == "Yi Zhao 4"
assert driver.find_element_by_xpath('//*[@id="email"]/input').get_attribute('value') == "yzhao8@example.com"
assert driver.find_element_by_xpath('//*[@id="phone"]/input').get_attribute('value') == "Yi Zhao 6"
assert driver.find_element_by_xpath('//*[@id="location"]/input').get_attribute('value') == "Yi Zhao 7"

#################################################################
## Check Massage List and Description Page Functionality       ##
## Fulfill assignment requirement 5                            ##
#################################################################

# Create some dummy data for test, refresh to load them
driver.execute_script('window.localStorage.setItem(\'messages\', \'[{"index": "0", "recipient":"zhaoyi","recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png","sender":"User 2","sender_img":"http://simpleicon.com/wp-content/uploads/user1.png","title":"This is a sample message to User 1 to zhaoyi.","description":"This is a sample description to the message which has the above title","created_at":"2017-01-19 09:45:00","important":"0"},{"index": "1", "recipient":"User 1","recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png","sender":"User 2","sender_img":"http://simpleicon.com/wp-content/uploads/user1.png","title":"This is a sample message from User 2 to User 1.","description":"This is a sample description to the message which has the above title","created_at":"2017-01-19 09:45:00","important":"0"},{"index": "2", "recipient":"User 2","recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png","sender":"zhaoyi","sender_img":"http://simpleicon.com/wp-content/uploads/user1.png","title":"This is a sample message from zhaoyi to User 2.","description":"This is a sample description to the message which has the above title","created_at":"2017-01-19 09:45:00","important":"0"}]\');')
driver.get("http://127.0.0.1:8080/angularjs/")

# Click to go to Messages page
driver.find_element_by_xpath("//a[contains(text(), 'Messages')]").click()
assert "http://127.0.0.1:8080/angularjs/#/messageList" == driver.current_url

# Check current list items. Checking dataService.getMessageList()
m1 = driver.find_elements_by_css_selector(".messageList > div")[0].text
print m1
assert 'User 2' in m1
assert 'zhaoyi' in m1
assert 'This is a sample message to User 1 to zhaoyi.' in m1
assert '2017-01-19 09:45:00' in m1

m2 = driver.find_elements_by_css_selector(".messageList > div")[1].text
print m2
assert 'User 2' in m2
assert 'zhaoyi' in m2
assert 'This is a sample message from zhaoyi to User 2.' in m2
assert '2017-01-19 09:45:00' in m2

# Go to message_0 detail page
driver.find_elements_by_css_selector(".messageList > div")[0].click()
assert "http://127.0.0.1:8080/angularjs/#/messageDetail/0" == driver.current_url

element = driver.find_elements_by_css_selector(".messageDetail > div")
assert len(element) == 2
m3 = element[0].text
assert 'User 2' in m3
assert 'zhaoyi' in m3
assert 'This is a sample message to User 1 to zhaoyi.' in m3
assert 'This is a sample description to the message which has the above title' in m3
assert '2017-01-19 09:45:00' in m3
assert '0' in element[0].find_elements_by_css_selector(":nth-child(8)")[0].text

# Mark message_0 as important




# End of test
driver.close()
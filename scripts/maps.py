from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urlparse, urlencode


def get_coordinates(place_id) -> tuple[float, float]:
    # init driver
    driver = webdriver.Safari()
    driver.maximize_window()

    # open page
    url = f'https://www.google.com/maps/search/?{urlencode({"api": 1, "query": "Place", "query_place_id": place_id})}'
    driver.get(url)

    # reject gdpr consent
    reject_button = driver.find_element(By.CSS_SELECTOR, 'button[aria-label="Reject all"]')
    reject_button.click()

    # get current url
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'button[data-value="Share"]')))
    WebDriverWait(driver, 10).until_not(EC.url_contains('/search/'))

    current_url = urlparse(driver.current_url)
    paths = current_url.path.split('/')
    if paths[:3] != ['', 'maps', 'place']:
        raise ValueError('Invalid URL')

    # get coordinates
    coordinates = paths[4].split(',')
    lat = float(coordinates[0].removeprefix('@'))
    lon = float(coordinates[1])
    driver.quit()
    return lat, lon

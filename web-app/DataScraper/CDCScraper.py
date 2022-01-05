#!/usr/bin/env python
# coding: utf-8

# ## COVID-19 CDC Scraper
# Script to scrape COVID-19 data from CDC website

# In[1]:


import pandas as pd
import itertools
import time
import json
from selenium import webdriver
import sys

sys.path.insert(0,'/Users/Owner/Downloads/chromedriver')
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')


# In[2]:


#put pathwhere you downloaded chromedriver
driver = webdriver.Chrome('/Users/Owner/Downloads/chromedriver')


# Obtaining COVID-19 data for each U.S. state
# - counties
# - total cases
# - % of state's cases
# - cases per 100k
# - total deaths

# In[4]:


states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 
          'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 
          'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 
          'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

state_counties = []
state_cases = []
state_pct = []
state_cp100 = []
state_deaths = []

for j in states:
    #getting website with data
    driver.get('https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/county-map.html?state='+str(j))
    time.sleep(30)
    
    #getting number of counties in state i
    table_id = driver.find_element_by_tag_name('tbody')
    all_rows = table_id.find_elements_by_tag_name("tr")
    
    #temp list for each state
    counties = []
    cases = []
    pct_st = []
    cases_per_100k = []
    deaths = []
    
    for i in range( 1, len(all_rows)+1):
        counties_element = driver.find_elements_by_xpath('/html/body/div[10]/main/div[3]/div/div[3]/div/div/div/div/app-root/div/div[2]/div[5]/table/tbody/tr['+str(i)+']/td[1]')[0]
        counties.append(counties_element.text)

        cases_element = driver.find_elements_by_xpath('/html/body/div[10]/main/div[3]/div/div[3]/div/div/div/div/app-root/div/div[2]/div[5]/table/tbody/tr['+str(i)+']/td[2]')[0]
        cases.append(cases_element.text)

        pct_st_element = driver.find_elements_by_xpath('/html/body/div[10]/main/div[3]/div/div[3]/div/div/div/div/app-root/div/div[2]/div[5]/table/tbody/tr['+str(i)+']/td[3]')[0]
        pct_st.append(pct_st_element.text)

        cases_per_100k_element = driver.find_elements_by_xpath('/html/body/div[10]/main/div[3]/div/div[3]/div/div/div/div/app-root/div/div[2]/div[5]/table/tbody/tr['+str(i)+']/td[4]')[0]
        cases_per_100k.append(cases_per_100k_element.text)

        deaths_element = driver.find_elements_by_xpath('/html/body/div[10]/main/div[3]/div/div[3]/div/div/div/div/app-root/div/div[2]/div[5]/table/tbody/tr['+str(i)+']/td[5]')[0]
        deaths.append(deaths_element.text)
    
    #data for all states in list format
    state_counties.append(counties)
    state_cases.append(cases)
    state_pct.append(pct_st)
    state_cp100.append(cases_per_100k)
    state_deaths.append(deaths)


# In[17]:


#prep for dataframe
states_list = []
for i in range(0, len(states)):
    states_list.append([states[i]] * len(state_counties[i]))
    
states_list_merged = list(itertools.chain(*states_list))
state_counties_merged = list(itertools.chain(*state_counties))
state_cases_merged = list(itertools.chain(*state_cases))
state_pct_merged = list(itertools.chain(*state_pct))
state_cp100_merged = list(itertools.chain(*state_cp100))
state_deaths_merged = list(itertools.chain(*state_deaths))


# In[9]:


states_df = pd.DataFrame()


# In[27]:


states_df['states'] = states_list_merged
states_df['counties'] = state_counties_merged
states_df['total cases'] = state_cases_merged
states_df['% of states cases'] = state_pct_merged
states_df['cases per 100k'] = state_cp100_merged
states_df['total deaths'] = state_deaths_merged


# In[ ]:


states_df


# In[38]:


states_dict = states_df.groupby('states')[['counties', 'total cases', '% of states cases', 'cases per 100k', 'total deaths']].apply(lambda x: x.set_index('counties').to_dict(orient='index')).to_dict()


# In[45]:


states_json = json.dumps(states_dict, indent = 4)
with open('covid_by_states.json', 'w') as json_file:
    json.dump(states_json, json_file)


# In[ ]:

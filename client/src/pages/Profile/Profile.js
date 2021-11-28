import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useTranslation } from 'react-i18next'

import './Profile.css'

import { Button, Input, Label } from '../../compoentns'

const Profile = () => {
  const { t } = useTranslation()
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <main className='profile pt-5 pb-5'>
      <div className="profile-wrapper">
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className="tabs">
          <TabList className='tab-list me-3'>
            <Tab id='setting' className="tab">{t('profile.settings')}</Tab>
            <Tab id='tours' className='tab'>{t('profile.trips')}</Tab>
            <Tab id='views' className='tab'>{t('profile.reviews')}</Tab>
            <Tab id='bills' className='tab'>{t('profile.account')}</Tab>
          </TabList>

          <TabPanel id='setting' className='tab-panel'>
            <div className="tab-panel-info">
              <h2 className="tab-panel-title mb-3">{t('settings.titleOne')}</h2>
              <form className='tab-panel-form'>
                <div className="tab-panel-group">
                  <Label
                      htmlFor='title'
                      title={t('settings.name')}
                  />
                  <Input
                      id='title'
                      type="text"
                      autoComplete='off'
                  />
                </div>
                <div className="tab-panel-group">
                  <Label
                      htmlFor='email'
                      title={t('settings.email')}
                  />
                  <Input
                      id='email'
                      type='text'
                      autoComplete='off'
                  />
                </div>
                <div className="tab-panel-group__choose mb-5">
                  <img className='tab-panel-img' src="#" alt="#" />
                  <Input
                      id='photo'
                      type='file'
                  />
                  <Label
                      htmlFor='photo'
                      title={t('settings.choose')}
                  />
                </div>
                <div className="tab-panel-group">
                  <Button
                      title={t('settings.accBtn')}
                      type="submit"
                  />
                </div>
              </form>
            </div>
            <div className="tab-panel-password">
              <h2 className='tab-panel-title mt-3 mb-3'>{t('settings.titleTwo')}</h2>
              <form className='tab-panel-form'>
                <div className="tab-panel-group">
                  <Label
                      htmlFor='current'
                      title={t('settings.current')}
                  />
                  <Input
                      id='current'
                      type="text" placeholder='••••••••'
                      autoComplete='off'
                  />
                </div>
                <div className="tab-panel-group">
                  <Label
                      htmlFor='new'
                      title={t('settings.new')}
                  />
                  <Input
                      id='new'
                      type="text"
                      autoComplete='off'
                      placeholder='••••••••'
                  />
                </div>
                <div className="tab-panel-group mb-5">
                  <Label
                      htmlFor='confirm'
                      title={t('settings.confirm')}
                  />
                  <Input
                      id='confirm'
                      type="text"
                      autoComplete='off'
                      placeholder='••••••••'
                  />
                </div>
                <div className="tab-panel-group">
                  <Button
                      title={t('settings.passBtn')}
                      type="submit"
                  />
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel id='tours' className='tab-panel'>
            <h2>{t('trip.title')}</h2>
          </TabPanel>
          <TabPanel id='views' className='tab-panel'>
            <h2>{t('reviews.title')}</h2>
          </TabPanel>
          <TabPanel id='bills' className='tab-panel'>
            <h2>{t('account.title')}</h2>
          </TabPanel>
        </Tabs>
      </div>
    </main>
  )
}

export default Profile

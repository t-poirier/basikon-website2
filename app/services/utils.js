const resourcesUrl = (process.env.NODE_ENV === 'production' ? '' : `http://localhost`) + '/imp/website'

export { resourcesUrl }

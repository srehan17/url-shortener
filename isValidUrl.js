const isValidUrl = (url) => {
    try {
      const urlForTesting = new URL(url)
      return urlForTesting.protocol === 'http:' || urlForTesting.protocol === 'https:'
    }
    catch (err) {
      console.error(err)
      return false
    }
  }

module.exports = isValidUrl
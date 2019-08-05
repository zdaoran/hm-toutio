const KEY = 'toutiao'

export default {
  setUser (userInfo) {
    window.sessionStorage.setItem(KEY, JSON.stringify(userInfo))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

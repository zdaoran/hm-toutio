const KEY = 'toutiao'

export default {
  setUser (userInfo) {
    let localUserInfo = this.getUser()
    const newUserInfo = { ...localUserInfo, ...userInfo }
    window.sessionStorage.setItem(KEY, JSON.stringify(newUserInfo))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

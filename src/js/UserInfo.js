export default class UserInfo {
  constructor() {
    this.userName = null;
    this.userAbout = null;
    this.userAvatar = null;
    this.userId = null;
  }

  getUserInfo = (userData) => {
    this.userName = userData.name;
    this.userAbout = userData.about;
    this.userAvatar = userData.avatar;
    this.userId = userData._id;
  };

  setUserInfo(obj) {
    this.userName = obj.name;
    this.userAbout = obj.about;
  }

  setUserAvatar = (link) => {
    this.userAvatar = link;
  };

  updateUserInfo(nameNode, aboutNode) {
    nameNode.textContent = this.userName;
    aboutNode.textContent = this.userAbout;
  }

  updateUserAvatar = (avatarNode) => {
    avatarNode.style.backgroundImage = `url(${this.userAvatar})`;
  };

  get userInfo() {
    return {
      name: this.userName,
      about: this.userAbout
    }
  }

  get id() {
    return this.userId;
  }
}

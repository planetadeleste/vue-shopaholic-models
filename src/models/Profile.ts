import User from "@bit/planetadeleste.shopaholic.models.user"

export default class Profile extends User {
  resource() {
    return "profile";
  }
}
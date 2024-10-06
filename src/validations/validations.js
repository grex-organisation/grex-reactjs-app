export function validateUsername(uname) {

    const username = uname.trim();
    const regex = /^[0-9a-zA-Z_]+$/;

    if (username != null && username.length >= 8 && username.length <= 20 && regex.test(username)) {
      //setIsValidUserName(true);
      //setUserNameErrorMessage("");
      return true;
    } else {
      //setIsValidUserName(false);
      //setUserNameErrorMessage("Username length has to be between 8 to 20, only aA-zZ are allowed with underscores.")
    }

    return false;

  }
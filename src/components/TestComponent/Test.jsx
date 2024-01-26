import { EmailAuthProvider, 
    getAuth, reauthenticateWithCredential, 
    sendEmailVerification, updateEmail, 
    // verifyBeforeUpdateEmail 
} from "firebase/auth";

export default async function changeLogin(newEmail, valueOldPass) {
    const auth = getAuth();  
  newEmail='berezinaq@yandex.ru';
  valueOldPass='123456'
    try {
      
      await reauthenticateWithCredential(
        auth.currentUser,
        EmailAuthProvider.credential(auth.currentUser.email, valueOldPass)
      );
  
      
      await sendEmailVerification(auth.currentUser);
  //  await  verifyBeforeUpdateEmail(auth.currentUser, newEmail);
      await updateEmail(auth.currentUser, newEmail)
  
      console.log("done");
    } catch (errorChange) {
      console.error(errorChange.message);
      throw new Error(errorChange.message);
    }
  }
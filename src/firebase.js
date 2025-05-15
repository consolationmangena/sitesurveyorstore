import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  // your firebase config
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const updateUserProfile = async (user, profileData) => {
  try {
    await user.updateProfile({
      displayName: profileData.displayName,
      phoneNumber: profileData.phoneNumber,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export default firebase;
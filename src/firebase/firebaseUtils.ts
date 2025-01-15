import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const uploadPhoto = async (file: File): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, `profile_pictures/${file.name}`);

  try {
    // 파일 업로드
    await uploadBytes(storageRef, file);

    // 업로드 후 다운로드 URL 가져오기
    const photoURL = await getDownloadURL(storageRef);

    // Firestore에 사용자 프로필에 photoURL 저장
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { photoURL });  // Firestore에 저장
    }

    return photoURL;  // 다운로드된 URL 반환
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    throw new Error("파일 업로드 실패");
  }
};

// Firestore에서 사용자 사진 URL 가져오기
export const getUserPhotoURL = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      return data.photoURL || null;  // Firestore에서 photoURL 반환
    }
  }
  return null;  // 사용자가 없거나 사진이 없으면 null 반환
};
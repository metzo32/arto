import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";


const useFetchWishlist = () => {
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const ids = userDoc.data()?.wishList || [];
          setWishlistedIds(ids);
        }
      }
    };

    fetchWishlist();
  }, []);

  return wishlistedIds;
};

export default useFetchWishlist;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const configDB = {
  apiKey: "AIzaSyDp38BDC_wZJCXKO2bBVIpd09YIFnSdZaY",
  authDomain: "vuejs501-authmar.firebaseapp.com",
  projectId: "vuejs501-authmar",
  storageBucket: "vuejs501-authmar.firebasestorage.app",
  messagingSenderId: "724071288216",
  appId: "1:724071288216:web:ff93adcddd12b41373efed"
};

const app = initializeApp(configDB);
const auth = getAuth(app);

export default auth
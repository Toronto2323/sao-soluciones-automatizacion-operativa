import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const SAO_PROFILE_KEY = "saoProfilePreview";
const SAO_FIREBASE_USER_KEY = "saoFirebaseUser";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const isTouchDevice = () => window.matchMedia("(hover: none), (pointer: coarse)").matches;
const shortName = (name = "") => name.trim().split(/\s+/)[0] || "Perfil";

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    uid: user.uid,
    name: user.displayName || "Perfil SAO",
    email: user.email || "",
    photo: user.photoURL || "",
    provider: "google",
    updatedAt: new Date().toISOString()
  };
};

const saveUserLocally = (user) => {
  const profile = normalizeUser(user);
  if (!profile) {
    localStorage.removeItem(SAO_FIREBASE_USER_KEY);
    localStorage.removeItem(SAO_PROFILE_KEY);
    return null;
  }

  localStorage.setItem(SAO_FIREBASE_USER_KEY, JSON.stringify(profile));
  localStorage.setItem(SAO_PROFILE_KEY, JSON.stringify({
    name: profile.name,
    email: profile.email,
    photo: profile.photo,
    uid: profile.uid,
    type: "google",
    source: "firebase-google",
    updatedAt: profile.updatedAt
  }));
  return profile;
};

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

const updateAuthInterface = (profile) => {
  const isLoggedIn = Boolean(profile?.uid);
  document.body.classList.toggle("sao-authenticated", isLoggedIn);

  document.querySelectorAll("[data-auth-guest]").forEach((element) => {
    element.hidden = isLoggedIn;
  });

  document.querySelectorAll("[data-auth-user]").forEach((element) => {
    element.hidden = !isLoggedIn;
  });

  document.querySelectorAll(".profile-entry-btn").forEach((button) => {
    const label = button.querySelector("span");
    if (label) label.textContent = isLoggedIn ? shortName(profile.name) : "Perfil";
    button.classList.toggle("is-authenticated", isLoggedIn);
  });

  document.querySelectorAll(".mobile-profile-btn").forEach((button) => {
    button.textContent = isLoggedIn ? `Perfil: ${profile.name}` : "Crear perfil gratuito";
    button.classList.toggle("is-authenticated", isLoggedIn);
  });

  setText("[data-auth-name]", profile?.name || "");
  setText("[data-auth-email]", profile?.email || "");

  document.querySelectorAll("[data-auth-photo]").forEach((img) => {
    if (profile?.photo) {
      img.src = profile.photo;
      img.alt = `Foto de ${profile.name}`;
    } else {
      img.removeAttribute("src");
      img.alt = "";
    }
  });
};

const dispatchAuthChange = (profile) => {
  window.dispatchEvent(new CustomEvent("sao-auth-changed", { detail: profile }));
  window.dispatchEvent(new CustomEvent("sao-profile-updated", { detail: profile }));
};

const closeProfileModal = () => {
  const modal = document.querySelector("#profileModal");
  if (!modal) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const signInWithGoogle = async () => {
  try {
    if (isTouchDevice()) {
      await signInWithRedirect(auth, provider);
      return;
    }
    const result = await signInWithPopup(auth, provider);
    const profile = saveUserLocally(result.user);
    updateAuthInterface(profile);
    dispatchAuthChange(profile);
    closeProfileModal();
  } catch (error) {
    console.error("No fue posible iniciar sesión con Google", error);
    const note = document.querySelector("#profileFormNote");
    if (note) {
      note.textContent = "No fue posible iniciar sesión con Google. Revisa dominios autorizados o intenta nuevamente.";
      note.classList.add("is-error");
    }
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("No fue posible cerrar sesión", error);
  } finally {
    saveUserLocally(null);
    updateAuthInterface(null);
    dispatchAuthChange(null);
  }
};

const setupAuthButtons = () => {
  document.querySelectorAll("[data-google-login]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      signInWithGoogle();
    });
  });

  document.querySelectorAll("[data-google-logout]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      signOutUser();
    });
  });
};

window.saoAuth = {
  auth,
  signInWithGoogle,
  signOutUser,
  getCurrentUser: () => normalizeUser(auth.currentUser)
};

getRedirectResult(auth).catch((error) => {
  console.error("No fue posible completar el redireccionamiento de Google", error);
});

onAuthStateChanged(auth, (user) => {
  const profile = saveUserLocally(user);
  updateAuthInterface(profile);
  dispatchAuthChange(profile);
});

window.addEventListener("DOMContentLoaded", () => {
  setupAuthButtons();
  try {
    const saved = JSON.parse(localStorage.getItem(SAO_FIREBASE_USER_KEY) || "null");
    updateAuthInterface(saved);
  } catch (error) {
    updateAuthInterface(null);
  }
});

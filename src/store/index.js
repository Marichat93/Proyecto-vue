
import { defineStore } from 'pinia';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase'

export const useUserStore = defineStore('userState', {

    state: () => ({ user: null, uid: null, error: null, registerError: null }),

    getters: {
        isActiveUser: (state) => ((state.user && state.uid) ? true : false)
    },

    actions: {
        async loginUser(email, passwor) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, passwor);
                this.user = userCredential.user;
                this.uid = userCredential.user.uid;
                return {
                    email: this.user.email,
                    uid: this.uid
                }
            } catch (error) {
                switch (error.code) {
                    case 'auth/invalid-credential':
                        this.error = {
                            tipo: 'credencial',
                            mensaje: 'Email o Password Incorrectos'
                        }
                        break;
                    case 'auth/missing-password':
                        this.error = {
                            tipo: 'password',
                            mensaje: 'Password Incorrecto'
                        }
                        break;
                    case 'auth/invalid-email':
                        this.error = {
                            tipo: 'email',
                            mensaje: 'Email Incorrecto'
                        }
                        break;
                    default:
                        break;
                }
            }
            return;
        },
        async registerUser(email, password) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
                this.uid = userCredential.user.uid;
                // Limpiar errores previos
                this.registerError = null;
                return {
                    success: true,
                    email: this.user.email,
                    uid: this.uid
                };
            } catch (error) {
                // Objeto de error por defecto
                let errorResponse = {
                    success: false,
                    tipo: 'desconocido',
                    mensaje: 'Error de registro'
                };
                //manejar los errores
                switch (error.code) {
                    case "auth/email-already-in-use":
                        errorResponse = {
                            success: false,
                            tipo: "correo",
                            mensaje: "Correo electrónico ya está en uso"
                        };
                        break;

                    case "auth/invalid-email":
                        errorResponse = {
                            success: false,
                            tipo: "formato",
                            mensaje: "Formato de correo electrónico inválido"
                        };
                        break;

                    case "auth/weak-password":
                        errorResponse = {
                            success: false,
                            tipo: "contraseña",
                            mensaje: "Contraseña demasiado débil"
                        };
                        break;

                    default:
                        errorResponse = {
                            success: false,
                            tipo: "desconocido",
                            mensaje: error.message || "Error desconocido en el registro"
                        };
                }

                // Establecer error de registro
                this.registerError = errorResponse;

                // Limpiar error de login
                this.error = null;

                // Lanzar error
                throw errorResponse;
            }
        },
        async logoutUser() {
            try {
                await signOut(auth);
                this.user = null;
                this.uid = null;
                this.registerError = null;
                return {
                    email: null
                }
            } catch (error) {

            }
            return;
        },
        async getCurrentUser() {
            return new Promise((resolve, reject) => {
                try {
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            this.uid = user.uid;
                            this.user = user;
                            resolve(true); // Usuario autenticado
                        } else {
                            this.uid = null;
                            this.user = null;
                            resolve(false); // No hay usuario autenticado
                        }
                    });
                } catch (error) {
                    console.log(error);
                    reject(error); // En caso de error, rechazamos la promesa
                }
            });
        }


    }
});
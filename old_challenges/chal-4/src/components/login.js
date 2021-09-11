import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "@firebase/auth";
import { useState } from "react";
import { INVALID_CREDENTIALS, USER_NOT_FOUND } from "../constants/error-code";

import { auth } from "../firebase";
import { db } from "../firebase";

import { collection, addDoc, getDocs, query, where } from "@firebase/firestore";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        description: "",
    });

    const submit = async (e) => {
        e.preventDefault();

        let userData = null;
        let userDoc = null;
        let isNewUser = false;

        try {
            userData = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password
            ).catch((err) => {
                if (err.code !== USER_NOT_FOUND) throw err;
            });

            if (!userData) {
                isNewUser = true;
                userData = await createUserWithEmailAndPassword(
                    auth,
                    user.email,
                    user.password
                );
                await addDoc(collection(db, "users"), {
                    email: user.email,
                    description: user.description,
                });

                userDoc = {
                    email: user.email,
                    description: user.description,
                };
            } else {
                userDoc = (
                    await getDocs(
                        query(
                            collection(db, "users"),
                            where("email", "==", user.email)
                        )
                    )
                ).docs[0].data();
            }

            setUser({
                email: "",
                password: "",
                description: "",
            });

            alert(`
                ${isNewUser ? "New User Found" : ""}
                Your Email: ${userData.user.email}
                Your Description: ${userDoc.description}
            `);
        } catch (error) {
            if (error.code === INVALID_CREDENTIALS) {
                alert("Invalid Credentials. Please try again");
            } else {
                alert("Oops, something is wrong");
                console.log(error);
            }
        }
    };

    const update = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <form
                onSubmit={submit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1rem",
                }}
            >
                <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={(e) => {
                        update(e);
                    }}
                    placeholder="Email address"
                />
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => {
                        update(e);
                    }}
                    placeholder="Password"
                />
                <input
                    type="text"
                    name="description"
                    value={user.description}
                    onChange={(e) => {
                        update(e);
                    }}
                    placeholder="Your Description"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

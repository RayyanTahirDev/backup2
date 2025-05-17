// components/AuthHydrator.js
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getUser } from "@/redux/action/user";

export default function AuthHydrator() {
  const dispatch = useDispatch();
  const { isAuth, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && !isAuth && !loading) {
      dispatch(getUser());
    }
  }, [dispatch, isAuth, loading]);

  return null; // no UI
}

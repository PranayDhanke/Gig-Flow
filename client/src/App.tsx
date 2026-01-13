import { AppRoutes } from "./routes/AppRoutes";
import { useEffect, useRef } from "react";
import { findMe } from "./redux/Features/authSlice";
import { useAppDispatch } from "./redux/hooks";
import { socket } from "./socket/socket";
import { useSelector } from "react-redux";

const App = () => {
  const dispatch = useAppDispatch();
  const { user, checkAuth } = useSelector((state:any) => state.auth);

  const socketConnected = useRef(false);

  useEffect(() => {
    dispatch(findMe());
  }, [dispatch]);

  useEffect(() => {
    if (!checkAuth) return; // ⛔ wait until auth is resolved

    if (user?._id && !socketConnected.current) {
      console.log("🔌 Connecting socket...");
      socket.connect();
      socket.emit("join", user._id);
      socketConnected.current = true;
    }

    // disconnect ONLY on unmount
    return () => {
      if (socketConnected.current) {
        socket.disconnect();
        socketConnected.current = false;
      }
    };
  }, [user, checkAuth]);

  return <AppRoutes />;
};

export default App;

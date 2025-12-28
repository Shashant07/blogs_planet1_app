// server/src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import publicRoutes from "./routes/public.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import { issueCsrf } from "./middlewares/csrf.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();
app.set("trust proxy", 1); // helpful behind reverse proxies
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


// Session MUST be before routes that use req.session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "dev",
        resave: false,
        saveUninitialized: false, // creates session only when modified
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: false, // set true in production behind HTTPS }, })
        }
    })
);

// CORS must allow your frontend and credentials
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// Health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// CSRF before other routes
app.get("/api/auth/csrf", issueCsrf);

// API routes
app.use("/api", publicRoutes);
app.use("/api", userRoutes);
app.use("/api", adminRoutes);

// error handler
app.use(errorHandler);

export default app;
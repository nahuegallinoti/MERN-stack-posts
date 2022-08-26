"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const special_routes_1 = __importDefault(require("./routes/special.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passports_1 = __importDefault(require("./middlewares/passports"));
const app = (0, express_1.default)();
const path_1 = require("path");
//middlewares
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
passport_1.default.use(passports_1.default);
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "./upload",
}));
//routes
app.use(special_routes_1.default);
app.use(auth_routes_1.default);
app.use(posts_routes_1.default);
app.use(express_1.default.static((0, path_1.join)(__dirname, "../client/build")));
app.get("*", (req, res) => {
    res.sendFile((0, path_1.join)(__dirname, "../client/build/index.html"));
});
exports.default = app;

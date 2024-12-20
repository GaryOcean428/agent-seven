"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentSystem = exports.AgentSystem = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var router_1 = require("../routing/router");
var memory_manager_1 = require("../memory/memory-manager");
var AgentSystem = /** @class */ (function () {
    function AgentSystem() {
        this.initialized = false;
        this.modelRouter = router_1.ModelRouter.getInstance();
        this.memoryManager = memory_manager_1.MemoryManager.getInstance();
    }
    AgentSystem.getInstance = function () {
        if (!AgentSystem.instance) {
            AgentSystem.instance = new AgentSystem();
        }
        return AgentSystem.instance;
    };
    AgentSystem.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.initialized)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        thought_logger_1.thoughtLogger.log('plan', 'Initializing agent system');
                        // Initialize core systems
                        return [4 /*yield*/, Promise.all([
                                this.modelRouter.initialize(),
                                this.memoryManager.initialize()
                            ])];
                    case 2:
                        // Initialize core systems
                        _a.sent();
                        this.initialized = true;
                        thought_logger_1.thoughtLogger.log('success', 'Agent system initialized');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize agent system', { error: error_1 });
                        // Allow system to function with reduced capabilities
                        this.initialized = true;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AgentSystem.prototype.processMessage = function (content, onProgress, onStateChange) {
        return __awaiter(this, void 0, void 0, function () {
            var messageId, message, routerConfig, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        messageId = crypto.randomUUID();
                        thought_logger_1.thoughtLogger.log('plan', 'Processing message', { messageId: messageId });
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 8, , 9]);
                        message = {
                            id: messageId,
                            role: 'user',
                            content: content,
                            timestamp: Date.now()
                        };
                        return [4 /*yield*/, this.modelRouter.route(content, [])];
                    case 4:
                        routerConfig = _a.sent();
                        thought_logger_1.thoughtLogger.log('decision', "Selected model: ".concat(routerConfig.model), {
                            confidence: routerConfig.confidence
                        });
                        return [4 /*yield*/, this.modelRouter.processWithModel(message, routerConfig, onProgress)];
                    case 5:
                        response = _a.sent();
                        // Store in memory
                        return [4 /*yield*/, this.memoryManager.storeMessage(message)];
                    case 6:
                        // Store in memory
                        _a.sent();
                        return [4 /*yield*/, this.memoryManager.storeMessage(response)];
                    case 7:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Message processed successfully', {
                            messageId: messageId,
                            model: routerConfig.model
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Message processing failed', {
                            messageId: messageId,
                            error: error_2
                        });
                        throw error_2;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(AgentSystem.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return AgentSystem;
}());
exports.AgentSystem = AgentSystem;
exports.agentSystem = AgentSystem.getInstance();

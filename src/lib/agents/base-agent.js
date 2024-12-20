"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAgent = void 0;
var event_emitter_1 = require("../events/event-emitter");
var message_processor_1 = require("../processing/message-processor");
var BaseAgent = /** @class */ (function (_super) {
    __extends(BaseAgent, _super);
    function BaseAgent(id, name, role) {
        var _this = _super.call(this) || this;
        _this.messages = [];
        _this.capabilities = new Set();
        _this.id = id;
        _this.name = name;
        _this.role = role;
        _this.messageProcessor = new message_processor_1.MessageProcessor();
        return _this;
    }
    BaseAgent.prototype.processMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.messageProcessor.processMessage(message)];
                    case 1:
                        result = _a.sent();
                        if (result.success) {
                            this.messages.push(message);
                            this.emit('message', message);
                        }
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        this.emit('error', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseAgent.prototype.getMessages = function () {
        return __spreadArray([], this.messages, true);
    };
    BaseAgent.prototype.clearMessages = function () {
        this.messages = [];
        this.emit('clear');
    };
    BaseAgent.prototype.getId = function () {
        return this.id;
    };
    BaseAgent.prototype.getName = function () {
        return this.name;
    };
    BaseAgent.prototype.getRole = function () {
        return this.role;
    };
    BaseAgent.prototype.addCapability = function (capability) {
        this.capabilities.add(capability);
        this.emit('capability-added', capability);
    };
    BaseAgent.prototype.removeCapability = function (capability) {
        this.capabilities.delete(capability);
        this.emit('capability-removed', capability);
    };
    BaseAgent.prototype.hasCapability = function (capability) {
        return this.capabilities.has(capability);
    };
    BaseAgent.prototype.getCapabilities = function () {
        return Array.from(this.capabilities);
    };
    return BaseAgent;
}(event_emitter_1.EventEmitter));
exports.BaseAgent = BaseAgent;

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
exports.SaveChatButton = SaveChatButton;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var usePersistence_1 = require("../hooks/usePersistence");
function SaveChatButton(_a) {
    var _this = this;
    var messages = _a.messages, onSave = _a.onSave;
    var _b = (0, react_1.useState)(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var _c = (0, react_1.useState)(''), title = _c[0], setTitle = _c[1];
    var _d = (0, react_1.useState)(''), tags = _d[0], setTags = _d[1];
    var _e = (0, react_1.useState)(false), isSaving = _e[0], setIsSaving = _e[1];
    var saveChat = (0, usePersistence_1.usePersistence)().saveChat;
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var tagArray, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!title.trim())
                        return [2 /*return*/];
                    setIsSaving(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    tagArray = tags.split(',').map(function (tag) { return tag.trim(); }).filter(Boolean);
                    return [4 /*yield*/, saveChat(title, messages, tagArray)];
                case 2:
                    _a.sent();
                    setIsModalOpen(false);
                    onSave === null || onSave === void 0 ? void 0 : onSave();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to save chat:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<>
      <button onClick={function () { return setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-gray-300 rounded-lg transition-colors" title="Save Chat">
        <lucide_react_1.Save className="w-5 h-5"/>
      </button>

      {isModalOpen && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Save Chat</h3>
              <button onClick={function () { return setIsModalOpen(false); }} className="text-gray-400 hover:text-gray-300">
                <lucide_react_1.X className="w-5 h-5"/>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input type="text" value={title} onChange={function (e) { return setTitle(e.target.value); }} className="w-full bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter a title for this chat"/>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input type="text" value={tags} onChange={function (e) { return setTags(e.target.value); }} className="w-full bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter tags, separated by commas"/>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={function () { return setIsModalOpen(false); }} className="px-4 py-2 text-gray-400 hover:text-gray-300">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={!title.trim() || isSaving} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSaving ? 'Saving...' : 'Save Chat'}
                </button>
              </div>
            </div>
          </div>
        </div>)}
    </>);
}

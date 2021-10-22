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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var _this = this;
var body = document.querySelector('body');
var mainSection = document.querySelector('main');
var heading1 = document.querySelector('h1');
var heading2 = document.querySelector('h2');
var mainBtn = document.querySelector('#main-btn');
var tilesSection = document.querySelector('#activity-tiles-section');
var activityTiles = Array.from(document.querySelectorAll('.activity-tile'));
var tilesSectionBackgroundContainer = document.querySelector('#activity-section-bg');
var handleError = function (error) {
    console.log(error);
    heading1.innerHTML = 'Something went wrong...';
    heading2.innerHTML = 'Want to try again?';
    mainBtn.innerHTML = 'Try again';
};
var fetchRandomActivity = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, activity, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4, fetch('https://www.boredapi.com/api/activity/')];
            case 1:
                response = _a.sent();
                return [4, response.json()];
            case 2:
                data = _a.sent();
                activity = {
                    activity: data.activity,
                    type: data.type,
                    link: data.link,
                    key: data.key
                };
                return [2, activity];
            case 3:
                error_1 = _a.sent();
                handleError(error_1);
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
var switchStyling = function () {
    body.classList.remove('bored-bg');
    body.classList.add('happy-bg');
    mainSection.classList.remove('bored-bg-img');
    mainSection.classList.add('happy-bg-img');
    tilesSection.classList.remove('bored-tiles-bg');
    tilesSection.classList.add('happy-tiles-bg');
    tilesSectionBackgroundContainer.classList.remove('bored-activity-section-bg');
    tilesSectionBackgroundContainer.classList.add('happy-activity-section-bg');
    activityTiles.forEach(function (tile) {
        tile.classList.remove('bored-tiles-card');
        tile.classList.add('happy-tiles-card');
    });
};
var runFetch = function () { return __awaiter(_this, void 0, void 0, function () {
    var activity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                heading1.innerHTML = '';
                heading2.innerHTML = 'Hmm. How about...';
                return [4, fetchRandomActivity()];
            case 1:
                activity = _a.sent();
                switchStyling();
                heading2.innerHTML = activity.activity;
                return [2];
        }
    });
}); };
var fetchSpecificActivity = function (typeOfActivity) { return __awaiter(_this, void 0, void 0, function () {
    var response, data, activity, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                window.scrollTo(0, 0);
                heading1.innerHTML = '';
                heading2.innerHTML = "Hmm. How about...";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, fetch("https://www.boredapi.com/api/activity?type=" + typeOfActivity)];
            case 2:
                response = _a.sent();
                return [4, response.json()];
            case 3:
                data = _a.sent();
                activity = {
                    activity: data.activity,
                    type: data.type,
                    link: data.link,
                    key: data.key
                };
                switchStyling();
                console.log(typeOfActivity);
                console.log(activity);
                heading2.innerHTML = activity.activity;
                return [3, 5];
            case 4:
                error_2 = _a.sent();
                handleError(error_2);
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
mainBtn.addEventListener('click', runFetch);
activityTiles.forEach(function (tile) {
    tile.addEventListener('click', function (e) {
        var typeOfActivity = e.target.id;
        fetchSpecificActivity(typeOfActivity);
    });
});
//# sourceMappingURL=index.js.map
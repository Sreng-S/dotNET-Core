"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var ProductsService = (function () {
    function ProductsService(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
    }
    ProductsService.prototype.getProducts = function () {
        return this.http.get(this.baseUrl + 'api/Products')
            .map(function (result) {
            return result.json();
        })
            .catch(this.handleError);
    };
    ProductsService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText || '';
            }
            return Observable_1.Observable.throw(errMessage);
        }
        return Observable_1.Observable.throw(error || 'ASP.NET Core 1.1 server error.');
    };
    return ProductsService;
}());
ProductsService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject('BASE_URL')),
    __metadata("design:paramtypes", [http_1.Http, String])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map
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
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var product_1 = require("./product");
var ProductsSignalRService = (function () {
    function ProductsSignalRService(baseUrl) {
        var _this = this;
        this.baseUrl = baseUrl;
        this.productAddedEvent = function () { return _this.addObservable.asObservable(); };
        this.productUpdatedEvent = function () { return _this.updateObservable.asObservable(); };
        this.productDeletedEvent = function () { return _this.removeObservable.asObservable(); };
        this.connection = $.hubConnection(baseUrl + 'signalr/');
        this.productMessageHub = this.connection.createHubProxy('productMessageHub');
        this.addObservable = new ReplaySubject_1.ReplaySubject();
        this.updateObservable = new ReplaySubject_1.ReplaySubject();
        this.removeObservable = new ReplaySubject_1.ReplaySubject();
    }
    ProductsSignalRService.prototype.startConnection = function () {
        if (typeof window !== 'undefined') {
            this.start();
        }
    };
    ProductsSignalRService.prototype.start = function () {
        this.registerOnServerEvents();
        this.connection.start().done(function (data) {
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
        }).fail(function (error) {
            console.log('Could not connect ' + error);
        });
    };
    ProductsSignalRService.prototype.registerOnServerEvents = function () {
        var _this = this;
        this.productMessageHub.on('productAdded', function (data) {
            var product = new product_1.Product();
            product.id = data.Id;
            product.name = data.Name;
            product.description = data.Description;
            _this.productAdded(product);
        });
        this.productMessageHub.on('productUpdated', function (data) {
            console.log(data);
            var product = new product_1.Product();
            product.id = data.Id;
            product.name = data.Name;
            product.description = data.Description;
            console.log('productMessageHub.on(\'ProductUpdated\' ' + product.id + ' ' + data);
            _this.productUpdated(product);
        });
        this.productMessageHub.on('productRemoved', function (data) {
            var productId = data;
            _this.productRemoved(productId);
        });
    };
    ProductsSignalRService.prototype.addProduct = function (product) {
        this.productMessageHub.invoke('addProduct', product);
    };
    ProductsSignalRService.prototype.updateProduct = function (product) {
        this.productMessageHub.invoke('updateProduct', product);
    };
    ProductsSignalRService.prototype.removeProduct = function (productId) {
        this.productMessageHub.invoke('removeProduct', productId);
    };
    ProductsSignalRService.prototype.productAdded = function (product) {
        this.addObservable.next(product);
    };
    ProductsSignalRService.prototype.productUpdated = function (product) {
        console.log('productUpdated(product: Product) ' + product);
        this.updateObservable.next(product);
    };
    ProductsSignalRService.prototype.productRemoved = function (productId) {
        this.removeObservable.next(productId);
    };
    return ProductsSignalRService;
}());
ProductsSignalRService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject('BASE_URL')),
    __metadata("design:paramtypes", [String])
], ProductsSignalRService);
exports.ProductsSignalRService = ProductsSignalRService;
//# sourceMappingURL=products-signalr.service.js.map
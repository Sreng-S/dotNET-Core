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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var products_service_1 = require("./products.service");
var products_signalr_service_1 = require("./products-signalr.service");
var product_1 = require("./product");
var ProductsComponent = (function () {
    function ProductsComponent(productsService, productsSignalRService) {
        var _this = this;
        this.productsService = productsService;
        this.productsSignalRService = productsSignalRService;
        this.componentStatus = 'App started!';
        this.addNewProductAllowed = true;
        this.allMessages = new Array();
        this.selectedProduct = new product_1.Product();
        this.productsSignalRService.productAddedEvent().subscribe(function (product) { return _this.productAdded(product); });
        this.productsSignalRService.productUpdatedEvent().subscribe(function (product) { return _this.productUpdated(product); });
        this.productsSignalRService.productDeletedEvent().subscribe(function (productId) { return _this.productDeleted(productId); });
    }
    ProductsComponent.prototype.ngOnInit = function () {
        this.getProducts();
        this.productsSignalRService.startConnection();
        this.allMessages.push("Application started at: " + new Date().toLocaleTimeString() + ".");
    };
    ProductsComponent.prototype.addNewProduct = function () {
        this.addNewProductAllowed = false;
        this.lastAddedProduct = new product_1.Product();
        this.lastAddedProduct.name = 'New product';
        this.selectedProduct = this.lastAddedProduct;
    };
    ProductsComponent.prototype.deleteProduct = function () {
        if (this.selectedProduct != null) {
            this.productsSignalRService.removeProduct(this.selectedProduct.id);
        }
        else {
            this.componentStatus = 'Please select a product from the table.';
        }
    };
    ProductsComponent.prototype.updateProduct = function () {
        if (this.lastAddedProduct != null && this.addNewProductAllowed === false) {
            this.productsSignalRService.addProduct(this.lastAddedProduct);
            this.addNewProductAllowed = true;
        }
        else {
            this.productsSignalRService.updateProduct(this.selectedProduct);
        }
    };
    ProductsComponent.prototype.getProducts = function () {
        var _this = this;
        this.products = this.productsService.products;
        this.productsService.getProducts()
            .subscribe(function (response) {
            _this.products = response;
        }, function (err) { return console.log(err); }, function () { return console.log('getProducts() retrieved customers'); });
    };
    ProductsComponent.prototype.setClickedRow = function (product) {
        this.selectedProduct = product;
        this.addNewProductAllowed = true;
        this.lastAddedProduct = undefined;
        console.log("Selected product is " + product);
    };
    ProductsComponent.prototype.productAdded = function (product) {
        this.allMessages.push("Product with Id: " + product.id + " added.");
        this.products.push(product);
    };
    ProductsComponent.prototype.productUpdated = function (product) {
        var productsForUpdate = this.products.filter(function (p) { return p.id === product.id; });
        if (productsForUpdate && productsForUpdate[0]) {
            productsForUpdate[0].name = product.name;
            productsForUpdate[0].description = product.description;
            this.allMessages.push("Product with Id: " + product.id + " updated.");
        }
    };
    ProductsComponent.prototype.productDeleted = function (productId) {
        this.allMessages.push("Product with Id: " + productId + " deleted.");
        this.products = this.products.filter(function (product) { return product.id !== productId; });
    };
    return ProductsComponent;
}());
ProductsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'products',
        templateUrl: './products.component.html'
    }),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        products_signalr_service_1.ProductsSignalRService])
], ProductsComponent);
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map
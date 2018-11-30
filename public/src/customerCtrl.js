angular.module("Amerzon").controller("CustomerController", customer);

function customer(Products, products, SweetAlert) {
  const vm = this;
  console.log("customer");
  vm.products = products;
  vm.cart = [];

  vm.buy = function() {
    var promises = vm.cart.map(function(prod) {
      return new Promise((resolve, reject) =>
        Products.update(prod._id).then(function(result) {
          console.log("resolved");
          delete vm[prod._id];
          resolve(result);
        })
      );
    });
    Promise.all(promises).then(function(results) {
      console.log("results:", results);
      vm.cart = [];
      SweetAlert.swal("Good job!", "Your order was successful!", "success");
      vm.products = vm.products.slice(0);
    });
  };

  vm.updateCart = function(product) {
    console.log("hi");
    const length = vm.cart.length;
    vm.cart = vm.cart.filter(function(prod) {
      return prod._id !== product._id;
    });
    if (length === vm.cart.length) {
      vm.cart.push(product);
    }
  };
}

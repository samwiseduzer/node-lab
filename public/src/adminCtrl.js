angular.module("Amerzon").controller("AdminController", admin);

function admin(products, Products, SweetAlert) {
  const vm = this;
  vm.products = products;
  vm.newProduct = {};

  console.log("admin");

  vm.addProduct = function() {
    Products.create(vm.newProduct).then(
      function(result) {
        console.log("result");
        vm.products.push(result.data);
      },
      function() {}
    );
  };

  vm.remove = function(id) {
    console.log("remove");
    Products.remove(id).then(
      function(result) {
        vm.products = vm.products.filter(function(prod) {
          return prod._id !== id;
        });
      },
      function() {}
    );
  };
}
